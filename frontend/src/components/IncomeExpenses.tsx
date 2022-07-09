import React from "react";
import { getIncome } from "../shared/utils/getIncome";
import { getExpenses } from "../shared/utils/getExpenses";
import { Transaction } from "../redux/transactions/models/Transaction";

interface TransactionArrayProps {
  transactions: Transaction[];
}

export const IncomeExpenses: React.FC<TransactionArrayProps> = ({
  transactions,
}) => {
  const income = getIncome(transactions);
  const expenses = getExpenses(transactions);

  return (
    <div className="container p-1 text-center">
      <div className="row align-items-center justify-content-center my-4">
        <div className="col-sm-4 py-3 inc-exp border border-secondary">
          <h4>Income</h4>
          <p className="money plus m-0">${income.toFixed(2)}</p>
        </div>
        <div className="col-sm-4 py-3 inc-exp border border-secondary">
          <h4>Expenses</h4>
          <p className="money minus m-0">${Math.abs(expenses).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
