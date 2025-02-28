import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Search, PlusCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Trophy size={28} className="text-yellow-300 group-hover:animate-bounce-slow transition-all duration-300" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                Premier Zone
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/') 
                  ? 'text-yellow-300 scale-105' 
                  : 'text-white hover:text-yellow-300 hover:scale-105'
              }`}
            >
              <Users size={20} className={isActive('/') ? 'animate-pulse-slow' : ''} />
              <span className="gradient-border">Players</span>
            </Link>
            
            <Link 
              to="/search" 
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/search') 
                  ? 'text-yellow-300 scale-105' 
                  : 'text-white hover:text-yellow-300 hover:scale-105'
              }`}
            >
              <Search size={20} className={isActive('/search') ? 'animate-pulse-slow' : ''} />
              <span className="gradient-border">Search</span>
            </Link>
            
            <Link 
              to="/add-player" 
              className={`flex items-center space-x-1 transition-all duration-300 ${
                isActive('/add-player') 
                  ? 'text-yellow-300 scale-105' 
                  : 'text-white hover:text-yellow-300 hover:scale-105'
              }`}
            >
              <PlusCircle size={20} className={isActive('/add-player') ? 'animate-pulse-slow' : ''} />
              <span className="gradient-border">Add Player</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;