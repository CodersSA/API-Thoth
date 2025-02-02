import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "./config";
import User from "../jbg/models/User";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        console.log(error);

    }

});