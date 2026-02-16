import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import db from "./db.js";
import env from "dotenv";

env.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/home",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const photo = profile.photos[0].value;

        const result = await db.query("SELECT * FROM users WHERE email=$1", [
          email,
        ]);

        let user;
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email,name,photo,password) VALUES ($1,$2,$3,$4) RETURNING *",
            [email, name, photo, "google"],
          );
          user = newUser.rows[0];
        } else {
          user = result.rows[0];
        }

        cb(null, user);
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

export default passport;
