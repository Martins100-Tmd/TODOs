const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name fields"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
    },
    date: {
      type: String,
    },
    clock: {
      type: String,
    },
    update: {
      type: String,
    },
    updatedClock: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "please a password"],
    },
    personal_todos: [
      {
        body: String,
        created: String,
      },
    ],
    business_todos: [
      {
        body: String,
        created: String,
      },
    ],
    lifestyle_todos: [
      {
        body: String,
        created: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", UserSchema);
