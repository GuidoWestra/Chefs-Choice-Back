const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJwt } = require("../auth/jwt");
const User = require("../models/").user;
const Recipe = require("../models/").recipe;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();
//Sign up Route
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ message: "Please provide an Email, password and name" });
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"];

    return res.status(201).json({ userId: newUser.id });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ message: "User with given credentials already present" });
    } else {
      return res.status(400).send({ message: "Something went wrong!" });
    }
  }
});
//Login Route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide both email and password",
      });
    }
    const user = await User.findOne({ where: { email }, include: { model: Recipe } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).send({ message: "Password incorrect" });
    }

    delete user.dataValues["password"];
    delete user.dataValues["updatedAt"];
    delete user.dataValues["createdAt"];
    const token = toJwt({ userId: user.id });

    return res.status(200).send({ token, ...user.dataValues });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong there" });
  }
});
module.exports = router;
