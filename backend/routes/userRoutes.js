const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getLoggedUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/users", registerUser);
router.post("/users/login", loginUser);
router.get("/users/current", protect, getLoggedUser);

module.exports = router;
