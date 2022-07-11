import { getExpenses } from "./getExpenses";
import sampleTransactions from "./sampleDataForTesting";
describe("Expenses are properly calculated for given array of Transactions", () => {
  let transactions = sampleTransactions;
  it("calculates expenses", () => {
    expect(getExpenses(transactions)).toBe(-425);
  });

  it("returns a number", () => {
    expect(typeof getExpenses(transactions)).toBe("number");
  });
});
