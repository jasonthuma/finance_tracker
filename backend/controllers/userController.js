const knex = require("../utils/knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    //res.send({ error: "Please add all fields" });
    throw new Error("Please add all fields");
  }
  const userCheck = await knex
    .select()
    .table("users")
    .first()
    .where("email", email);
  if (userCheck) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  //insert user into db
  knex("users")
    .insert({
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      password: user.password,
    })
    .then(() => {
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const user = await knex.select().table("users").first().where("email", email);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.user_id,
      name: user.user_name,
      email: user.email,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(400);
    throw new Error("Username or password is incorrect");
  }
});

exports.getLoggedUser = asyncHandler(async (req, res) => {
  const { user_id, user_name, email } = await knex
    .select()
    .table("users")
    .first()
    .where("user_id", req.user.user_id);

  res.status(200).json({
    user_id,
    user_name,
    email,
  });
});

//Generate JWT
const generateToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
