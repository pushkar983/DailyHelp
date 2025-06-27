import React, { useState, useEffect } from 'react';
import '../App.css';
import { getAllExpenses, createExpense, deleteExpense } from '../services/api';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', date: '' });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getAllExpenses();
        setExpenses(data);
        calculateTotal(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load expenses. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  const calculateTotal = (expList) => {
    const sum = expList.reduce((acc, exp) => acc + parseFloat(exp.amount || 0), 0);
    setTotal(sum.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      try {
        const savedExpense = await createExpense({
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          date: newExpense.date
        });
        setExpenses([...expenses, savedExpense]);
        setNewExpense({ description: '', amount: '', date: '' });
      } catch (err) {
        setError('Failed to add expense. Please try again.');
        console.error(err);
      }
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="expenses-container"><h2>Expense Tracker</h2><p>Loading expenses...</p></div>;
  }

  return (
    <div className="expenses-container">
      <h2>Expense Tracker</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-expense">
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          placeholder="Amount ($)"
          step="0.01"
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="expenses-list">
        {expenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.description}</td>
                  <td>{exp.amount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2"><strong>Total</strong></td>
                <td><strong>${total}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No expenses recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Expenses;
