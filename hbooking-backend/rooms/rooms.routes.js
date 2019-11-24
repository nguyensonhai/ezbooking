const express = require("express");
const joi = require("@hapi/joi");
const roomsModel = require("./rooms.model");
const roomsRouter = express.Router();

roomsRouter.post("/create-room", async (req, res) => {
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
    // validate
    const roomsValidateSchema = joi.object().keys({
      title: joi.string().required(),
      address: joi.string().required(),
      type: joi.string().required(),
      description: joi.string().required(),
      option: {
        kitchen: joi.boolean().required(),
        internet: joi.boolean().required(),
        pool: joi.boolean().required(),
        bathroom: joi.boolean().required(),
        tv: joi.boolean().required(),
        fridge: joi.boolean().required(),
        microwave: joi.boolean().required()
      },
      price: joi.number().required(),
      image: joi.array().required()
    });
    const validateResult = joi.validate(req.body, roomsValidateSchema);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.details[0].message
      });
    } else {
      // create new room
      try {
        const newRoom = await roomsModel.create({
          title: req.body.title,
          address: req.body.address,
          type: req.body.type,
          description: req.body.description,
          option: {
            kitchen: req.body.option.kitchen,
            internet: req.body.option.internet,
            pool: req.body.option.pool,
            fridge: req.body.option.fridge,
            microwave: req.body.option.microwave,
            tv: req.body.option.tv,
            bathroom: req.body.option.bathroom
          },
          price: req.body.price,
          image: req.body.image
        });
        res.status(201).json({
          success: true,
          data: newRoom
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    }
  }
});
//Get Top Cheapest
roomsRouter.get("/get-cheapest", async (req, res) => {
  try {
    //Get
    const result = await roomsModel.find({}).lean();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

roomsRouter.get("/get-latest", async (req, res) => {
  try {
    //Get
    const result = await roomsModel
      .find({})
      .sort({ createdAt: 1, title: -1 })
      .limit(8)
      .lean();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

//Search for rooms
roomsRouter.post("/search", async (req, res) => {
  try {
    const main = req.body.main;
    const city = req.body.city;
    const result = await roomsModel
      .find({
        $and: [
          { title: { $regex: main, $options: "i" } },
          { address: { $regex: city, $options: "i" } }
        ]
      })
      .lean();

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});
roomsRouter.get("/:roomId", async (req, res) => {
  try {
    const room = await roomsModel.findById(req.params.roomId).lean();
    console.log(room);
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = roomsRouter;
