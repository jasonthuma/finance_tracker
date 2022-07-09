import { Transaction } from "../../redux/transactions/models/Transaction";

export const getHouseExpenses = (transactions: Transaction[]) => {
  const house: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "House") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(house);
};

export const getCarExpenses = (transactions: Transaction[]) => {
  const car: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Car") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(car);
};

export const getUtilityExpenses = (transactions: Transaction[]) => {
  const utility: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Utilities") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(utility);
};

export const getMedicalExpenses = (transactions: Transaction[]) => {
  const medical: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Medical Expenses") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(medical);
};

export const getGroceryExpenses = (transactions: Transaction[]) => {
  const grocery: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Groceries") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(grocery);
};

export const getPetExpenses = (transactions: Transaction[]) => {
  const pets: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Pets") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(pets);
};

export const getDiscretionaryExpenses = (transactions: Transaction[]) => {
  const discretionary: number = transactions.reduce((total, transaction) => {
    if (transaction.category === "Discretionary") {
      return total + Number(transaction.amount);
    } else {
      return total;
    }
  }, 0);
  return Math.abs(discretionary);
};
