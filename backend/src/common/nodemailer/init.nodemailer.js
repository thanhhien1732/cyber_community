// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "thanhhien1732@gmail.com",   // gmail của mình
        pass: "ukfgjgicxwttyrbf",          // pass "Mật khẩu ứng dụng" (tạo trên Quản lý Tài khoản Google)
    },
});

export const sendMail = async (mailTo) => {
    const info = await transporter.sendMail({
        from: 'thanhhien1732@gmail.com',
        to: mailTo,
        subject: "Cảnh báo bảo mật",
        text: "Tài khoản có lượt đăng nhập mới", // plain‑text body
        html: "<b>Tài khoản có lượt đăng nhập mới</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
}

// Wrap in an async IIFE so we can use await.
// (async () => {
//     const info = await transporter.sendMail({
//         from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//         to: "bar@example.com, baz@example.com",
//         subject: "Hello ✔",
//         text: "Hello world?", // plain‑text body
//         html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Message sent:", info.messageId);
// })();