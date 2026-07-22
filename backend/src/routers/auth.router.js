import express from 'express';
import { authController } from '../controllers/auth.controller';
import { protect } from '../common/middlewares/protect.middleware';
import passport from 'passport';
import { checkPermission } from '../common/middlewares/check-permission.middleware';

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/', authController.create);
authRouter.get('/', authController.findAll);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/get-info', protect, checkPermission, authController.getInfo);
authRouter.post('/refresh-token', authController.refreshToken);

// FE sẽ gọi từ thanh url của trình duyệt để kích hoạt gọi api GET tới: http://localhost:3069/api/auth/google
// BE sẽ nhận tín hiệu api này và passport sẽ phản hồi res.redirect() về lại FE để chuyển FE sang trang đăng nhập của Google
// Người dùng sẽ tiến hành đăng nhập với bên Google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));  // Copy code ở Document thư viện passport - tại phần Authenticate Requests

// Sau khi người dùng đã xác thực thành công với bên Google
// Google sẽ redirect lại URL mà chúng ta cung cấp cho Google trước đó
// Quan trọng là nhận được code của Google trả về
// http://localhost:3069/api/auth/google/callback?code=4%2F0AVGzR1AYXAdcQWMYX6HLSiIdHuYPsJaheodHQOGr2WAAxhKlTVREdz_j1RHnJxtGkazjLw&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
// Chủ yếu passport.authenticate("google" cần code để làm việc với google nếu thành công vì chạy tiếp, không thành công thì phản hồi về FE failureRedirect: '/login' )
// Nếu xử lý code thành công thì chạy callback trong passport.use(new GoogleStrategy(
// Copy code ở Document thư viện passport - tại phần Authenticate Requests
authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleAuth20
);

// API có /:id phải để ở cuối (vì những API cùng phương thức get/post/... sẽ bị xung đột)
authRouter.get('/:id', authController.findOne);
authRouter.patch('/:id', authController.update);
authRouter.delete('/:id', authController.remove);

export default authRouter;