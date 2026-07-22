import { articleSwagger } from "./article.swagger";
import { authSwagger } from "./auth.swagger";
import { userSwagger } from "./user.swagger";

export const swaggerDocument = {
    openapi: "3.1.1",

    info: {
        title: "Cyber Community",
        version: "1.0.0"
    },

    servers: [
        {
            url: "http://localhost:3069/api",
            description: "Server BE Local"
        },

        {
            url: "http://domain.com/api",
            description: "Server BE Product"
        },
    ],

    components: {
        securitySchemes: {
            hien: {
                type: "http",
                scheme: "bearer"
            }
        }
    },

    paths: {
        ...articleSwagger,
        ...authSwagger,
        ...userSwagger,  // gửi file
    }
}