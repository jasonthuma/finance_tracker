const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByAmount,
} = require("../controllers/transactionControllers");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/transactions")
  .get(protect, getTransactions)
  .post(protect, createTransaction);
router.route("/search").get(protect, getTransactionsByAmount);
router
  .route("/transactions/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
