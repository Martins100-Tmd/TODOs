const colors = require("colors");

const { uri } = require("./uri");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const Conn = await mongoose.connect(process.env.MONGOOSE_URI || uri);
    console.log(`MongoDb connected : ${Conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
