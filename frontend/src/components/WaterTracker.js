import React, { useState, useEffect } from 'react';
import '../App.css';
import { getAllWaterLogs, createWaterLog, deleteWaterLog } from '../services/api';

function WaterTracker() {
  const [waterLogs, setWaterLogs] = useState([]);
  const [newWaterLog, setNewWaterLog] = useState({ amount: '', date: '' });
  const [totalToday, setTotalToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaterLogs = async () => {
      try {
        setLoading(true);
        const data = await getAllWaterLogs();
        setWaterLogs(data);
        calculateTotalToday(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load water logs. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchWaterLogs();
  }, []);

  const calculateTotalToday = (logs) => {
    const today = new Date().toISOString().split('T')[0];
    const sum = logs
      .filter(log => log.date === today)
      .reduce((acc, log) => acc + parseFloat(log.amount || 0), 0);
    setTotalToday(sum.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWaterLog({ ...newWaterLog, [name]: value });
  };

  const handleAddWaterLog = async () => {
    if (newWaterLog.amount && newWaterLog.date) {
      try {
        const savedLog = await createWaterLog({
          amount: parseFloat(newWaterLog.amount),
          date: newWaterLog.date
        });
        setWaterLogs([...waterLogs, savedLog]);
        setNewWaterLog({ amount: '', date: '' });
        calculateTotalToday([...waterLogs, savedLog]);
      } catch (err) {
        setError('Failed to add water log. Please try again.');
        console.error(err);
      }
    }
  };

  const handleDeleteWaterLog = async (id) => {
    try {
      await deleteWaterLog(id);
      const updatedLogs = waterLogs.filter(log => log.id !== id);
      setWaterLogs(updatedLogs);
      calculateTotalToday(updatedLogs);
    } catch (err) {
      setError('Failed to delete water log. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="water-container"><h2>Water Tracker</h2><p>Loading water logs...</p></div>;
  }

  return (
    <div className="water-container">
      <h2>Water Tracker</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-water">
        <input
          type="number"
          name="amount"
          value={newWaterLog.amount}
          onChange={handleInputChange}
          placeholder="Amount (liters)"
          step="0.1"
        />
        <input
          type="date"
          name="date"
          value={newWaterLog.date}
          onChange={handleInputChange}
        />
        <button onClick={handleAddWaterLog}>Add Water Intake</button>
      </div>
      <div className="water-summary">
        <p>Today's Total: <strong>{totalToday}L</strong></p>
      </div>
      <div className="water-list">
        {waterLogs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount (L)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {waterLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.amount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteWaterLog(log.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No water intake recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default WaterTracker;
