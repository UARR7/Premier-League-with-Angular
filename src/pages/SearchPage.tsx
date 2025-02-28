import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PlayerList from '../components/PlayerList';
import { fetchPlayersByName, fetchPlayersByTeam, fetchPlayersByPosition, fetchPlayersByNation, deletePlayer } from '../services/api';
import { Player } from '../types/Player';
import { Search, AlertCircle, Loader2 } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = async (query: string, type: string) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setSearchType(type);
    
    try {
      let results: Player[] = [];
      
      switch (type) {
        case 'name':
          results = await fetchPlayersByName(query);
          break;
        case 'team':
          results = await fetchPlayersByTeam(query);
          break;
        case 'position':
          results = await fetchPlayersByPosition(query);
          break;
        case 'nation':
          results = await fetchPlayersByNation(query);
          break;
        default:
          results = await fetchPlayersByName(query);
      }
      
      setPlayers(results);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlayer = (player: Player) => {
    navigate(`/edit-player/${player.name}`);
  };

  const handleDeletePlayer = async (playerName: string) => {
    if (window.confirm(`Are you sure you want to delete ${playerName}?`)) {
      try {
        await deletePlayer(playerName);
        setPlayers(players.filter(p => p.name !== playerName));
      } catch (err) {
        console.error('Failed to delete player:', err);
        alert('Failed to delete player. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8 animate-fade-in">
        <Search size={28} className="text-indigo-600 mr-3 animate-pulse-slow" />
        <h1 className="text-3xl font-bold gradient-text">Search Players</h1>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-md mb-8 border border-purple-100">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
          <Loader2 size={40} className="text-indigo-600 animate-spin mb-4" />
          <p className="text-indigo-600 font-medium">Searching for players...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md shadow-md animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error}</p>
              <p className="text-red-500 mt-2 text-sm">Please try a different search term or try again later.</p>
            </div>
          </div>
        </div>
      ) : searchPerformed ? (
        players.length > 0 ? (
          <div className="animate-fade-in">
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
              <p className="text-gray-700">
                Found <span className="font-bold text-indigo-700">{players.length}</span> players 
                {searchType && searchQuery && (
                  <span> matching <span className="font-bold text-indigo-700">{searchQuery}</span> in <span className="font-bold text-indigo-700">{searchType}</span></span>
                )}
              </p>
            </div>
            <PlayerList 
              players={players} 
              onEditPlayer={handleEditPlayer} 
              onDeletePlayer={handleDeletePlayer} 
            />
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md animate-fade-in">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">No Players Found</h3>
            <p className="text-gray-600">Try a different search term or criteria.</p>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md animate-fade-in border border-purple-100">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Search for Players</h3>
          <p className="text-gray-600">Use the search bar above to find players by name, team, position, or nationality.</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => handleSearch('', 'name')}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
            >
              View All Players
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;