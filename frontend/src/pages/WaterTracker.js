import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { getWaterLogs, createWaterLog, deleteWaterLog } from '../services/api';

function WaterTracker() {
  const [waterLogs, setWaterLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWaterLog, setNewWaterLog] = useState({ amount: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWaterLogs();
  }, []);

  const fetchWaterLogs = async () => {
    try {
      setLoading(true);
      const response = await getWaterLogs();
      setWaterLogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch water logs. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWaterLog({ ...newWaterLog, [name]: value });
  };

  const handleAddWaterLog = async (e) => {
    e.preventDefault();
    try {
      const response = await createWaterLog(newWaterLog);
      setWaterLogs([...waterLogs, response.data]);
      setNewWaterLog({ amount: '', date: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add water log. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteWaterLog = async (id) => {
    try {
      await deleteWaterLog(id);
      setWaterLogs(waterLogs.filter(log => log.id !== id));
    } catch (err) {
      setError('Failed to delete water log. Please try again.');
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
      <h1>Water Tracker</h1>
      <Card>
        <Card.Header>Track Your Water Intake</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Add Water Intake
          </Button>
          {waterLogs.length === 0 ? (
            <p>No water intake recorded yet.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount (L)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {waterLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.date}</td>
                    <td>{log.amount}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteWaterLog(log.id)}
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
          <Modal.Title>Add Water Intake</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddWaterLog}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newWaterLog.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (liters)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newWaterLog.amount}
                onChange={handleInputChange}
                placeholder="Enter amount in liters"
                step="0.1"
                min="0"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Water Intake
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default WaterTracker;
