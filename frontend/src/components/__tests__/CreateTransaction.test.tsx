import { CreateTransaction } from "../CreateTransaction";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("Create Transaction component renders and monitors local state properly", () => {
  it("should render with initial local state", () => {
    render(
      <Provider store={store}>
        <CreateTransaction />
      </Provider>
    );
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const amountInput = screen.getByPlaceholderText("Enter amount");
    const categoryInput = screen.getByDisplayValue("Select a category");
    expect(descriptionInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
  });
  it("updates the display when a user fills in the form fields", () => {
    render(
      <Provider store={store}>
        <CreateTransaction />
      </Provider>
    );
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const amountInput = screen.getByPlaceholderText("Enter amount");

    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    });
    expect(screen.getByDisplayValue("New description")).toBeInTheDocument();

    fireEvent.change(amountInput, {
      target: { value: 25 },
    });
    expect(screen.getByDisplayValue(25)).toBeInTheDocument();
  });
});
