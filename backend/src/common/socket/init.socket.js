import { Server } from "socket.io"
import { tokenService } from "../../services/token.service";
import { createKeyForChatOne } from "../helpers/function.helper";
import prisma from "../prisma/init.prisma";

// Copy từ document của Socket.io With Express
export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        /* options */
    });

    io.on("connection", (socket) => {
        // console.log({ "socket.id": socket.id })
        // console.log(socket)

        // Tạo room chat
        // socket.on: Lắng nghe tín hiệu từ FE gửi lên
        socket.on("CREATE_ROOM", async (data, cb) => {
            const { targetUserIds, accessToken, name } = data

            const { userId } = tokenService.verifyAccessToken(accessToken)

            const uniqueUserIds = Array.from(new Set([...targetUserIds, userId]))

            const countUser = uniqueUserIds.length

            // Chat 1-1 (Số lượng user là 2)
            if (countUser === 2) {
                // createKeyForChatOne(uniqueUserIds[0], uniqueUserIds[1])   // Cách 1
                const [userId1, userId2] = uniqueUserIds
                const keyForChatOne = createKeyForChatOne(userId1, userId2)
                let chatGroupExist = await prisma.chatGroups.findUnique({
                    where: {
                        keyForChatOne: keyForChatOne
                    }
                })

                if (!chatGroupExist) {
                    chatGroupExist = await prisma.$transaction(async (tx) => {
                        const chatGroupExistTransaction = await tx.chatGroups.create({
                            data: {
                                keyForChatOne: keyForChatOne,
                                ownerId: userId,
                                // ChatGroupMembers: {
                                //     create: [{ userId: userId1 }, { userId: userId2 }]
                                // }
                            }
                        })

                        await tx.chatGroupMembers.createMany({
                            data: [
                                { chatGroupId: chatGroupExistTransaction.id, userId: userId1 },
                                { chatGroupId: chatGroupExistTransaction.id, userId: userId2 },
                            ]
                        })

                        return chatGroupExistTransaction
                    })
                }

                // Đảm bảo chatGroupExist luôn có dữ liệu
                socket.join(`chat:${chatGroupExist.id}`)
                cb({
                    status: "success",
                    data: { chatGroupId: chatGroupExist.id }
                })
                return
            }

            // Chat Group nhiều người
            // 1 người có thể tạo nhiều nhóm chat: có cùng thành viên, cùng tên
            // Không ràng buộc tạo nhiều nhóm chat, thả cho người dùng muốn tạo bao nhiêu cũng được
            const chatGroupExist = await prisma.$transaction(async (tx) => {
                const chatGroupExistTransaction = await tx.chatGroups.create({
                    data: {
                        name: name,
                        ownerId: userId,
                    }
                })

                await tx.chatGroupMembers.createMany({
                    data: uniqueUserIds.map((userId) => {
                        return {
                            chatGroupId: chatGroupExistTransaction.id,
                            userId: userId,
                        }
                    })
                })

                return chatGroupExistTransaction
            })

            console.log("CREATE_ROOM", {
                data,
                userId,
                uniqueUserIds
            })

            socket.join(`chat:${chatGroupExist.id}`)
            cb({
                status: "success",
                data: { chatGroupId: chatGroupExist.id }
            })

            return
        })

        // Tham gia room chat
        socket.on("JOIN_ROOM", async (data, cb) => {
            const { chatGroupId, accessToken } = data

            const { userId } = tokenService.verifyAccessToken(accessToken)

            socket.join(`chat:${chatGroupId}`)

            console.log("JOIN_ROOM", data)
            cb({
                status: "success",
                data: { chatGroupId: chatGroupId }
            })

            return
        })

        // Gửi tin nhắn
        socket.on("SEND_MESSAGE", async (data) => {
            const { message, accessToken, chatGroupId } = data
            const { userId } = tokenService.verifyAccessToken(accessToken)

            const createdAt = new Date().toISOString();

            io.to(`chat:${chatGroupId}`).emit(`SEND_MESSAGE`, {
                messageText: message,
                userIdSender: userId,
                chatGroupId: chatGroupId,
                createdAt: createdAt,
            });

            await prisma.chatMessages.create({
                data: {
                    messageText: message,
                    userIdSender: userId,
                    chatGroupId: chatGroupId,
                    createdAt: createdAt,
                },
            });

            console.log(`SEND_MESSAGE`, data)
        })

        // Thoát room chat
        socket.on("LEAVE_ROOM", async (data) => {
            console.log(`LEAVE_ROOM`, data)
            const { chatGroupId } = data
            socket.leave(`chat:${chatGroupId}`)
        })
    });
}

// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//     // ...
// });

// httpServer.listen(3000);
