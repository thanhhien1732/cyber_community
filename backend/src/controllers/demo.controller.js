import { responseSuccess } from "../common/helpers/response.helper";
import demoService from "../services/demo.service";

const demoController = {
    // checkServer: (req, res, next) => {
    //     res.json("Hello World from ExpressJS!");
    // },
    checkServer: (req, res, next) => {
        try {
            const result = demoService.checkServer()
            const resData = responseSuccess(result, "Kiểm tra server")
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    },

    // query: (req, res, next) => {
    //     const query = req.query

    //     res.json({
    //         message: "Xử lý dữ liệu ở Query",
    //         data: query
    //     })
    // },

    // query: async (req, res, next) => {
    //     const result = await demoService.query(req)
    //     const resData = responseSuccess(result, "Xử lý dữ liệu ở Query")
    //     res.status(resData.statusCode).json(resData)
    // },

    // thêm try catch bắt lỗi (cho express 4 trở xuống)
    // thêm luôn try catch cho đồng bộ (nếu express 5 trở lên thì ko cần)
    query: async (req, res, next) => {
        try {
            const result = await demoService.query(req)
            const resData = responseSuccess(result, "Xử lý dữ liệu ở Query")
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    },

    // path: (req, res, next) => {
    //     const param = req.params

    //     console.log({ param })

    //     res.json({
    //         message: "Xử lý dữ liệu ở Path Parameter",
    //         data: param
    //     })
    // },
    path: (req, res, next) => {
        try {
            const result = demoService.path(req)
            const resData = responseSuccess(result, "Xử lý dữ liệu ở Path Parameter")
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    },

    // delete: (req, res, next) => {
    //     const headers = req.headers

    //     const { token } = headers
    //     console.log({ token })

    //     res.json({
    //         message: "Xử lý dữ liệu ở Headers",
    //         data: headers
    //     })
    // },
    delete: (req, res, next) => {
        try {
            const result = demoService.delete(req)
            const resData = responseSuccess(result, "Xử lý dữ liệu ở Headers")
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    },

    // body: (req, res, next) => {
    //     const body = req.body

    //     res.json({
    //         message: "Xử lý dữ liệu ở Body",
    //         data: body
    //     })
    // }
    body: (req, res, next) => {
        try {
            const result = demoService.body(req)
            const resData = responseSuccess(result, "Xử lý dữ liệu ở Body")
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }
}

export default demoController