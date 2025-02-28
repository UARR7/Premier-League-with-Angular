import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      <div className="flex flex-col md:flex-row gap-3">
        <div className={`relative flex-grow transition-all duration-300 ${isFocused ? 'transform scale-102' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className={`transition-colors duration-300 ${isFocused ? 'text-indigo-500' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for players..."
            className={`block w-full pl-10 pr-10 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
              isFocused 
                ? 'border-indigo-500 ring-indigo-500 shadow-md' 
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {query && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 md:w-48">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
          >
            <option value="name">Player Name</option>
            <option value="team">Team</option>
            <option value="position">Position</option>
            <option value="nation">Nation</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;