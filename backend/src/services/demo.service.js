import { BadRequestException } from "../common/helpers/exception.helper";
// import pool from "../common/mysql2/init.mysql2"
import prisma from "../common/prisma/init.prisma";
// import sequelize from "../common/sequelize/init.sequelize";
import models from "../models/app.model";
// import Role from "../models/my-models/role.model";

const demoService = {
    checkServer: () => {
        return "Hello World!"
    },

    query: async (req) => {
        const query = req.query

        // Lỗi không kiểm soát được
        // const userName = "ngothanhhien"
        // userName = "hienthanhngo"

        // Lỗi kiểm soát được
        // const passDB = `123`
        // const passUser = `111`
        // if (passDB !== passUser) {
        //     throw new BadRequestException("Lỗi pass")
        // }

        // MYSQL2
        // const [dataMysql2, fields] = await pool.query('SELECT * FROM `Roles`');
        // console.log({ dataMysql2, fields });

        // SEQUELIZE
        // sequelize.query
        // Role
        // tuần tự hóa
        // const dataSequelize = await models.Roles.findAll()

        //findAll() = findMany()

        //PRISMA
        const dataPrisma = await prisma.roles.findMany()

        return {
            // mysql2: dataMysql2,
            // sequelize: dataSequelize,
            prisma: dataPrisma
        }
    },

    path: (req) => {
        const param = req.params

        console.log({ param })

        return {
            message: "Xử lý dữ liệu ở Path Parameter",
            data: param
        }
    },

    delete: (req) => {
        const headers = req.headers

        const { token } = headers
        console.log({ token })

        return {
            message: "Xử lý dữ liệu ở Headers",
            data: headers
        }
    },

    body: (req) => {
        const body = req.body

        return {
            message: "Xử lý dữ liệu ở Body",
            data: body
        }
    }
}

export default demoService