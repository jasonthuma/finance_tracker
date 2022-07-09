import React, { useState, FormEvent, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { createTransaction } from "../redux/transactions/transactionSlice";
import { NewTransaction } from "../redux/transactions/models/NewTransaction";
import { UserDataToCreate } from "../redux/transactions/models/UserData";
import { determineCategory } from "../shared/utils/determineCategory";

export const CreateTransaction: React.FC = () => {
  //Global State
  const { user, jwt } = useAppSelector((state) => state.authReducer);

  //Local State
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [alertText, setAlertText] = useState("");
  const [addBtnColor, setAddBtnColor] = useState("secondary");

  const dispatch = useAppDispatch();

  //Form Event handlers
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDescription(event.target.value);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(Number(event.target.value));
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };
  //Modify Add Transaction button color based on the category selected
  useEffect(() => {
    determineCategory(category)
      ? setAddBtnColor("success")
      : setAddBtnColor("danger");
  }, [category]);

  const onCreateFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && jwt !== undefined) {
      let convertedAmount: number;
      if (description.length === 0) {
        setAlertText("Description is required");
        return;
      }
      if (amount <= 0) {
        setAlertText("Amount must be a number greater than 0");
        return;
      }
      if (category === "" || category === "default") {
        setAlertText("Please select a category");
        return;
      }

      determineCategory(category)
        ? (convertedAmount = amount)
        : (convertedAmount = 0 - amount);

      const newTransaction: NewTransaction = {
        userId: user.id,
        description,
        amount: convertedAmount,
        category,
      };

      const userData: UserDataToCreate = {
        newTransaction,
        userToken: jwt,
      };

      dispatch(createTransaction(userData));
    }
  };
  return (
    <div className="container text-center dark">
      <h3>Add New Transaction</h3>
      <div className="row justify-content-center">
        <div className="col">
          <Form onSubmit={onCreateFormSubmit}>
            <div className="container">
              <div className="text-start">
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                    className="mb-1 border border-secondary"
                  />
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className="mb-1 border border-secondary"
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border border-secondary"
                  >
                    <option value="default">Select a category</option>
                    <option value="Salary">Salary</option>
                    <option value="Other Income">Other Income</option>
                    <option value="Investments">Investments</option>
                    <option value="House">House</option>
                    <option value="Car">Car</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Medical Expenses">Medical Expenses</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Pets">Pets</option>
                    <option value="Discretionary">Discretionary</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Button variant={addBtnColor} type="submit" className="mt-3">
              Add Transaction
            </Button>
          </Form>
          <div className="row justify-content-center my-3">
            <div className="col-sm-7">
              {alertText && <Alert variant="danger">{alertText}</Alert>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
