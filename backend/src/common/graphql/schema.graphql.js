import { buildSchema } from "graphql";

/**
 * Int: Số nguyên
 * Float: Số thực (số có dấu phẩy)
 * String: Chuỗi
 * Boolean: true hoặc false
 * ID: định danh duy nhất dành cho cột ID
 * !: field không được phép null
 * [type]: danh sách
 */

// Construct a schema using GraphQL schema language
export const schema = buildSchema(/* GraphQL */ `
    type TArticle {
        id: ID
        title: String            # null
        content: String
        imageUrl: String
        views: Int
        userId: Int
        deletedBy: Int
        isDeleted: Boolean       # false
        deletedAt: String        # null
        createdAt: String        # 2024-01-01T08:00:00.000Z
        updatedAt: String        # 2024-01-01T08:00:00.000Z
    }

    type TPaginationArticle {
        page: Int
        pageSize: Int
        totalItem: Int
        totalPage: Int
        items: [TArticle]
    }

    type TLoginRes {
        accessToken: String
        refreshToken: String
    }

    # Lấy dữ liệu
    type Query {
        hello: String
        getListArticle(page: Int, pageSize: Int): TPaginationArticle
    }

    # Thao tác thực hiện gì đó
    type Mutation {
        login(email: String, password: String): TLoginRes
    }
`);