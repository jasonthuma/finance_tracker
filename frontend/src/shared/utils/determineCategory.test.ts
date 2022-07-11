import { determineCategory } from "./determineCategory";

describe("Category gets determined properly", () => {
  it("Determines the provided category and returns the proper statement", () => {
    expect(determineCategory("Salary")).toBeTruthy();
    expect(determineCategory("Investments")).toBeTruthy();
    expect(determineCategory("House")).toBeFalsy();
    expect(determineCategory("Medical Expenses")).toBeFalsy();
    expect(determineCategory("Discretionary")).toBeFalsy();
  });

  it("returns false if the provided category is not among the listed categories", () => {
    expect(determineCategory("")).toBeFalsy();
    expect(determineCategory("Nonsense input")).toBeFalsy();
  });
});
