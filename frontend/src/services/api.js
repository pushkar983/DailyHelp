import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expense API calls
export const getExpenses = () => api.get('/expenses');
export const getExpenseById = (id) => api.get(`/expenses/${id}`);
export const createExpense = (expense) => api.post('/expenses', expense);
export const updateExpense = (id, expense) => api.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

// Income API calls
export const getIncomes = () => api.get('/incomes');
export const getIncomeById = (id) => api.get(`/incomes/${id}`);
export const createIncome = (income) => api.post('/incomes', income);
export const updateIncome = (id, income) => api.put(`/incomes/${id}`, income);
export const deleteIncome = (id) => api.delete(`/incomes/${id}`);

// Grocery API calls
export const getGroceries = () => api.get('/groceries');
export const getInventory = () => api.get('/groceries/inventory');
export const getShoppingList = () => api.get('/groceries/shopping-list');
export const getGroceryById = (id) => api.get(`/groceries/${id}`);
export const createGrocery = (grocery) => api.post('/groceries', grocery);
export const updateGrocery = (id, grocery) => api.put(`/groceries/${id}`, grocery);
export const deleteGrocery = (id) => api.delete(`/groceries/${id}`);

// Protein Log API calls
export const getProteinLogs = () => api.get('/protein-logs');
export const getProteinLogsByDate = (date) => api.get(`/protein-logs/date/${date}`);
export const getProteinLogById = (id) => api.get(`/protein-logs/${id}`);
export const createProteinLog = (log) => api.post('/protein-logs', log);
export const updateProteinLog = (id, log) => api.put(`/protein-logs/${id}`, log);
export const deleteProteinLog = (id) => api.delete(`/protein-logs/${id}`);

// Water Log API calls
export const getWaterLogs = () => api.get('/water-logs');
export const getWaterLogsByDate = (date) => api.get(`/water-logs/date/${date}`);
export const getWaterLogById = (id) => api.get(`/water-logs/${id}`);
export const createWaterLog = (log) => api.post('/water-logs', log);
export const updateWaterLog = (id, log) => api.put(`/water-logs/${id}`, log);
export const deleteWaterLog = (id) => api.delete(`/water-logs/${id}`);

export default api;
