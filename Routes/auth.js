const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Register User
router.post("/register", async (req, res) => {
  //Checking if user exist

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send({ message: "Email already exist", type: "email" });

  //Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    date: req.body.date,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ message: "User with the email doesn't exist", type: "email" });

  //Password is correct

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ message: "Wrong Password", type: "password" });
  else return res.status(200).send("User signed in");
});

module.exports = router;
