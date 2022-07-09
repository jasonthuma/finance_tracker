import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Jwt } from "../auth/models/Jwt";
import { Transaction } from "./models/Transaction";
import transactionService from "./transactionService";
import axios, { AxiosError } from "axios";
import {
  UserDataToCreate,
  UserDataToDelete,
  UserDataToUpdate,
} from "./models/UserData";

interface AsyncState {
  transactionLoading: boolean;
  transactionError: boolean;
  transactionSuccess: boolean;
  transactionChanged: boolean;
  transactionMessage: string;
}

interface TransactionState extends AsyncState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
  transactionLoading: false,
  transactionError: false,
  transactionSuccess: false,
  transactionChanged: false,
  transactionMessage: "",
};

export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (userToken: Jwt, thunkAPI) => {
    try {
      return await transactionService.getTransactions(userToken);
    } catch (err) {
      let message: string;
      let errObj: any;
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        message = String(error.message);
      } else {
        errObj = error.response?.data;
        message = String(errObj.message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (userData: UserDataToCreate, thunkAPI) => {
    const { newTransaction, userToken } = userData;
    try {
      return await transactionService.createTransaction(
        newTransaction,
        userToken
      );
    } catch (err) {
      let message: string;
      let errObj: any;
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        message = String(error.message);
      } else {
        errObj = error.response?.data;
        message = String(errObj.message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (userData: UserDataToDelete, thunkAPI) => {
    const { transaction_id, userToken } = userData;
    try {
      return await transactionService.deleteTransaction(
        transaction_id,
        userToken
      );
    } catch (err) {
      let message: string;
      let errObj: any;
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        message = String(error.message);
      } else {
        errObj = error.response?.data;
        message = String(errObj.message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (userData: UserDataToUpdate, thunkAPI) => {
    const { transaction_id, userToken, updatedTransaction } = userData;
    try {
      return await transactionService.updateTransaction(
        transaction_id,
        userToken,
        updatedTransaction
      );
    } catch (err) {
      let message: string;
      let errObj: any;
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        message = String(error.message);
      } else {
        errObj = error.response?.data;
        message = String(errObj.message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetTransactionResponse: (state) => {
      state.transactionLoading = false;
      state.transactionError = false;
      state.transactionChanged = false;
      state.transactionSuccess = false;
      state.transactionMessage = "";
    },
    resetTransactions: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get all transactions for current user
      .addCase(getTransactions.pending, (state) => {
        state.transactionLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.transactions = action.payload;
        state.transactionChanged = false;
        state.transactionSuccess = true;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactions = [];
        state.transactionError = true;
        state.transactionMessage = String(action.payload);
      })
      //Create new transaction
      .addCase(createTransaction.pending, (state) => {
        state.transactionLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.transactions.push(action.payload);
        state.transactionChanged = true;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = true;
        state.transactionMessage = String(action.payload);
      })
      //Delete specified transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.transactionLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.transactionLoading = false;
        state.transactionChanged = true;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = true;
        state.transactionMessage = String(action.payload);
      })
      //Update specified transaction
      .addCase(updateTransaction.pending, (state) => {
        state.transactionLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.transactionLoading = false;
        state.transactionChanged = true;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = true;
        state.transactionMessage = String(action.payload);
      });
  },
});

export const { resetTransactions, resetTransactionResponse } =
  transactionSlice.actions;

export default transactionSlice.reducer;
