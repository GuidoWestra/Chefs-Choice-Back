const express = require("express");
const User = require("./models").user;
const app = express();
const { PORT } = require("./config/constants");

app.listen(PORT, () =>
  console.log(`
server started on: ${PORT}
available endpoints:
- / Get ""
- / Post ""
- / Delete ""
- / Patch ""
`)
);
