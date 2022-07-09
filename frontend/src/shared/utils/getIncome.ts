import { Transaction } from "../../redux/transactions/models/Transaction";

export const getIncome = (transactions: Transaction[]) => {
  const income: number = transactions.reduce((total, transaction) => {
    if (transaction.amount > 0) {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return income;
};
