const knex = require("../utils/knex");
const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

exports.getTransactions = (req, res) => {
  knex
    .select()
    .from("transactions")
    .where("user_id", req.user.user_id)
    .then((transactions) => {
      res.json(transactions);
    });
};

exports.getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await knex
    .select()
    .from("transactions")
    .first()
    .where("user_id", req.user.user_id)
    .andWhere("transaction_id", req.params.id);
  if (transaction) {
    res.send(transaction);
  } else {
    res.status(400);
    throw new Error("Transaction not found");
  }
});

exports.createTransaction = (req, res) => {
  const transaction = new Transaction(req.body);
  knex("transactions")
    .insert({
      user_id: req.user.user_id,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
    })
    .then(() => {
      res.send(transaction);
    });
};

exports.updateTransaction = asyncHandler(async (req, res) => {
  let transactionToUpdate = await knex
    .select()
    .from("transactions")
    .first()
    .where("user_id", req.user.user_id)
    .andWhere("transaction_id", req.params.id);
  if (!transactionToUpdate) {
    res.status(400);
    throw new Error("Transaction not found");
  } else {
    if (req.body.category !== undefined) {
      transactionToUpdate.category = req.body.category;
    }
    if (req.body.amount !== undefined) {
      transactionToUpdate.amount = req.body.amount;
    }
    if (req.body.description !== undefined) {
      transactionToUpdate.description = req.body.description;
    }
    knex("transactions")
      .where("transaction_id", req.params.id)
      .update({
        user_id: req.user.user_id,
        transaction_id: req.params.id,
        category: transactionToUpdate.category,
        amount: transactionToUpdate.amount,
        description: transactionToUpdate.description,
      })
      .then(() => {
        res.send(transactionToUpdate);
      });
  }
});

exports.deleteTransaction = asyncHandler(async (req, res) => {
  const transactionToDelete = await knex
    .select()
    .from("transactions")
    .first()
    .where("user_id", req.user.user_id)
    .andWhere("transaction_id", req.params.id);

  if (!transactionToDelete) {
    res.status(400);
    throw new Error("Transaction not found");
  } else {
    knex("transactions")
      .where("user_id", req.user.user_id)
      .andWhere("transaction_id", req.params.id)
      .del()
      .then(() => {
        res.send(transactionToDelete);
      });
  }
});
