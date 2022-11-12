const User = require("../models/user");
const Blog = require("../models/blog"); //Import mongoDB model
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const HTTP_STATUS = require("../utils/httpStatus");
const path = require("path");
const fs = require("fs");

class AuthController {
  saltRounds = 10;

  signup_get(req, res) {
    res.locals.header = "Join Today!";
    res.render("auth/signup", { errors: {} });
  }

  async signup_post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        await fs.promises.unlink(
          path.join(__dirname, "..", "assets", "uploads", req.file.filename)
        );
      }
      console.log(errors.array());
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .render("auth/signup", {
          errors: errors.mapped(),
          header: "Join Today!",
        });
    }
    try {
      const { name, email, birth_date, gender } = req.body;
      const photo = req.file ? "/uploads/" + req.file.filename : undefined; //To handle empty strings or null values and assign default value
      const password = await bcrypt.hash(req.body.password, this.saltRounds);
      const user = new User({
        name,
        email,
        password,
        birth_date,
        gender,
        photo,
        posts: [],
      });

      await user.save();
      console.log("You are now logged in");
      req.session.user = { id: user._id, name: user.name, photo: user.photo };
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  login_get(req, res) {
    res.locals.header = "Sign into your account";
    res.render("auth/login", { errors: {} });
  }

  async login_post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).render("auth/login", {
        errors: errors.mapped(),
        header: "Sign into you account",
      });
    }
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      if (user) {
        console.log("You are now logged in");
        req.session.user = { id: user._id, name: user.name, photo: user.photo };
        return res.redirect("/");
      }
      return res.status(HTTP_STATUS.BAD_REQUEST).render("auth/login", {
        errors: { user: "User not found" },
        header: "Sign into you account",
      });
    } catch (err) {
      next(err);
    }
  }

  logout = (req, res, next) => {
    // /logout
    req.session.destroy((err) => {
      if (err) next(err);
      else {
        console.log("You are now logged out");
        res.redirect("/");
      }
    });
  };

  getProfile(req, res, next) {
    const id = req.params.id;
    User.findById(id)
      .populate("posts", "-updatedAt")
      .then(function (result) {
        // -updatedAt removes updatedAt from populated list
        res.locals.header = "Your Profile";
        //console.log(result);
        res.render("auth/user_profile", { user: result });
      })
      .catch((err) => next(err));
  }

  async getProfileUpdateForm(req, res, next) {
    const id = req.params.id;
    res.locals.header = "Update Your Profile";
    try {
      const user = await User.findById(id).select("-password").exec(); //exclude password
      res.render("auth/update_info", { user, errors: {} });
    } catch (err) {
      next(err);
    }
  }

  async updateProfileInfo(req, res, next) {
    const errors = validationResult(req);
    try {
      const user = await User.findById(req.params.id)
        .populate("posts", "-updatedAt")
        .exec();
      if (!user)
        return res.status(HTTP_STATUS.FORBIDDEN).render("auth/update_info", {
          errors: { user: "User not found" },
          header: "Update Your Profile",
        });
      if (!errors.isEmpty()) {
        if (req.file) {
          await fs.promises.unlink(
            path.join(__dirname, "..", "assets", "uploads", req.file.filename)
          );
        }
        console.log(errors.array());
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .render("auth/update_info", {
            errors: errors.mapped(),
            user,
            header: "Update Your Profile",
          });
      }
      const { name, email, birth_date, gender, photoClear } = req.body;
      if (req.file || photoClear) {
        if (user.photo && user.photo.startsWith("/uploads/")) {
          const filepath = path.join(__dirname, "..", "assets", user.photo);
          if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
        }
        user.photo = req.file
          ? "/uploads/" + req.file.filename
          : "/default-profile.jpg"; // default will kick in for save() only for document creation
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (birth_date) user.birth_date = birth_date;
      if (gender) user.gender = gender;
      await user.save();
      req.session.user = { id: user._id, name: user.name, photo: user.photo };
      res.redirect(`/user/${user._id}`);
    } catch (err) {
      next(err);
    }
  }

  getResetForm(req, res, next) {
    res.locals.header = "Reset your password";
    // errors=await req.consumeFlash('errors');
    // console.log(errors);
    res.render("auth/password-reset", { errors: {} });
  }

  async resetPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        //await req.flash('errors', errors.mapped());
        res.redirect(`/user/${req.session.user.id}/reset-password`);
      }

      const { password } = req.body;

      const user = await User.findOne({ _id: req.session.user.id });
      if (!user) {
        return res.status(HTTP_STATUS.FORBIDDEN).send("Invalid user!");
      }

      user.password = await bcrypt.hash(password, this.saltRounds);
      await user.save();

      return res.redirect(`/user/${req.session.user.id}`);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await User.findByIdAndDelete(req.session.user.id).exec();
      if (!user) return res.status(HTTP_STATUS.FORBIDDEN).send("Invalid user!");
      if (
        user.photo.startsWith("/uploads/") &&
        fs.existsSync(path.join(__dirname, "..", "assets", user.photo))
      ) {
        console.log("here");
        await fs.promises.unlink(
          path.join(__dirname, "..", "assets", user.photo)
        );
      }
      await Blog.deleteMany({ author: req.session.user.id }).exec();
      req.session.destroy((err) => {
        if (err) throw new Error(err);
        else {
          console.log("Your account has been deleted successfully");
          res.send({ redirect: "/" });
        }
      });
    } catch (error) {
      next(error.message);
    }
  }
}

module.exports = new AuthController();
