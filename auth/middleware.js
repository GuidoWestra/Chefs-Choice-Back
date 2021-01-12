// const User = require("../models").user;
// const { toData } = require("./jwt");

// async function auth(req, res, next) {
//   const auth = req.headers.authorization && req.headers.authorization.split(" ");

//   if (!auth || !(auth[0] === "Bearer" || !auth[1])) {
//     return res.status(401).send({
//       message: "This endpoint is portected and requires an authorization header",
//     });
//   }

//   try{
//     const data = toData(auth[1]);
//     const user = findByPk(data.userId)
//     if (!user) {
//       return res.status(404).send({message})
//     }
//   }
// }
