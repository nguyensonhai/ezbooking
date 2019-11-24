const express = require("express");
const joi = require("@hapi/joi");
const bookingRouter = express.Router();
const bookingModel = require("./booking.model");

bookingRouter.post("/save-order", async (req, res) => {
  try {
    const newOffer = await bookingModel.create({
      email: req.body.email,
      price: req.body.price,
      bookDate: req.body.bookDate,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      room: req.body.room
    });
    res.status(200).json({
      success: true,
      data: newOffer
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

bookingRouter.get("/history", async (req, res) => {
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize);
  const email = String(req.query.email);
  const validateSchema = joi.object().keys({
    pageNumber: joi.number().min(1),
    pageSize: joi
      .number()
      .min(1)
      .max(10),
    email: joi.string()
  });
  const validateResult = joi.validate(
    {
      pageNumber: pageNumber,
      pageSize: pageSize,
      email: email
    },
    validateSchema
  );
  if (validateResult.error) {
    const error = validateResult.error.details[0];
    res.status(400).json({
      success: false,
      message: error.message
    });
  } else {
    const result = await bookingModel
      .find({ email: email })
      .sort({ createAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const total = await bookingModel.find({ email: email }).countDocuments();

    res.status(200).json({
      success: true,
      data: {
        data: result,
        total: total
      }
    });
  }
});

module.exports = bookingRouter;
