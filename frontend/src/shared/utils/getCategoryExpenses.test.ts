import {
  getCarExpenses,
  getDiscretionaryExpenses,
  getGroceryExpenses,
  getHouseExpenses,
  getMedicalExpenses,
  getPetExpenses,
  getUtilityExpenses,
} from "./getCategoryExpenses";
import sampleTransactions from "./sampleDataForTesting";
describe("Expenses are properly calculated for given array of Transactions", () => {
  let transactions = sampleTransactions;
  //House
  it("calculates only the house expenses from given array", () => {
    expect(getHouseExpenses(transactions)).toBe(
      Math.abs(transactions[3].amount)
    );
  });

  it("house expenses returns a number", () => {
    expect(typeof getHouseExpenses(transactions)).toBe("number");
  });

  //Car
  it("calculates only the car expenses from given array", () => {
    expect(getCarExpenses(transactions)).toBe(Math.abs(transactions[4].amount));
  });

  it("car expenses returns a number", () => {
    expect(typeof getCarExpenses(transactions)).toBe("number");
  });

  //Utilities
  it("calculates only the utility expenses from given array", () => {
    expect(getUtilityExpenses(transactions)).toBe(
      Math.abs(transactions[5].amount)
    );
  });

  it("utility expenses returns a number", () => {
    expect(typeof getUtilityExpenses(transactions)).toBe("number");
  });

  //Medical Expenses
  it("calculates only the medical expenses from given array", () => {
    expect(getMedicalExpenses(transactions)).toBe(
      Math.abs(transactions[6].amount)
    );
  });

  it("medical expenses returns a number", () => {
    expect(typeof getMedicalExpenses(transactions)).toBe("number");
  });

  //Groceries
  it("calculates only the grocery expenses from given array", () => {
    expect(getGroceryExpenses(transactions)).toBe(
      Math.abs(transactions[7].amount)
    );
  });

  it("grocery expenses returns a number", () => {
    expect(typeof getGroceryExpenses(transactions)).toBe("number");
  });

  //Pets
  it("calculates only the pet expenses from given array", () => {
    expect(getPetExpenses(transactions)).toBe(Math.abs(transactions[8].amount));
  });

  it("pet expenses returns a number", () => {
    expect(typeof getPetExpenses(transactions)).toBe("number");
  });

  //Discretionary
  it("calculates only the discretionary expenses from given array", () => {
    expect(getDiscretionaryExpenses(transactions)).toBe(
      Math.abs(transactions[9].amount)
    );
  });

  it("discretionary expenses returns a number", () => {
    expect(typeof getDiscretionaryExpenses(transactions)).toBe("number");
  });
});
