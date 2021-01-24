import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";

import User from "../modules/users/user.model";
import constants from "../config/constants";

// Local strategy
const localOpts = {
  usernameField: "email",
};

const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(e, false);
    }
  }
);

//JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("authorization"),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

// Facebook strategy
const facebookOpts = {
  clientID: constants.FACEBOOK_APP_ID,
  clientSecret: constants.FACEBOOK_APP_SECRET,
  callbackURL: "http://www.example.com/auth/facebook/callback",
  profileFields: ["email", "name"]
};

const facebookStategy = new FacebookStrategy(facebookOpts, function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  User.findOrCreate(function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(facebookStategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });
export const authFacebook = passport.authenticate("facebook");
export const authFacebookRedirect = passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login",
});
