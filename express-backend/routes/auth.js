const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcryptjs"); //password encryption library
const jwt = require("jsonwebtoken");
const jwtSecret = "Thisisarandomstring";

//signup
router.post(
  "/createuser",
  [
    //validators
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("name", "Name must be atleast 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email address").isEmail(),
  ],
  async (req, res) => {
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // encrypting password
    const salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(req.body.password, salt);
    //writing to the database
    try {
      await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json(req.body);
    } catch (error) {
      console.log(error);
    }
  }
);

// login
router.post(
  "/login",
  body("email", "Enter a valid email address").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email; //entered email
    let password = req.body.password; //entered password
    try {
      let userDetail = await User.findOne({ email }); //returns all data of the user
      if (!userDetail) {
        return res.status(400).json({ error: "Enter correct Email address" });
      }

      if (!(await bcrypt.compare(password, userDetail.password))) {
        return res.status(400).json({ error: "Enter correct password" });
      } else {
        const data = {
          user: {
            id: userDetail.id,
          },
        };
        const authTkn = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken: authTkn });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
