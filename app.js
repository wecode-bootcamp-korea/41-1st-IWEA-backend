require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const { appDataSource } = require("./models/appDataSource");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const start = async () => {
  try {
    await appDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error occurred during Data Source initialization", err);
      });

    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    appDataSource.destroy();
    console.error(err);
  }
};

start();
