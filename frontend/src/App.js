import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Groceries from './pages/Groceries';
import ProteinTracker from './pages/ProteinTracker';
import WaterTracker from './pages/WaterTracker';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col md={10} className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/groceries" element={<Groceries />} />
              <Route path="/protein" element={<ProteinTracker />} />
              <Route path="/water" element={<WaterTracker />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
