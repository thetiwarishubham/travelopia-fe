import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import FlightDetails from './components/FlightDetails';
import FlightTable from './components/FlightTable';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Flight App</h1>
          <nav className="navigation">
            <ul>
              {/* <li><Link to={!(localStorage.getItem('walletId')) ? '/' : '/transact'}>Home</Link></li>
              <li><Link to="/transactions">Wallet Transactions</Link></li> */}
              <li><Link to="/">Home</Link></li> 
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
          <Route path="/" element={<FlightTable />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
          </Routes>
        </main>
      </div>
    </Router >
  );
}

export default App;
