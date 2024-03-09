const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

const signupRouter = require("./routes/auth");

app.use("/", signupRouter);
app.use((error, req, res, next) => {
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
