import { tokenService } from "../../services/token.service";
import { BadRequestException, UnauthorizedException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";
import bcrypt from "bcrypt"

// The root provides a resolver function for each API endpoint
export const root = {
    hello() {
        return "Hello world!";
    },

    // article.service
    async getListArticle(args, context) {
        console.log({ args, context })

        if (!context.user) throw new UnauthorizedException("Invalid  Account")

        let { page, pageSize, filters } = args
        page = +page > 0 ? +page : 1            // chuyển chuỗi thành số (page có lớn hơn 0 hay ko? nếu ko thì trả về 1)
        pageSize = +pageSize > 0 ? +pageSize : 1    // chuyển chuỗi thành số (pageSize có lớn hơn 0 hay ko? nếu ko thì trả về 1)

        // Chuyển filters từ object sang json
        filters = JSON.parse(filters || "{}") || {};

        // index (OFFSET) = (page - 1) * pageSize
        const index = (page - 1) * pageSize

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

        console.log({ page, pageSize, index, filters })

        const articlesPromise = prisma.articles.findMany({
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
        const totalItemPromise = prisma.articles.count()

        // Chạy đồng thời 2 code
        const [articles, totalItem] = await Promise.all([articlesPromise, totalItemPromise])

        const totalPage = Math.ceil(totalItem / pageSize)

        return {
            page,
            pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: articles || [],
        };
    },

    // auth.service
    async login(args, context) {
        console.log({ args, context })

        const { email, password } = args

        const userExits = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!userExits) throw new BadRequestException("Người dùng chưa tồn tại, vui lòng đăng ký!")
        // Nếu code chạy được tới đây => đảm bảo có userExits

        if (!userExits.password) {
            throw new BadRequestException("Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook) để cập nhật lại mật khẩu mới trong setting")
        }

        const isPassword = bcrypt.compareSync(password, userExits.password);
        if (!isPassword) throw new BadRequestException("Mật khẩu không chính xác")
        // Nếu code chạy được tới đây => người dùng hợp lệ

        const tokens = tokenService.createTokens(userExits.id)

        // sendMail(email) // gửi mail khi login

        return tokens;
    }
};
