import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { getIncomes, createIncome, deleteIncome } from '../services/api';

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const response = await getIncomes();
      setIncomes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch income data. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const response = await createIncome(newIncome);
      setIncomes([...incomes, response.data]);
      setNewIncome({ source: '', amount: '', date: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add income. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      setIncomes(incomes.filter(income => income.id !== id));
    } catch (err) {
      setError('Failed to delete income. Please try again.');
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
      <h1>Income</h1>
      <Card>
        <Card.Header>Track Your Income</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Add New Income
          </Button>
          {incomes.length === 0 ? (
            <p>No income recorded yet.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map(income => (
                  <tr key={income.id}>
                    <td>{income.date}</td>
                    <td>{income.source}</td>
                    <td>${income.amount}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteIncome(income.id)}
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
          <Modal.Title>Add New Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddIncome}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newIncome.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                name="source"
                value={newIncome.source}
                onChange={handleInputChange}
                placeholder="Enter source"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newIncome.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                step="0.01"
                min="0"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Income
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Income;
