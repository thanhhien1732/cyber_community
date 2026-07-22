import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const roleService = {
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        let { page, pageSize, filters } = req.query

        page = +page > 0 ? +page : 1            // chuyển chuỗi thành số (page có lớn hơn 0 hay ko? nếu ko thì trả về 1)
        pageSize = +pageSize > 0 ? +pageSize : 10    // chuyển chuỗi thành số (pageSize có lớn hơn 0 hay ko? nếu ko thì trả về 1)

        // Chuyển filters từ object sang json
        filters = JSON.parse(filters || "{}") || {};

        console.log({ page, pageSize })

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

        const rolesPromise = prisma.roles.findMany({
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
        const totalItemPromise = prisma.roles.count()

        // Chạy đồng thời 2 code
        const [roles, totalItem] = await Promise.all([rolesPromise, totalItemPromise])

        const totalPage = Math.ceil(totalItem / pageSize)

        return {
            page,
            pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: roles || [],
        };
    },

    findOne: async function (req) {
        const role = await prisma.roles.findUnique({
            where: {
                id: +req.params.id
            }
        })

        return role;
    },

    async toggleIsActive(req) {
        const user = req.user
        const roleId = +req.params.roleId
        console.log({ user, roleId })

        const roleExist = await prisma.roles.findUnique({
            where: {
                id: roleId
            }
        })

        if (!roleExist) {
            throw new BadRequestException("Role not found")  // nên tạo 404
        }

        await prisma.roles.update({
            where: {
                id: roleExist.id
            },

            data: {
                isActive: !roleExist.isActive
            }
        })

        return true
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} role`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} role`;
    },
};
