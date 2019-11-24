const express = require("express");
const joi = require("@hapi/joi");
const UsersModel = require("../users/users.model");
const CustomersModel = require("../customers/customers.model");
const RoomsModel = require("../rooms/rooms.model");
const BookingModel = require("../booking/booking.model");
const adminRouter = express.Router();

adminRouter.get("/get-users", async (req, res) => {
  // check login
  if (
    !req.session.currentUser ||
    req.session.currentUser.email !== "admin@gmail.com"
  ) {
    res.status(403).json({
      success: false,
      message: "Bạn không được quyền truy cập!"
    });
  } else {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const validateSchema = joi.object().keys({
      pageNumber: joi.number().min(1),
      pageSize: joi
        .number()
        .min(1)
        .max(50)
    });
    const validateResult = joi.validate(req.query, validateSchema);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.details[0].message
      });
    } else {
      // Show user
      const usersData = await UsersModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();

      const countUsers = await UsersModel.countDocuments();
      res.status(200).json({
        success: true,
        data: {
          usersData: usersData,
          countUsers: countUsers
        }
      });
    }
  }
});

adminRouter.get("/get-customers", async (req, res) => {
  // check login
  if (
    !req.session.currentUser ||
    req.session.currentUser.email !== "admin@gmail.com"
  ) {
    res.status(403).json({
      success: false,
      message: "Bạn không được quyền truy cập!"
    });
  } else {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const validateSchema = joi.object().keys({
      pageNumber: joi.number().min(1),
      pageSize: joi
        .number()
        .min(1)
        .max(50)
    });
    const validateResult = joi.validate(req.query, validateSchema);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.details[0].message
      });
    } else {
      // Show customers
      const customersData = await CustomersModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();

      const countCustomers = await CustomersModel.countDocuments();
      res.status(200).json({
        success: true,
        data: {
          customersData: customersData,
          countCustomers: countCustomers
        }
      });
    }
  }
});

adminRouter.get("/get-rooms", async (req, res) => {
  // check login
  if (
    !req.session.currentUser ||
    req.session.currentUser.email !== "admin@gmail.com"
  ) {
    res.status(403).json({
      success: false,
      message: "Bạn không được quyền truy cập!"
    });
  } else {
    console.log(req.query);
    console.log("sòmál");
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const validateSchema = joi.object().keys({
      pageNumber: joi.number().min(1),
      pageSize: joi
        .number()
        .min(1)
        .max(50)
    });
    const validateResult = joi.validate(req.query, validateSchema);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.details[0].message
      });
    } else {
      // Show rooms
      const roomsData = await RoomsModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();

      const countRooms = await RoomsModel.countDocuments();
      res.status(200).json({
        success: true,
        data: {
          roomsData: roomsData,
          countRooms: countRooms
        }
      });
    }
  }
});

adminRouter.get("/get-booking", async (req, res) => {
  // check login
  if (
    !req.session.currentUser ||
    req.session.currentUser.email !== "admin@gmail.com"
  ) {
    res.status(403).json({
      success: false,
      message: "Bạn không được quyền truy cập!"
    });
  } else {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const validateSchema = joi.object().keys({
      pageNumber: joi.number().min(1),
      pageSize: joi
        .number()
        .min(1)
        .max(50)
    });
    const validateResult = joi.validate(req.query, validateSchema);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.details[0].message
      });
    } else {
      // Show rooms
      const bookingData = await BookingModel.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();

      const countBooking = await BookingModel.countDocuments();
      res.status(200).json({
        success: true,
        data: {
          bookingData: bookingData,
          countBooking: countBooking
        }
      });
    }
  }
});

module.exports = adminRouter;
