export const determineCategory = (category: string) => {
  switch (category) {
    case "Salary":
    case "Other Income":
    case "Investments":
      return true;
    case "House":
    case "Car":
    case "Utilities":
    case "Medical Expenses":
    case "Groceries":
    case "Pets":
    case "Discretionary":
      return false;
    default:
      return false;
  }
};
