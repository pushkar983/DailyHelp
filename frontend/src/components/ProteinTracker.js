import React, { useState, useEffect } from 'react';
import '../App.css';
import { getAllProteinLogs, createProteinLog, deleteProteinLog } from '../services/api';

function ProteinTracker() {
  const [proteinLogs, setProteinLogs] = useState([]);
  const [newProteinLog, setNewProteinLog] = useState({ amount: '', date: '' });
  const [totalToday, setTotalToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProteinLogs = async () => {
      try {
        setLoading(true);
        const data = await getAllProteinLogs();
        setProteinLogs(data);
        calculateTotalToday(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load protein logs. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProteinLogs();
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
    setNewProteinLog({ ...newProteinLog, [name]: value });
  };

  const handleAddProteinLog = async () => {
    if (newProteinLog.amount && newProteinLog.date) {
      try {
        const savedLog = await createProteinLog({
          amount: parseFloat(newProteinLog.amount),
          date: newProteinLog.date
        });
        setProteinLogs([...proteinLogs, savedLog]);
        setNewProteinLog({ amount: '', date: '' });
        calculateTotalToday([...proteinLogs, savedLog]);
      } catch (err) {
        setError('Failed to add protein log. Please try again.');
        console.error(err);
      }
    }
  };

  const handleDeleteProteinLog = async (id) => {
    try {
      await deleteProteinLog(id);
      const updatedLogs = proteinLogs.filter(log => log.id !== id);
      setProteinLogs(updatedLogs);
      calculateTotalToday(updatedLogs);
    } catch (err) {
      setError('Failed to delete protein log. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="protein-container"><h2>Protein Tracker</h2><p>Loading protein logs...</p></div>;
  }

  return (
    <div className="protein-container">
      <h2>Protein Tracker</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-protein">
        <input
          type="number"
          name="amount"
          value={newProteinLog.amount}
          onChange={handleInputChange}
          placeholder="Amount (g)"
          step="0.1"
        />
        <input
          type="date"
          name="date"
          value={newProteinLog.date}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProteinLog}>Add Protein Intake</button>
      </div>
      <div className="protein-summary">
        <p>Today's Total: <strong>{totalToday}g</strong></p>
      </div>
      <div className="protein-list">
        {proteinLogs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount (g)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proteinLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.amount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteProteinLog(log.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No protein intake recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProteinTracker;
