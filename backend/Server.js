const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5500;
const { connectDB } = require("./config/DB");
const { errHandler } = require("./middleware/errormidware");
let cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(errHandler);
app.use("/users", require("./routes/userroutes"));
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
