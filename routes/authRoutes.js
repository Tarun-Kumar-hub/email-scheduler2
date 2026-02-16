import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("register.ejs");
});

router.get("/home", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  res.render("home.ejs", {
    user: { name: req.user.name, photo: req.user.photo },
  });
});

router.get("/about", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  res.render("about.ejs", {
    user: { name: req.user.name, photo: req.user.photo },
  });
});

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/auth/google/home",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/",
  }),
);

export default router;
