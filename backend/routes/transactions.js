const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");
const { validateTransaction } = require("../utils/validation");

router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);
router.post("/transactions", validateTransaction, createTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
