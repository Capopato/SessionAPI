import passportLocal from "passport-local";
import passport from "passport";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {}));
