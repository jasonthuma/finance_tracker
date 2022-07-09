import { Transaction } from "../../redux/transactions/models/Transaction";

export const getExpenses = (transactions: Transaction[]) => {
  const expenses: number = transactions.reduce((total, transaction) => {
    if (transaction.amount < 0) {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return expenses;
};
