const express = require("express");
const userRouter = express.Router();
const UsersModel = require("./users.model");
const bcrypt = require("bcryptjs");
const joi = require("@hapi/joi");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

userRouter.post(`/register`, async (req, res) => {
  try {
    //console.log(req.body);
    if (!emailRegex.test(req.body.email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    } else if (req.body.password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must more than 6 characters"
      });
    } else {
      const data = await UsersModel.findOne({ email: req.body.email }).lean();
      if (data) {
        res.status(400).json({
          success: false,
          message: "Email has been used"
        });
      } else {
        //hash password
        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        //create user record
        const newUser = await UsersModel.create({
          email: req.body.email,
          password: hashPassword,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber
        });
        res.status(200).json({
          success: true,
          data: newUser
        });
      }
    }
  } catch (err) {
    res.status(500).json()({
      success: false,
      message: err.message
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await UsersModel.findOne({ email: req.body.email }).lean();
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found"
      });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).json({
        success: false,
        message: "Wrong password"
      });
    } else {
      req.session.currentUser = {
        _id: user._id,
        email: user.email
      };
      res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
          email: user.email
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

userRouter.post("/editUserProfile", async (req, res) => {
  if (!req.session.currentUser || !req.session.currentUser.email) {
    res.status(403).json({
      success: false,
      message: "Forbidden"
    });
  } else {
    const UserValidateSchema = joi.object().keys({
      id: joi.string().required(),
      email: joi.string().required(),
      avatarUrl: joi.string(),
      fullName: joi.string().required(),
      phone: joi.number().required(),
      address: joi.string().required(),
      imgAvatar: joi.string().required(),
      lastModify: joi.string().required()
    });
    const validateResult = joi.validate(req.body, UserValidateSchema);
    if (validateResult.error) {
      const error = validateResult.error.details[0];
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else {
      try {
        const result = await UsersModel.findByIdAndUpdate(req.body.id, {
          fullName: req.body.fullName,
          email: req.body.email,
          phoneNumber: req.body.phone,
          address: req.body.address,
          avatarUrl: req.body.imgAvatar,
          lastModifiedAt: req.body.lastModify
        }).lean();
        res.status(200).json({
          success: true
        });
      } catch (error) {
        res.status(403).json({
          success: false,
          message: error.message
        });
      }
    }
  }
});

userRouter.get("/:userEmail", async (req, res) => {
  try {
    const userData = await UsersModel.findOne({
      email: req.params.userEmail
    }).lean();
    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: "Logout success"
  });
});

module.exports = userRouter;
