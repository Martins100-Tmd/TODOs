const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3300;
const { connectDB } = require("./config/DB");
const { errHandler } = require("./middleware/errormidware");
let cors = require("cors");
const app = express();
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
console.log(process.env.PORT);
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
