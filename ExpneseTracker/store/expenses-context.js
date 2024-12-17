import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of sneakers",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Groceries",
    amount: 45.67,
    date: new Date("2021-11-15"),
  },
  {
    id: "e3",
    description: "Gasoline",
    amount: 70.12,
    date: new Date("2022-01-10"),
  },
  {
    id: "e4",
    description: "Dinner at a restaurant",
    amount: 29.99,
    date: new Date("2021-12-29"),
  },
  {
    id: "e5",
    description: "Electricity bill",
    amount: 90.45,
    date: new Date("2021-12-20"),
  },
  {
    id: "e6",
    description: "Coffee at Starbucks",
    amount: 4.99,
    date: new Date("2024-12-15"),
  },
  {
    id: "e7",
    description: "Grocery shopping",
    amount: 76.5,
    date: new Date("2024-12-14"),
  },
  {
    id: "e8",
    description: "Monthly subscription",
    amount: 14.99,
    date: new Date("2024-12-13"),
  },
  {
    id: "e9",
    description: "Bus ticket",
    amount: 2.5,
    date: new Date("2024-12-11"),
  },
  {
    id: "e10",
    description: "Dinner with family",
    amount: 89.99,
    date: new Date("2024-12-10"),
  },
];
