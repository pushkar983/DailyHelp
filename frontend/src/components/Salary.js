import React, { useState, useEffect } from 'react';
import '../App.css';
import { getAllIncomes, createIncome, deleteIncome } from '../services/api';

function Salary() {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', date: '' });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        setLoading(true);
        const data = await getAllIncomes();
        setIncomes(data);
        calculateTotal(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load income records. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchIncomes();
  }, []);

  const calculateTotal = (incomeList) => {
    const sum = incomeList.reduce((acc, inc) => acc + parseFloat(inc.amount || 0), 0);
    setTotal(sum.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleAddIncome = async () => {
    if (newIncome.source && newIncome.amount && newIncome.date) {
      try {
        const savedIncome = await createIncome({
          source: newIncome.source,
          amount: parseFloat(newIncome.amount),
          date: newIncome.date
        });
        setIncomes([...incomes, savedIncome]);
        setNewIncome({ source: '', amount: '', date: '' });
      } catch (err) {
        setError('Failed to add income. Please try again.');
        console.error(err);
      }
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      setIncomes(incomes.filter(inc => inc.id !== id));
    } catch (err) {
      setError('Failed to delete income. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="salary-container"><h2>Income Tracker</h2><p>Loading income records...</p></div>;
  }

  return (
    <div className="salary-container">
      <h2>Income Tracker</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-salary">
        <input
          type="text"
          name="source"
          value={newIncome.source}
          onChange={handleInputChange}
          placeholder="Source"
        />
        <input
          type="number"
          name="amount"
          value={newIncome.amount}
          onChange={handleInputChange}
          placeholder="Amount ($)"
          step="0.01"
        />
        <input
          type="date"
          name="date"
          value={newIncome.date}
          onChange={handleInputChange}
        />
        <button onClick={handleAddIncome}>Add Income</button>
      </div>
      <div className="salary-list">
        {incomes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Amount ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map(inc => (
                <tr key={inc.id}>
                  <td>{inc.date}</td>
                  <td>{inc.source}</td>
                  <td>{inc.amount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteIncome(inc.id)}>Delete</button>
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
          <p>No income recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Salary;
