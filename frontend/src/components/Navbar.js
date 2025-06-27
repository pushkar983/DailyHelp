import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">My Homemaker</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/expenses">Expenses</Nav.Link>
          <Nav.Link as={Link} to="/income">Income</Nav.Link>
          <Nav.Link as={Link} to="/groceries">Groceries</Nav.Link>
          <Nav.Link as={Link} to="/protein">Protein Tracker</Nav.Link>
          <Nav.Link as={Link} to="/water">Water Tracker</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
