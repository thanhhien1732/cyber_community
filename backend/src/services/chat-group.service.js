import prisma from "../common/prisma/init.prisma";

export const chatGroupService = {
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        let { page, pageSize, filters, isOne } = req.query

        page = +page > 0 ? +page : 1            // chuyển chuỗi thành số (page có lớn hơn 0 hay ko? nếu ko thì trả về 1)
        pageSize = +pageSize > 0 ? +pageSize : 10    // chuyển chuỗi thành số (pageSize có lớn hơn 0 hay ko? nếu ko thì trả về 1)

        // Chuyển filters từ object sang json
        filters = JSON.parse(filters || "{}") || {};

        console.log({ page, pageSize, isOne })

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

        const chatGroupsPromise = prisma.chatGroups.findMany({
            // SQL: OFFSET
            skip: index,

            // SQL: LIMIT
            take: pageSize,

            where: {
                keyForChatOne: isOne === 'true' ? { not: null } : null,
                ...filters,
                // Xóa mềm
                isDeleted: false
            },

            include: {
                ChatGroupMembers: {
                    include: {
                        Users: true,
                    }
                }
            }
        })

        // Đếm số lượng row hàng trong table
        const totalItemPromise = prisma.chatGroups.count()

        // Chạy đồng thời 2 code
        const [chatGroups, totalItem] = await Promise.all([chatGroupsPromise, totalItemPromise])

        const totalPage = Math.ceil(totalItem / pageSize)

        return {
            page,
            pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: chatGroups || [],
        };
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} chatGroup`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} chatGroup`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} chatGroup`;
    },
};
