import cloudinary from "../common/cloudinary/init.cloudinary";
import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import fs from "fs"
import path from "path"

export const userService = {
    avatarLocal: async function (req) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
        console.log(req.file)
        if (!req.file) {
            throw new BadRequestException("Not Found File")
        }

        const user = req.user

        await prisma.users.update({
            where: {
                id: user.id
            },

            data: {
                avatar: req.file.filename
            }
        })

        // Xóa avatar cũ khi upload avtar mới
        if (user.avatar) {
            // xóa local
            const oldFilePath = path.join("public/images", user.avatar)
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath)
            }

            // xóa cloud
            cloudinary.uploader.destroy(user.avatar)
        }

        return true
    },

    avatarCloud: async function (req) {
        console.log(req.file)
        if (!req.file) {
            throw new BadRequestException("Not Found File")
        }

        const user = req.user

        // đưa hình lên cloud
        const byteArrayBuffer = req.file.buffer
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "images" }, (error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(byteArrayBuffer);
        });

        await prisma.users.update({
            where: {
                id: user.id
            },

            data: {
                avatar: uploadResult.public_id
            }
        })

        // Xóa avatar cũ khi upload avtar mới
        if (user.avatar) {
            // xóa local
            const oldFilePath = path.join("public/images", user.avatar)
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath)
            }

            // xóa cloud
            cloudinary.uploader.destroy(user.avatar)
        }

        // Di chuyển folder
        // cloudinary.uploader.rename("images-draft/avatar", "images-article/avatar")

        console.log({ uploadResult })

        return true;
    },

    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        let { page, pageSize, filters } = req.query

        page = +page > 0 ? +page : 1            // chuyển chuỗi thành số (page có lớn hơn 0 hay ko? nếu ko thì trả về 1)
        pageSize = +pageSize > 0 ? +pageSize : 10    // chuyển chuỗi thành số (pageSize có lớn hơn 0 hay ko? nếu ko thì trả về 1)

        // Chuyển filters từ object sang json
        filters = JSON.parse(filters || "{}") || {};

        // console.log({ page, pageSize })

        // index (OFFSET) = (page - 1) * pageSize
        const index = (page - 1) * pageSize

        // console.log(`filter lúc đầu`, filters)

        // lọc lại filters
        // Chuyển filters từ json thành object
        Object.entries(filters).forEach(([key, value]) => {
            console.log({ key, value })
            if (value === null || value === undefined || value === '') {
                delete filters[key]
                return
            }

            if (typeof value === "string") {
                filters[key] = {
                    contains: value
                }
            }

            // TODO: Xử lý ngày tháng
        })

        // console.log({ page, pageSize, index, filters })

        const usersPromise = prisma.users.findMany({
            // SQL: OFFSET
            skip: index,

            // SQL: LIMIT
            take: pageSize,

            where: {
                ...filters,
                // Xóa mềm
                isDeleted: false
            }
        })

        // Đếm số lượng row hàng trong table
        const totalItemPromise = prisma.users.count()

        // Chạy đồng thời 2 code
        const [users, totalItem] = await Promise.all([usersPromise, totalItemPromise])

        const totalPage = Math.ceil(totalItem / pageSize)

        return {
            page,
            pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: users || [],
        };
    },

    findOne: async function (req) {
        const users = await prisma.users.findUnique({
            where: {
                id: +req.params.id
            },

            include: {
                Roles: true
            }
        })
        return users;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} user`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} user`;
    },
};
