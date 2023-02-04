require("colors");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const Conn = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log(
      `MongoDb connected : ${Conn.connection.host}`.blue.underline.italic
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
