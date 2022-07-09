import axios from "axios";
import { LoginUser } from "./models/LoginUser";
import { NewUser } from "./models/NewUser";

const API_URL = "/api/users/";

const register = async (userData: NewUser) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const login = async (userData: LoginUser) => {
  const response = await axios.post(API_URL + "login", userData);

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
