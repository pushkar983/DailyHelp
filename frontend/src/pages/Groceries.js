import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal, Tabs, Tab } from 'react-bootstrap';
import { getInventory, getShoppingList, createGrocery, updateGrocery, deleteGrocery } from '../services/api';

function Groceries() {
  const [inventory, setInventory] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', inInventory: false });
  const [activeTab, setActiveTab] = useState('inventory');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      setLoading(true);
      const inventoryResponse = await getInventory();
      const shoppingListResponse = await getShoppingList();
      setInventory(inventoryResponse.data);
      setShoppingList(shoppingListResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch grocery data. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem({ ...newItem, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await createGrocery(newItem);
      if (newItem.inInventory) {
        setInventory([...inventory, response.data]);
      } else {
        setShoppingList([...shoppingList, response.data]);
      }
      setNewItem({ name: '', quantity: '', inInventory: false });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add item. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id, listType) => {
    try {
      await deleteGrocery(id);
      if (listType === 'inventory') {
        setInventory(inventory.filter(item => item.id !== id));
      } else {
        setShoppingList(shoppingList.filter(item => item.id !== id));
      }
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error(err);
    }
  };

  const handleMoveToInventory = async (id) => {
    try {
      const item = shoppingList.find(item => item.id === id);
      if (item) {
        const updatedItem = { ...item, inInventory: true };
        const response = await updateGrocery(id, updatedItem);
        setShoppingList(shoppingList.filter(i => i.id !== id));
        setInventory([...inventory, response.data]);
      }
    } catch (err) {
      setError('Failed to move item to inventory. Please try again.');
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
      <h1>Groceries</h1>
      <Card>
        <Card.Header>Manage Your Groceries</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Add New Item
          </Button>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="inventory" title="Inventory">
              {inventory.length === 0 ? (
                <p>No items in inventory.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDeleteItem(item.id, 'inventory')}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
            <Tab eventKey="shoppingList" title="Shopping List">
              {shoppingList.length === 0 ? (
                <p>No items in shopping list.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingList.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Button 
                            variant="success" 
                            size="sm" 
                            onClick={() => handleMoveToInventory(item.id)}
                            className="me-2"
                          >
                            Move to Inventory
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDeleteItem(item.id, 'shoppingList')}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Grocery Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddItem}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                name="inInventory"
                checked={newItem.inInventory}
                onChange={handleInputChange}
                label="In Inventory (uncheck for Shopping List)" 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Groceries;
