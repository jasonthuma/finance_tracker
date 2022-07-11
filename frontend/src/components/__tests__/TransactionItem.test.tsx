import TransactionItem from "../TransactionItem";
import {
  fireEvent,
  getByDisplayValue,
  render,
  screen,
} from "@testing-library/react";
import transactionHistorySample from "../../shared/utils/sampleDataForTesting";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("Transaction Items should render properly", () => {
  it("should render with the correct information passed through props", () => {
    render(
      <Provider store={store}>
        <TransactionItem transaction={transactionHistorySample[0]} />
      </Provider>
    );
    expect(screen.getByText("Category: Salary")).toBeInTheDocument();
    expect(screen.getByText("Amount: +$500.00")).toBeInTheDocument();
    expect(screen.getByText("Transaction Id: 24")).toBeInTheDocument();
    expect(screen.getByText("Description: Test0")).toBeInTheDocument();
  });

  it("should open the update transaction modal when the update button is clicked", () => {
    render(
      <Provider store={store}>
        <TransactionItem transaction={transactionHistorySample[0]} />
      </Provider>
    );
    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    expect(screen.getByText("Update Transaction")).toBeInTheDocument();
  });
});
