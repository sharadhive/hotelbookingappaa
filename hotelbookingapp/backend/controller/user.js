const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

router.post("/sign", async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  try {
    if (!findUser) {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      });

      res.status(201).send({
        status: true,
        message: "Registered Successfully",
      });
    } else {
      res.status(201).send({
        status: false,
        message: "Already Registered",
      });
    }
  } catch (e) {
    console.error("Error Occurred:", e);
    res.status(500).send({
      status: false,
      message: "Error occurred while processing the request",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(500).send({
        success: false,
        message: "Un-authorised user",
      });
      
    } else {
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (isPasswordValid && email === findUser.email) {
        const token = jwt.sign({ email: findUser.email }, secretKey, {
          expiresIn: "1d",
        });
        // res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          user: {
            username: findUser.username,
            email: findUser.email,
            id: findUser._id,
            admin: findUser.admin,
          },
          token: token,
        });
      } else {
        res.send({
          success: false,
          message: "Invalid Credentials",
        });
      }
    }
  } catch (e) {
    console.error("Error Occurred", e);
    res.status(500).json("Internal Server Error");
  }
});

router.get('/getusers' , async(req, res)=>{
  try {
    const users = await User.find()
    if(users){
      res.status(201).send(users)
    }
    else {
      res.status(404).json('Unable to get User Data')
    }
  } catch (error) {
    console.log('Error fetching User Data' , error.name);
  }
})

module.exports = router;