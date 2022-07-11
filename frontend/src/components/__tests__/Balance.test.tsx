import { Balance } from "../Balance";
import { render, screen } from "@testing-library/react";
import { Transaction } from "../../redux/transactions/models/Transaction";
import transactionSamplePositive from "../../shared/utils/sampleDataForTesting";

describe("Balance component should render properly", () => {
  let transactionSampleNegative: Transaction[] = [
    {
      userId: "1",
      transaction_id: 27,
      category: "House",
      amount: -128.25,
      description: "Test3",
    },
  ];
  it("should render with black text if balance is greater than 0", () => {
    render(<Balance transactions={transactionSamplePositive} />);

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveClass("black");
  });

  it("should render with red text if the balance is less than 0", () => {
    render(<Balance transactions={transactionSampleNegative} />);

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveClass("minus");
  });
});
