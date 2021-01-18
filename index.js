const express = require("express");
const User = require("./models").user;
const app = express();
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const recipeRouter = require("./routers/recipe");
const loggerMiddleWare = require("morgan");
const BodyParser = express.json();
const cors = require("cors");
const authMiddleWare = require("./auth/middleware");

//MiddleWares:
//- Morgan middleware
//  Allows for visualisation of request
//- Body Parser
//  Allows reading reuquest bodies of JSON Requests.
//- Cors "Cross Origin Resource Sharing"
//  Enables other domains to access the database
app.use(loggerMiddleWare("dev"));
app.use(BodyParser);
app.use(cors());

//Routers:
//- Sign up && Logging in
//  A endpoint set up for handling request
//  conserning logging in and signing up
app.use("/", authRouter);
app.use("/favorites", authMiddleWare, recipeRouter);

//authMiddleWare

app.listen(PORT, () =>
  console.log(`
server started on: ${PORT}
available endpoints:
- Authorization Router
- /login
- /signup

- Authorized Requests
- /favorites/list
- /favorites/toggle`)
);
