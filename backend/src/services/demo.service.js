import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

const demoService = {
    checkServer: () => {
        return "Hello World!";
    },

    query: async (req) => {
        const query = req.query;

        const dataPrisma = await prisma.roles.findMany();

        return {
            prisma: dataPrisma
        };
    },

    path: (req) => {
        const param = req.params;

        console.log({ param });

        return {
            message: "Xử lý dữ liệu ở Path Parameter",
            data: param
        };
    },

    delete: (req) => {
        const headers = req.headers;

        const { token } = headers;
        console.log({ token });

        return {
            message: "Xử lý dữ liệu ở Headers",
            data: headers
        };
    },

    body: (req) => {
        const body = req.body;

        return {
            message: "Xử lý dữ liệu ở Body",
            data: body
        };
    }
};

export default demoService;
