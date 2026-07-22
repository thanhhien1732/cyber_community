export const articleSwagger = {
    "/article/": {
        get: {
            tags: ["Articles"],
            summary: "Get All Article",
            security: [{ hien: [] }],
            // Gửi dữ liệu qua parameter
            parameters: [
                {
                    name: "page",
                    in: "query",
                    type: "number"
                },

                {
                    name: "pageSize",
                    in: "query",
                    type: "number"
                },
            ],
            responses: {
                "200": {
                    description: "Get All Article Success",
                    content: {
                        "text/plain": {
                            "schema": {
                                "type": "string"
                            },
                            example: "whoa!"
                        }
                    },
                },
            }, // Mô tả trước dữ liệu khi trả về thành công
        }
    },

    "/article/{id}": {
        get: {
            tags: ["Articles"],
            summary: "Get Detail Article",
            // Gửi dữ liệu qua parameter
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "id article",
                    required: true
                },
            ],
            responses: {
                "200": {
                    "description": "Get All Article Success"
                }
            } // Mô tả trước dữ liệu khi trả về thành công
        }
    },
}