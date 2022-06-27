const knex = require("../utils/knex");
const Transaction = require("../models/transactions");

exports.getTransactions = (req, res) => {
  knex
    .select()
    .from("transactions")
    .then((transactions) => {
      res.send(transactions);
    });
};

exports.getTransactionById = (req, res) => {
  knex
    .select()
    .from("transactions")
    .where("transaction_id", req.params.id)
    .then((transaction) => {
      res.send(transaction);
    });
};

exports.createTransaction = (req, res) => {
  const transaction = new Transaction(req.body);
  console.log(req.body);
  console.log(transaction.transaction_date);
  knex("transactions")
    .insert({
      transaction_date: transaction.transaction_date,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
    })
    .then(() => {
      res.send(transaction);
    });
};

exports.updateTransaction = async (req, res) => {
  let transactionsFound = await knex
    .select()
    .from("transactions")
    .where("transaction_id", req.params.id);
  if (transactionsFound.length === 0) {
    res.send({ error: "Transaction not found" });
  } else {
    let transactionToUpdate = transactionsFound[0];
    if (req.body.transaction_date !== undefined) {
      transactionToUpdate.transaction_date = req.body.transaction_date;
    }
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
        transaction_date: transactionToUpdate.transaction_date,
        category: transactionToUpdate.category,
        amount: transactionToUpdate.amount,
        description: transactionToUpdate.description,
      })
      .then(() => {
        res.send(transactionToUpdate);
      });
  }
};

exports.deleteTransaction = async (req, res) => {
  let transactionsFound = await knex
    .select()
    .from('transactions')
    .where("transaction_id", req.params.id);

  if(transactionsFound.length === 0) {
    res.send({error: "Transaction not found"})
  } else {
    let transactionToDelete = transactionsFound[0];
    knex("transactions")
      .where("transaction_id", req.params.id)
      .del()
      .then(() => {
        res.send(transactionToDelete)
      })
  }
}