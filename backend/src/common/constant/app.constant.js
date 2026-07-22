import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL

export const PORT = Number(process.env.PORT) || 3069
export const CORS_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const GOOGLE_CLIENT_URI_CALLBACK = process.env.GOOGLE_CLIENT_URI_CALLBACK

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// Log tạm trong lúc dev để kiểm tra có nạp được env hay không
// Khi lên production chạy thật cho khách hàng thì xóa
// console.log({
//     DATABASE_URL,
//     ACCESS_TOKEN_SECRET,
//     ACCESS_TOKEN_EXPIRES_IN,
//     REFRESH_TOKEN_SECRET,
//     REFRESH_TOKEN_EXPIRES_IN,
//     GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET,
//     GOOGLE_CLIENT_URI_CALLBACK,
//     CLOUDINARY_NAME,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET
// })
