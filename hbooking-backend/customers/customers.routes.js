const express = require("express");
const joi = require("@hapi/joi");
const customerModel = require("./customers.model");
const customersRouter = express.Router();

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
customersRouter.post("/save-infor", async (req, res) => {
  try {
    //validate customer infor
    if (!emailRegex.test(req.body.email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    } else if (!req.body.fullName) {
      res.status(400).json({
        success: false,
        message: "Please input data"
      });
    } else {
      const newCustomer = await customerModel.create({
        fullName: req.body.fullName,
        identityCard: req.body.identityCard,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        room: req.body.room
      });
      res.status(200).json({
        success: true,
        data: newCustomer
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = customersRouter;
