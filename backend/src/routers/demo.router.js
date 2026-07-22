import express from "express"
import demoController from "../controllers/demo.controller"

const demoRouter = express.Router()

// "/": path, url, endpoint

// demoRouter.get("/check-server", (req, res, next) => {
//     const result = demoService.checkServer()
//     res.json(result);
// })
demoRouter.get("/check-server",
    (req, res, next) => {
        console.log(`mid 1`)
        req.payload = 'dữ liệu của mid'
        next()
    },
    (req, res, next) => {
        console.log(`mid 2`)
        console.log(req.payload)
        next()
    },
    (req, res, next) => {
        console.log(`mid 3`)
        next()
    },

    demoController.checkServer
)

/**
 * Query Parameters
 * - Nhận biết: Sau dấu ? và mỗi tham số cách bằng dấu &
 * - Thường dùng cho: Phân trang, lọc dữ liệu, tìm kiếm,...
 * - Tránh: Thiết kế nhận qua body vì FE (axios) chặn gửi body với GET
 */

// demoRouter.get("/query", (req, res, next) => {
//     const result = demoService.query(req)

//     res.json(result)
// })
demoRouter.get("/query", demoController.query)

/**
 * Path Parameters
 * Nhận biết: Được xác định bằng dấu : trong url
 * Thường dùng: (Lấy/Xóa/Cập nhật) một phần tử cụ thể thông qua id
 * id: sẽ luôn luôn là chuỗi (nếu là số sẽ là chuỗi số)
 */

// demoRouter.put("/path/:id", (req, res, next) => {
//     const result = demoService.path(req)

//     res.json(result)
// })
demoRouter.put("/path/:id", demoController.path)

/**
 * Headers
 * Thường dùng: Xác thực token (Authorization), meta data, x-api-key
 */

// demoRouter.delete("/delete", (req, res, next) => {
//     const result = demoService.delete(req)

//     res.json(result)
// })
demoRouter.delete("/delete", demoController.delete)

/**
 * Body
 */

// demoRouter.post("/body", (req, res, next) => {
//     const result = demoService.body(req)

//     res.json(result)
// })
demoRouter.post("/body", demoController.body)

export default demoRouter
