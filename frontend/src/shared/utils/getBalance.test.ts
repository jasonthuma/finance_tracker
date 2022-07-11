import { getBalance } from "./getBalance";
import sampleTransactions from "./sampleDataForTesting";
describe("Balance is properly calculated for given array of Transactions", () => {
  let transactions = sampleTransactions;
  it("calculates balance", () => {
    expect(getBalance(transactions)).toBe(575);
  });

  it("returns a number", () => {
    expect(typeof getBalance(transactions)).toBe("number");
  });
});
