import { Jwt } from "../../auth/models/Jwt";
import { NewTransaction } from "./NewTransaction";
import { UpdatedTransaction } from "./UpdatedTransaction";

export interface UserDataToCreate {
  newTransaction: NewTransaction;
  userToken: Jwt;
}

export interface UserDataToDelete {
  transaction_id: number;
  userToken: Jwt;
}

export interface UserDataToUpdate {
  transaction_id: number;
  userToken: Jwt;
  updatedTransaction: UpdatedTransaction;
}
