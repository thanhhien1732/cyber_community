// export const responseSuccess = () => {
//     return {
//         status: `success`,
//         statusCode: 200,
//         message: `ok`,
//         data
//     }
// }
export const responseSuccess = (data, message, statusCode = 200) => {
    return {
        status: `success`,
        statusCode: statusCode,
        message: message,
        data: data
    }
}

// export const responseError = () => {
//     return {
//         status: `Error`,
//         statusCode: 500,
//         message: `Internal Server Error`,
//         stack
//     }
// }

// (Update code) Xử lý lỗi
export const responseError = (message = `Internal Server Error`, statusCode = 500, stack = null) => {
    return {
        status: `Error`,
        statusCode: statusCode,
        message: message,
        stack: stack
    }
}