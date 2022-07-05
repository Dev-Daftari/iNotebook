const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser", // Validation using Express Validator
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 character long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Using post because passwords involved
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // See if the email isn't duplicate
    }
    try {
      let user = await User.findOne({ email: req.body.email }); // await used beacuse it waits till it finds some match
      if (user) {
        return res
          .status(400)
          .json({ errors: "A user with this email already exists." });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
