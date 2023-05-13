const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");
app.use(
  cors({
    credentials: true,
  })
);
//Config
dotenv.config({ path: __dirname + "/config" + "/config.env" });

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route import
const product = require("./routes/productRoute");
const User = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", User);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.send("sdhgvwshgdvb");
});

//MiddleWare For error
app.use(errorMiddleware);

module.exports = app;
