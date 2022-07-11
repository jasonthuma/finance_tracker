import { getIncome } from "./getIncome";
import sampleTransactions from "./sampleDataForTesting";
describe("Income is properly calculated for given array of Transactions", () => {
  let transactions = sampleTransactions;
  it("calculates income", () => {
    expect(getIncome(transactions)).toBe(1000);
  });

  it("returns a number", () => {
    expect(typeof getIncome(transactions)).toBe("number");
  });
});
