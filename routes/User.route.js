require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const { UserModel } = require("../models/User.model");

const jwtSecret = process.env.JWT_SECRET_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// Register a user
userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, saltRounds, async (err, securedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: securedPassword,
          age,
        });
        await user.save();
        console.log(user);
        res.send("User Registered");
      }
    });
  } catch (err) {
    res.send("Error while registering user");
    console.log(err);
  }
});

// Login a user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              user: {
                name: user[0].name,
                email: user[0].email,
                age: user[0].age,
                id: user[0]._id,
              },
            },
            jwtSecret
          );
          res.send({
            message: "Login Successful",
            token: token,
          });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send("Error while logging in user");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
