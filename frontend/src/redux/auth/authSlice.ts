import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { DisplayUser } from "./models/DisplayUser";
import { Jwt } from "./models/Jwt";
import { NewUser } from "./models/NewUser";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";
import { LoginUser } from "./models/LoginUser";

interface AsyncState {
  authLoading: boolean;
  authSuccess: boolean;
  authError: boolean;
  authMessage: string;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
}

const initialState: AuthState = {
  user: null,
  jwt: null,
  authLoading: false,
  authSuccess: false,
  authError: false,
  authMessage: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthResponse: (state) => {
      state.authLoading = false;
      state.authError = false;
      state.authSuccess = false;
      state.authMessage = "";
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.authLoading = false;
        state.user = null;
        state.authError = true;
        state.authMessage = String(action.payload);
      })

      //Login
      .addCase(login.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authSuccess = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          id: action.payload.id,
        };
        state.jwt = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.authLoading = false;
        state.user = null;
        state.authError = true;
        state.authMessage = String(action.payload);
      });
  },
});

export const { resetAuth, resetAuthResponse } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.authReducer;
};

export default authSlice.reducer;
