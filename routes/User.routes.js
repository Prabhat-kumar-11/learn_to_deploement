const express = require("express");
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, city, age, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, name, city, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New user has been registered" });
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.name },
            "masai"
          );
          console.log(token);
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials !!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials !!" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
