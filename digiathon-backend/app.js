const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const requestsRouter = require("./routes/requests");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/requests", requestsRouter);

const bootstrap = async () => {
  await connectDB();
};

bootstrap();

app.listen(8000, () => {
  console.log("APP STARTED AT 8000");
});
