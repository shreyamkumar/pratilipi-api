const express = require("express");
const app = express();
require("./Config/config");
var cors = require("cors");

app.use(cors());
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Import Routes
const authRoute = require("./Routes/auth");
const storiesRoute = require("./Routes/stories");

//Middleware
//Rpute Middlewares
app.use("/api/user", authRoute);

app.use("/api/stories", storiesRoute);

app.listen(PORT, () => console.log(`we are listening at ${PORT}`));
