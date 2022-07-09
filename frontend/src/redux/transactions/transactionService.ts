import axios from "axios";
import { Jwt } from "../auth/models/Jwt";
import { NewTransaction } from "./models/NewTransaction";
import { UpdatedTransaction } from "./models/UpdatedTransaction";

const API_URL = "/api/transactions/";

const getTransactions = async (userToken: Jwt) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createTransaction = async (
  newTransaction: NewTransaction,
  userToken: Jwt
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.post(API_URL, newTransaction, config);
  return response.data;
};

const deleteTransaction = async (transaction_id: number, userToken: Jwt) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.delete(API_URL + transaction_id, config);
  return response.data;
};

const updateTransaction = async (
  transaction_id: number,
  userToken: Jwt,
  updatedTransaction: UpdatedTransaction
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.put(
    API_URL + transaction_id,
    updatedTransaction,
    config
  );
  return response.data;
};

const transactionService = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};

export default transactionService;
