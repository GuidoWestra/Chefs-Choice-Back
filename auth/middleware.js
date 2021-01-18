const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !(auth[0] === "Bearer" || !auth[1])) {
    return res.status(401).send({
      message: "This endpoint is protected and requires an authorization header",
    });
  }

  try {
    const data = toData(auth[1]);
    const user = findByPk(data.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.user = user;

    return next();
  } catch (e) {
    console.log("error in auth middleware:", error);
    switch (error.name) {
      case "TokenExpiredError":
        return res.status(401).send({ error: error.name, message: error.message });
      case "JsonWebTokenError":
        return res.status(401).send({ error: error.name, message: error.message });
      default:
        return res.status(400).send({ message: "oops error" });
    }
  }
}
module.exports = auth;
