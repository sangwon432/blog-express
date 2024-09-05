import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_ACCESSTOKEN_SECRET; FOR SOME REASON THIS LINE CAUSES AN ERROR. HAVE TO FIX IT LATER
opts.secretOrKey = "sangwonaccesstoken";

const authenticate = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            console.log(payload.userId)
            try {
                const user = await User.findById(payload.userId);
                if (user) {
                    console.log(user)
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

export default authenticate;