import React, { useState, useEffect } from 'react';
import '../App.css';
import { getInventoryItems, getShoppingListItems, createGroceryItem, updateGroceryItem, deleteGroceryItem } from '../services/api';

function Groceries() {
  const [inventory, setInventory] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [isInventory, setIsInventory] = useState(true); // true for inventory, false for shopping list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        setLoading(true);
        const inventoryData = await getInventoryItems();
        const shoppingListData = await getShoppingListItems();
        setInventory(inventoryData);
        setShoppingList(shoppingListData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load grocery data. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchGroceries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    if (newItem.name && newItem.quantity) {
      try {
        const savedItem = await createGroceryItem({
          name: newItem.name,
          quantity: newItem.quantity,
          inInventory: isInventory,
          purchased: false
        });
        if (isInventory) {
          setInventory([...inventory, savedItem]);
        } else {
          setShoppingList([...shoppingList, savedItem]);
        }
        setNewItem({ name: '', quantity: '' });
      } catch (err) {
        setError('Failed to add item. Please try again.');
        console.error(err);
      }
    }
  };

  const handleTogglePurchased = async (id, item) => {
    if (!item.inInventory) {
      try {
        const updatedItem = await updateGroceryItem(id, { ...item, purchased: !item.purchased });
        setShoppingList(shoppingList.map(i => i.id === id ? updatedItem : i));
      } catch (err) {
        setError('Failed to update item. Please try again.');
        console.error(err);
      }
    }
  };

  const handleMoveToInventory = async (id, item) => {
    if (!item.inInventory) {
      try {
        const updatedItem = await updateGroceryItem(id, { ...item, inInventory: true });
        setShoppingList(shoppingList.filter(i => i.id !== id));
        setInventory([...inventory, updatedItem]);
      } catch (err) {
        setError('Failed to move item. Please try again.');
        console.error(err);
      }
    }
  };

  const handleDeleteItem = async (id, fromInventory) => {
    try {
      await deleteGroceryItem(id);
      if (fromInventory) {
        setInventory(inventory.filter(i => i.id !== id));
      } else {
        setShoppingList(shoppingList.filter(i => i.id !== id));
      }
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="groceries-container"><h2>Grocery Manager</h2><p>Loading groceries...</p></div>;
  }

  return (
    <div className="groceries-container">
      <h2>Grocery Manager</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="add-item">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <input
          type="text"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <select value={isInventory} onChange={(e) => setIsInventory(e.target.value === 'true')}>
          <option value="true">Inventory</option>
          <option value="false">Shopping List</option>
        </select>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div className="groceries-sections">
        <div className="inventory-section">
          <h3>Inventory</h3>
          {inventory.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteItem(item.id, true)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in inventory.</p>
          )}
        </div>
        <div className="shopping-list-section">
          <h3>Shopping List</h3>
          {shoppingList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Purchased</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.purchased}
                        onChange={() => handleTogglePurchased(item.id, item)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleMoveToInventory(item.id, item)}>Move to Inventory</button>
                      <button className="delete-btn" onClick={() => handleDeleteItem(item.id, false)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in shopping list.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groceries;
