require("dotenv").config();
const express = require("express");
const cors = require("cors");

const deviceRouter = require("./routes/deviceRouter");
const userRouter = require("./routes/userRouter");
const brandRouter = require("./routes/brandRouter");
const typeRouter = require("./routes/typeRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/type", typeRouter);
app.use("/api/brand", brandRouter);
app.use("/api/device", deviceRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "it's working!" });
// });

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

//the last middleware is the error handling one
app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
  console.log(err);
});

module.exports = app;
