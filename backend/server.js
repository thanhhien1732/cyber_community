import express from 'express';
import rootRouter from './src/routers/root.router';
import { appError } from './src/common/app-error/app-error.error';
import cors from 'cors';
import { initGoogleAuth20 } from './src/common/passport/google-auth20.passport';

import { createServer } from "http";
import { initSocket } from './src/common/socket/init.socket';
import { CORS_ORIGINS, PORT } from './src/common/constant/app.constant';


const app = express();

app.use(express.static("public"));

app.use(express.json());  // Giúp Body nhận được dữ liệu

app.use(cors({
    origin: CORS_ORIGINS
}));

initGoogleAuth20();  // Phải để trước rootRouter

// =================================================

app.use("/api", rootRouter);  // app.use("/api", express.Router())

app.use(appError);  // Xử lý lỗi

// =================================================

// Socket
const httpServer = createServer(app);
initSocket(httpServer);

// =================================================

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
