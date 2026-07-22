import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Tự động folder nếu chưa có
fs.mkdirSync("images/", { recursive: true })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },

    filename: function (req, file, cb) {
        const extName = path.extname(file.originalname)
        console.log({ extName })
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "local" + '-' + uniqueSuffix + extName)
    }
})

export const uploadLocal = multer({ storage: storage })