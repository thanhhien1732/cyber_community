import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_URI_CALLBACK } from '../constant/app.constant';
import passport from 'passport';
import prisma from '../prisma/init.prisma';
import { tokenService } from '../../services/token.service';

// copy code mẫu từ document thư viện passportjs.org
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

export const initGoogleAuth20 = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CLIENT_URI_CALLBACK,
            },
            async function (_accessToken, _refreshToken, profile, cb) {
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });

                // Hàm này sẽ được chạy khi mọi thứ verify với google thành công
                // Sẽ cần profile để kiểm tra trong db

                // ổn => cb(null, user)
                // không ổn => cb (new Error(err), null)

                const googleId = profile.id
                const displayName = profile.displayName
                const email = profile.emails[0].value   // lấy ra nội dung ở vị trí thứ 1
                const emailVerified = profile.emails[0].verified  // lấy ra verified ở vị trí thứ 1
                const photo = profile.photos[0].value

                if (!emailVerified) {
                    return cb(new Error("Email chưa verify"), null)
                }

                let userExits = await prisma.users.findUnique({
                    where: {
                        email: email,
                    }
                })

                if (!userExits) {
                    userExits = await prisma.users.create({
                        data: {
                            email: email,
                            avatar: photo,
                            fullName: displayName,
                            googleId: googleId,
                        }
                    })
                }
                // code mà chạy được tới đây thì userExits luôn luôn có giá trị
                const tokens = tokenService.createTokens(userExits.id)

                return cb(null, tokens)
            }
        )
    );
}
