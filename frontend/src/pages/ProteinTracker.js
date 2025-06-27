import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { getProteinLogs, createProteinLog, deleteProteinLog } from '../services/api';

function ProteinTracker() {
  const [proteinLogs, setProteinLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProteinLog, setNewProteinLog] = useState({ amount: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProteinLogs();
  }, []);

  const fetchProteinLogs = async () => {
    try {
      setLoading(true);
      const response = await getProteinLogs();
      setProteinLogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch protein logs. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProteinLog({ ...newProteinLog, [name]: value });
  };

  const handleAddProteinLog = async (e) => {
    e.preventDefault();
    try {
      const response = await createProteinLog(newProteinLog);
      setProteinLogs([...proteinLogs, response.data]);
      setNewProteinLog({ amount: '', date: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add protein log. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteProteinLog = async (id) => {
    try {
      await deleteProteinLog(id);
      setProteinLogs(proteinLogs.filter(log => log.id !== id));
    } catch (err) {
      setError('Failed to delete protein log. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h1>Protein Tracker</h1>
      <Card>
        <Card.Header>Track Your Protein Intake</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Add Protein Intake
          </Button>
          {proteinLogs.length === 0 ? (
            <p>No protein intake recorded yet.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount (g)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {proteinLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.date}</td>
                    <td>{log.amount}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteProteinLog(log.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Protein Intake</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProteinLog}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newProteinLog.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (grams)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newProteinLog.amount}
                onChange={handleInputChange}
                placeholder="Enter amount in grams"
                min="0"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Protein Intake
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProteinTracker;
