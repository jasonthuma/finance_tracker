import { FormEvent, useEffect, useState } from "react";
import { Transaction } from "../redux/transactions/models/Transaction";
import { Accordion, Button, Alert, Modal, Form } from "react-bootstrap";
import { determineCategory } from "../shared/utils/determineCategory";
import { useAppSelector, useAppDispatch } from "../hooks/redux/hooks";
import {
  deleteTransaction,
  updateTransaction,
} from "../redux/transactions/transactionSlice";
import {
  UserDataToDelete,
  UserDataToUpdate,
} from "../redux/transactions/models/UserData";
import { UpdatedTransaction } from "../redux/transactions/models/UpdatedTransaction";

interface TransactionProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
  //Local State
  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(Math.abs(transaction.amount));
  const [category, setCategory] = useState(transaction.category);
  const [id] = useState(transaction.transaction_id);
  const [updateAlert, setUpdateAlert] = useState("");
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
  //Global State
  const { jwt } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    setAmount(Math.abs(transaction.amount));
    setCategory(transaction.category);
    setDescription(transaction.description);
  }, [transaction.amount, transaction.category, transaction.description]);

  const dispatch = useAppDispatch();

  let classname: string = "";
  let sign: string = "";
  if (determineCategory(transaction.category)) {
    classname = "plus";
    sign = "+";
  } else {
    classname = "minus";
    sign = "-";
  }
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (jwt) {
      let transaction_id = Number(e.currentTarget.id);
      const userData: UserDataToDelete = {
        transaction_id,
        userToken: jwt,
      };
      dispatch(deleteTransaction(userData));
    }
  };

  const onUpdateFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jwt) {
      let transaction_id = id;
      let convertedAmount: number = 0;
      if (description.length === 0) {
        setUpdateAlert("Description is required");
        return;
      }
      if (amount <= 0) {
        setUpdateAlert("Amount must be a number greater than 0");
        return;
      }
      if (category === "" || category === "default") {
        setUpdateAlert("Please select a category");
        return;
      }
      determineCategory(category)
        ? (convertedAmount = amount)
        : (convertedAmount = 0 - amount);
      let transactionToUpdate: UpdatedTransaction = {
        category,
        amount: convertedAmount,
        description,
      };
      const userData: UserDataToUpdate = {
        userToken: jwt,
        transaction_id,
        updatedTransaction: transactionToUpdate,
      };

      dispatch(updateTransaction(userData));
      handleUpdateClose();
    }
  };

  return (
    <>
      <Accordion.Item
        className={`${classname} border border-secondary`}
        key={transaction.transaction_id}
        eventKey={String(transaction.transaction_id)}
      >
        <Accordion.Header>
          <span>{transaction.description}</span>
          <span>
            {sign}${Math.abs(transaction.amount).toFixed(2)}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <div className="container p-0">
            <div className="row align-items-center">
              <div className="col-sm-8">
                <p>Transaction Id: {transaction.transaction_id}</p>
                <p>Description: {transaction.description}</p>
                <p>Category: {transaction.category}</p>
                <p>
                  Amount: {sign}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
              <div className="col-sm-4">
                <div className="d-grid gap-3">
                  <Button variant="warning" onClick={handleUpdateShow}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    id={String(transaction.transaction_id)}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Modal show={updateShow} onHide={handleUpdateClose}>
        <Modal.Header closeButton>Update Transaction</Modal.Header>
        <Modal.Body>
          {updateAlert && <Alert variant="danger">{updateAlert}</Alert>}
          <Form onSubmit={onUpdateFormSubmit}>
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
            <div className="text-center">
              <Button variant="secondary" type="submit" className="mt-3">
                Update Transaction
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TransactionItem;
