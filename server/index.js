require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");

const deviceRouter = require("./routes/deviceRouter");
const userRouter = require("./routes/userRouter");
const brandRouter = require("./routes/brandRouter");
const typeRouter = require("./routes/typeRouter");

const PORT = process.env.PORT || 3000;

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

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
