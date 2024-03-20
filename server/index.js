require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

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
