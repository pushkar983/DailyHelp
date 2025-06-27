import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Nav defaultActiveKey="/" className="flex-md-column">
      <Nav.Link as={Link} to="/" eventKey="/">Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/expenses" eventKey="/expenses">Expenses</Nav.Link>
      <Nav.Link as={Link} to="/income" eventKey="/income">Income</Nav.Link>
      <Nav.Link as={Link} to="/groceries" eventKey="/groceries">Groceries</Nav.Link>
      <Nav.Link as={Link} to="/protein" eventKey="/protein">Protein Tracker</Nav.Link>
      <Nav.Link as={Link} to="/water" eventKey="/water">Water Tracker</Nav.Link>
    </Nav>
  );
}

export default Sidebar;
