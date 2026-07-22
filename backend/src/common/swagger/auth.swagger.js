export const authSwagger = {
    "/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login System",
            // Gửi dữ liệu bằng body
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    example: "example@gmail.com"
                                },

                                password: {
                                    type: "string",
                                    example: "1234"
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    "description": "Login System Success"
                }
            } // Mô tả trước dữ liệu khi trả về thành công
        }
    },
}