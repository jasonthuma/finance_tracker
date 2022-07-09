const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
      enum: [
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

      required: true,
    },
  },
  { _id: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
