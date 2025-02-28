import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddPlayerPage from './pages/AddPlayerPage';
import EditPlayerPage from './pages/EditPlayerPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-player" element={<AddPlayerPage />} />
            <Route path="/edit-player/:playerName" element={<EditPlayerPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <footer className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold">Premier Zone - Premier League Player Statistics</p>
            <p className="text-sm text-gray-200 mt-2">© {new Date().getFullYear()} Premier Zone. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;