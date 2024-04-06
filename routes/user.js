const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signin", (req, res) => {
  res.render("user/signin.ejs");
});

router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post("/signin", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({
      email,
      username,
    });
    let regUser = await User.register(newUser, password);
    req.login(regUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Travel India");
      res.redirect("places");
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Travel India");
    res.redirect("places");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged Out");
    res.redirect("places");
  });
});

module.exports = router;
