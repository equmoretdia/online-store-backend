require("dotenv").config();
const express = require("express");
const cors = require("cors");

const deviceRouter = require("./routes/deviceRouter");
const userRouter = require("./routes/userRouter");
const brandRouter = require("./routes/brandRouter");
const typeRouter = require("./routes/typeRouter");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

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

//the last middleware is the error handling one
app.use(errorHandler);

module.exports = app;
