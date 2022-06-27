const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: {
      values: [
        "Salary",
        "Other Income",
        "Investments",
        "House",
        "Car",
        "Utilities",
        "Medical Expenses",
        "Groceries",
        "Pets",
        "Discretionary",
      ],
    },
    required: true,
  },
  // month: {
  //   type: Number,
  //   required: true,
  // },
  // day: {
  //   type: Number,
  //   required: true,
  // },
  // year: {
  //   type: Number,
  //   required: true,
  // },
});

module.exports = mongoose.model("Transaction", transactionSchema);
