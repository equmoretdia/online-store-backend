const app = require("./app");
const sequelize = require("./db");
const models = require("./models/models");

const PORT = process.env.PORT || 3000;

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
