
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PTaxEnrollmentForm from './components/PTaxEnrollmentForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PTaxEnrollmentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
