import { Transaction } from "../../redux/transactions/models/Transaction";

let sampleTransactions: Transaction[] = [
  {
    userId: "1",
    transaction_id: 24,
    category: "Salary",
    amount: 500,
    description: "Test0",
  },
  {
    userId: "1",
    transaction_id: 25,
    category: "Other Income",
    amount: 375,
    description: "Test1",
  },
  {
    userId: "1",
    transaction_id: 26,
    category: "Investments",
    amount: 125,
    description: "Test2",
  },
  {
    userId: "1",
    transaction_id: 27,
    category: "House",
    amount: -128.25,
    description: "Test3",
  },
  {
    userId: "1",
    transaction_id: 28,
    category: "Car",
    amount: -61.75,
    description: "Test4",
  },
  {
    userId: "1",
    transaction_id: 29,
    category: "Utilities",
    amount: -35.78,
    description: "Test5",
  },
  {
    userId: "1",
    transaction_id: 30,
    category: "Medical Expenses",
    amount: -24.22,
    description: "Test6",
  },
  {
    userId: "1",
    transaction_id: 29,
    category: "Groceries",
    amount: -25,
    description: "Test7",
  },
  {
    userId: "1",
    transaction_id: 31,
    category: "Pets",
    amount: -105.45,
    description: "Test8",
  },
  {
    userId: "1",
    transaction_id: 32,
    category: "Discretionary",
    amount: -44.55,
    description: "Test9",
  },
];

export default sampleTransactions;
