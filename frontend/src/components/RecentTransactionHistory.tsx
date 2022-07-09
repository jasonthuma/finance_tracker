import { useAppSelector } from "../hooks/redux/hooks";
import TransactionItem from "./TransactionItem";
import { Accordion } from "react-bootstrap";

const RecentTransactionHistory: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.transactionReducer);
  const recentArray = transactions.slice(-4);

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-sm-10">
          <h3>Recent History</h3>
          <div className="text-start">
            <Accordion className="historyList ps-0">
              {recentArray.map((transaction) => (
                <TransactionItem
                  key={transaction.transaction_id}
                  transaction={transaction}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionHistory;
