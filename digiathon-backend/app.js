const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const requestsRouter = require("./routes/requests");
const documentsRouter = require("./routes/documents");

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

app.use("/requests", requestsRouter);
app.use("/documents", documentsRouter);

const bootstrap = async () => {
  await connectDB();
};

bootstrap();

app.listen(8000, () => {
  console.log("APP STARTED AT 8000");
});
