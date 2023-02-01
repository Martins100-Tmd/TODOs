const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/usermodel");
const { clock, date } = require("./date");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");
require("dotenv").config();
const secret = process.env.SECRET || "ACB123";
router.use(bodyParser.json());
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt.verify(token, secret);
    const goal = await Users.findById(id.id);
    goal
      ? res.status(200).json(goal)
      : res.status(400).json({ message: "User doesn't exist", success: false });
  })
);
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const userExist = await Users.findOne({ password: req.body.password });
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Make sure all fields are filled",
        success: false,
        page: "",
      });
    } else if (userExist) {
      res
        .status(401)
        .json({ message: "User already Exist", success: false, page: "" });
    } else {
      const Salt = await bcrypt.genSalt(10);
      const HashedPassword = await bcrypt.hash(req.body.password, Salt);
      const user = await Users.create({
        name,
        email,
        date: date(),
        clock: clock(),
        update: date(),
        updatedClock: clock(),
        password: HashedPassword,
        personal_todos: [
          {
            body: req.body.ptext,
            date: date(),
          },
        ],
        business_todos: [
          {
            bod: req.body.btext,
            date: date(),
          },
        ],
        lifestyle_todos: [
          {
            body: req.body.ltext,
            date: date(),
          },
        ],
      });
      let id = user._id;
      const Token = jwt.sign({ id }, "ACB123", { expiresIn: "2d" });
      res.status(200).json({
        user: `${user._id}`,
        message: "Account Registration Successful",
        name: `${user.name}`,
        token: Token,
        page: "welcome",
        success: true,
      });
    }
  })
);
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const id = userExist._id;
      const Token = jwt.sign({ id }, "ACB123", { expiresIn: "2d" });
      res.status(200).json({
        success: true,
        name: userExist.name,
        page: "/welcome",
        token: Token,
      });
    }
  })
);
router.post(
  "/verify",
  asyncHandler(async (req, res) => {
    let token,
      id,
      user,
      { password } = req.body;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      id = jwt.verify(token, secret);
      user = await Users.findById(id.id);
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: "User confirmed", success: true });
      return;
    } else {
      res.status(200).json({ message: "User confirmed", success: true });
      return;
    }
  })
);
router.put(
  "/update",
  asyncHandler(async (req, res) => {
    let token, id;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      id = jwt.verify(token, secret).id;
    } else {
      res.status(401).json({ message: "Not authorized", success: false });
      return;
    }
    const user = await Users.findById(id);
    if (!user) {
      res.status(200);
      throw new Error("User not found");
    }
    if (!req.body) {
      res.status(400).json({ message: "Data not provided", success: false });
    } else {
      let bodyKey = Object.keys(req.body);
      if (bodyKey.includes("ptext")) {
        let obj1 = {
          body: req.body.ptext,
          date,
        };
        const updateuser1 = await Users.findByIdAndUpdate(id, {
          $push: { personal_todos: obj1 },
          $set: { updatedClock: clock() },
        });
        res
          .status(200)
          .json({ sucess: true, message: "New todo added", user: updateuser1 });
      } else if (bodyKey.includes("btext")) {
        let obj2 = {
          body: req.body.btext,
          date,
        };
        const updateuser2 = await Users.findByIdAndUpdate(id, {
          $push: { business_todos: obj2 },
          $set: { updatedClock: clock() },
        });
        res
          .status(200)
          .json({ sucess: true, message: "New todo added", user: updateuser2 });
      } else if (bodyKey.includes("ltext")) {
        let obj3 = {
          body: req.body.ltext,
          date,
        };
        const updateuser3 = await Users.findByIdAndUpdate(id, {
          $push: { lifestyle_todos: obj3 },
          $set: { updatedClock: clock() },
        });
        res
          .status(200)
          .json({ sucess: true, message: "New todo added", user: updateuser3 });
      } else if (Object.keys(req.body).includes("UpdateOne")) {
        let name, email, password, id;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          id = req.headers.authorization.split(" ")[1];
          id = jwt.verify(id, secret);
          const user = await Users.findById(id.id);
          if (user) {
            if (req.body.password) {
              password = req.body.password;
            } else if (req.body.email) {
              email = req.body.email;
            } else if (req.body.name) {
              name = req.body.name;
            }
            const Salt = await bcrypt.genSalt(10);
            const HashedPassword = await bcrypt.hash(password, Salt);
            const Token = jwt.sign({ id }, "ACB123", {
              expiresIn: "30d",
            });
            delete req.body.UpdateOne;
            req.body.password = HashedPassword;
            let New = { ...req.body, update: date(), updatedClock: clock() };
            const vUser = await Users.findOneAndUpdate({ _id: id }, New, {
              new: true,
            });
            res.status(200).json({
              success: true,
              name: `${vUser.name}`,
              auth: Token,
            });
          } else {
            res.status(400).json({ message: "Not found", success: false });
            return;
          }
        } else {
          res.status(401).json({ messgae: "Not authorized", success: false });
          return;
        }
      }
    }
  })
);

router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    let token, id;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      id = jwt.verify(token, secret).id;
    } else {
      res.status(401).json({ message: "Not authorized", success: false });
      return;
    }
    const user = await Users.findById(id);
    if (!user)
      res.status(401).json({ message: "Not authorized", success: false });
    let KEYS = Object.keys(req.body);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    } else {
      if (KEYS.includes("updatep")) {
        const user = await Users.findByIdAndUpdate(id, {
          $pull: { personal_todos: { _id: req.body.title } },
        });
        res.status(200).json({ success: true, user: user._id });
      } else if (KEYS.includes("updateb")) {
        const user = await Users.findByIdAndUpdate(id, {
          $pull: { business_todos: { _id: req.body.title } },
        });
        res.status(200).json({ success: true, user: user._id });
      } else if (KEYS.includes("updatel")) {
        const user = await Users.findByIdAndUpdate(id, {
          $pull: { lifestyle_todos: { _id: req.body.title } },
        });
        res.status(200).json({ success: true, user: user._id });
      } else if (KEYS.includes("dropOne")) {
        let token = req.headers.authorization.split(" ")[1];
        let id = jwt.verify(token, secret);
        const user = await Users.findById(id.id);
        let { password } = req.body;
        let pass = user && (await bcrypt.compare(password, user.password));
        if (!user && !pass) {
          res.status(400).json({ message: "User not found" });
        } else if (user) {
          await Users.deleteOne({ password: user.password });
          res.status(200).json({ message: "Account deleted", success: true });
        }
      }
    }
  })
);
module.exports = router;
