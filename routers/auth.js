const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
// const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send("Please provide an Email, password and name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"];

    res.status(201).json({ userId: newUser.id });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ message: "User with given credentials already present" });
    } else {
      return res.status(400).send({ message: "Something went wrong!" });
    }
  }
});
module.exports = router;
