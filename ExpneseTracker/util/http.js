import axios from "axios";

const backEndUrl = "https://react-native-324f2-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(backEndUrl + "/expenses.json", expenseData);
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(backEndUrl + "/expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(backEndUrl + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense() {
  return axios.delete(backEndUrl + `/expenses/${id}.json`);
}
