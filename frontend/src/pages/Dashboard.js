import React, { useState } from 'react';
import { Card, Button, Form, ListGroup } from 'react-bootstrap';

function Dashboard() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);
      setUserMessage('');
      // Simulate bot response for now
      setTimeout(() => {
        setChatMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: 'I am processing your request. Let me get back to you.' }
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Card className="text-center">
        <Card.Header>Welcome to My Homemaker</Card.Header>
        <Card.Body>
          <Card.Title>Your Personal Assistant</Card.Title>
          <Card.Text>
            Manage your daily tasks, track expenses, groceries, income, protein, and water intake with ease.
          </Card.Text>
          <Button variant="primary" href="#/expenses">Track Expenses</Button>{' '}
          <Button variant="success" href="#/income">Track Income</Button>{' '}
          <Button variant="info" href="#/groceries">Manage Groceries</Button>{' '}
          <Button variant="warning" href="#/protein">Protein Tracker</Button>{' '}
          <Button variant="danger" href="#/water">Water Tracker</Button>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>Chat with Homemaker Assistant</Card.Header>
        <Card.Body>
          <div className="chatbot-container">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                <strong>{msg.sender === 'user' ? 'You' : 'Assistant'}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>Quick Stats</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Expenses This Month: $0.00</ListGroup.Item>
            <ListGroup.Item>Income This Month: $0.00</ListGroup.Item>
            <ListGroup.Item>Grocery Items in Inventory: 0</ListGroup.Item>
            <ListGroup.Item>Protein Intake Today: 0g</ListGroup.Item>
            <ListGroup.Item>Water Intake Today: 0L</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;
