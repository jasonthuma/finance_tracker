import { Transaction } from "../redux/transactions/models/Transaction";
import { getBalance } from "../shared/utils/getBalance";

interface TransactionArrayProps {
  transactions: Transaction[];
}

export const Balance: React.FC<TransactionArrayProps> = ({ transactions }) => {
  const balance = getBalance(transactions);

  return (
    <div className="text-center dark">
      <h3>Current Balance</h3>
      <h1 className={balance >= 0 ? "black" : "minus"}>
        ${balance.toFixed(2)}
      </h1>
    </div>
  );
};
