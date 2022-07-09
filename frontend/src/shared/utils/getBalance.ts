import { Transaction } from "../../redux/transactions/models/Transaction";

export const getBalance = (transactions: Transaction[]) => {
  const balance: number = transactions.reduce((total, transaction) => {
    return total + Number(transaction.amount);
  }, 0);
  return balance;
};
