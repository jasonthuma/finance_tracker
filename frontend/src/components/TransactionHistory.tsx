import React from "react";
import { Accordion } from "react-bootstrap";
import { useAppSelector } from "../hooks/redux/hooks";
import TransactionItem from "./TransactionItem";

const TransactionHistory: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.transactionReducer);

  return (
    <div className="container text-center mt-4">
      <div className="container text-start">
        <Accordion className="historyList ps-0">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.transaction_id}
              transaction={transaction}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default TransactionHistory;
