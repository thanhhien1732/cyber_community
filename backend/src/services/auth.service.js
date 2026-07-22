import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt"
import { tokenService } from "./token.service";
import { sendMail } from "../common/nodemailer/init.nodemailer";
import { FRONTEND_URL } from "../common/constant/app.constant";

export const authService = {
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        return `This action returns all auth`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} auth`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} auth`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} auth`;
    },

    register: async function (req) {
        const { email, password, fullName } = req.body

        const userExits = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (userExits) {
            throw new BadRequestException("Ông có tài khoản đăng ký chi nữa")
        }

        // Mã hóa password
        const passwordHash = bcrypt.hashSync(password, 10)  // Băm 10 lần

        const userNew = await prisma.users.create({
            data: {
                email: email,
                password: passwordHash,
                fullName: fullName
            }
        })

        delete userNew.password

        return userNew;
    },

    login: async function (req) {
        const { email, password } = req.body

        const userExits = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!userExits) throw new BadRequestException("Người dùng chưa tồn tại, vui lòng đăng ký!")
        // Nếu code chạy được tới đây => đảm bảo có userExits

        // Do tài khoản đăng nhập bằng gmail hoặc facebook
        // Lúc này tài khoản sẽ không có mật khẩu
        // Nên nếu người dùng cố tình đăng nhập bằng email thì sẽ không có mật khẩu để kiểm tra
        // Nên phải bắt người dùng đăng nhập bằng email vào setting để cập nhật lại mật khẩu mới
        if (!userExits.password) {
            throw new BadRequestException("Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook) để cập nhật lại mật khẩu mới trong setting")
        }

        const isPassword = bcrypt.compareSync(password, userExits.password);
        if (!isPassword) throw new BadRequestException("Mật khẩu không chính xác")
        // Nếu code chạy được tới đây => người dùng hợp lệ

        const tokens = tokenService.createTokens(userExits.id)

        sendMail(email) // gửi mail khi login

        return tokens;
    },

    getInfo: (req) => {
        delete req.user.password  // Xóa password để ko show ra
        return req.user
    },

    refreshToken: async (req) => {
        const { accessToken, refreshToken } = req.body

        const decodeAccessToken = tokenService.verifyAccessToken(accessToken, { ignoreExpiration: true })
        const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken)

        if (decodeAccessToken.userId !== decodeRefreshToken.userId) throw new UnauthorizedException("Token Invalid")

        const user = await prisma.users.findUnique({
            where: {
                id: decodeRefreshToken.userId
            }
        })

        if (!user) throw new UnauthorizedException("User Invalid")

        const tokens = tokenService.createTokens(user.id)

        return tokens
    },

    googleAuth20: (req) => {
        const { accessToken, refreshToken } = req.user
        const urlRedirect = `${FRONTEND_URL}/login-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
        return urlRedirect

    }
};
