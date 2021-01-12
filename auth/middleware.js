const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !(auth[0] === "Bearer" || !auth[1])) {
    return res.status(401).send({
      message: "This endpoint is portected and requires an authorization header",
    });
  }
}
