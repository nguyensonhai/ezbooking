const express = require("express");
const multer = require("multer");
const fs = require("fs");

const uploadsRouter = express.Router();
const uploads = multer({
  dest: "public"
});

uploadsRouter.post("/photos", uploads.array("image"), async (req, res) => {
  // rename
  console.log(req.files);
  const arrayImage = [];
  for (let i = 0; i < req.files.length; i++) {
    const fileExt = req.files[i].originalname.split(".");
    const ext = fileExt[fileExt.length - 1];
    fs.renameSync(req.files[i].path, `public/${req.files[i].filename}.${ext}`);
    arrayImage.push(`/${req.files[i].filename}.${ext}`);
  }

  console.log(arrayImage);
  // return url
  res.status(201).json({
    success: true,
    data: arrayImage
  });
});

uploadsRouter.post(
  "/uploadAvatar",
  uploads.single("image"),
  async (req, res) => {
    //ReName
    const fileExt = req.file.originalname.split(".");
    const ext = fileExt[fileExt.length - 1];
    fs.renameSync(req.file.path, `public/${req.file.filename}.${ext}`);

    //return url
    res.status(200).json({
      success: true,
      data: `/${req.file.filename}.${ext}`
    });
  }
);

module.exports = uploadsRouter;
