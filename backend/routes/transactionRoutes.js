const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionControllers");
const { validateTransaction } = require("../utils/validation");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/transactions")
  .get(protect, getTransactions)
  .post(protect, validateTransaction, createTransaction);
router
  .route("/transactions/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
