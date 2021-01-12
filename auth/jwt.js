const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

//Synchronously sign the given payload into a JSON Web Token string payload
function toJwt(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "2h" });
}

//Synchronously verify given token using a secret or a public key to get a decoded toke
function toData(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { toJwt, toData };
