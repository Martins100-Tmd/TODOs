const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3300;
const { connectDB } = require("./config/DB");
const { errHandler } = require("./middleware/errormidware");
let cors = require("cors");
const path = require("path");
const app = express();
console.log(process.env.PORT);
app.use(express.static(path.join(__dirname, "../frontend/build")));
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
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "build", "index.html")
  );
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
