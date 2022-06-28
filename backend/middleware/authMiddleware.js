const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const knex = require("../utils/knex");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await knex
        .select("user_id", "user_name", "email")
        .table("users")
        .first()
        .where("user_id", decoded.user_id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
