const User = require("../models/UserModel");
const mongoose = require("mongoose");
const { gfs, db } = require("../db/database");

const addUser = async (req, res) => {
  try {
    const userFind = await User.findOne({ name: req.body.name });
    if (userFind === null) {
      const userCreated = new User({
        name: req.body.name,
        picture: req.file.filename,
        pictureStatus: true,
        password: req.body.password,
      });
      const userSaved = await userCreated.save();
      res.status(201).send({
        status: "success",
        data: userCreated,
      });
    } else {
      res.status(201).send({
        status: "already exist",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const userFind = await User.findOne({ name: req.body.name });
    if (userFind !== null) {
      if (userFind.password !== req.body.password) {
        res.status(201).send({
          status: "wrong password",
        });
      } else {
        res.status(201).send({
          status: "success",
          data: userFind,
        });
      }
    } else {
      return res.status(201).send({
        status: "not registered",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.loggedId } });
    res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

const getLoggedInUserDetails = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.loggedId });
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

const renderImage = async (req, res) => {
  gfs.grid.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file) {
      console.log("error");
      return res.status(404).json({ err: "No file Exist" });
    } else {
      const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads",
      });
      const readStream = bucket.openDownloadStreamByName(file.filename);
      readStream.pipe(res);
    }
  });
};

module.exports = {
  addUser,
  loginUser,
  getAllUsers,
  renderImage,
  getLoggedInUserDetails,
};
