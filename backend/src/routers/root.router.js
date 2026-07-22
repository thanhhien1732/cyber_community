import express from "express"
import demoRouter from "./demo.router"
import articleRouter from "./article.router"
import authRouter from "./auth.router"
import roleRouter from "./role.router"
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "../common/swagger/init.swagger"
import userRouter from "./user.router"
import chatMessageRouter from "./chat-message.router"
import chatGroupRouter from "./chat-group.router"

const rootRouter = express.Router()

// copy từ document của swagger
rootRouter.use('/docs', swaggerUi.serve);
rootRouter.get('/docs', swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        persistAuthorization: true
    }
}));

//Nạp API
// rootRouter.use("/demo", express.Router())
rootRouter.use("/demo", demoRouter)
rootRouter.use("/article", articleRouter)
rootRouter.use("/auth", authRouter)
rootRouter.use("/role", roleRouter)
rootRouter.use("/user", userRouter)
rootRouter.use("/chat-message", chatMessageRouter)
rootRouter.use("/chat-group", chatGroupRouter)

export default rootRouter