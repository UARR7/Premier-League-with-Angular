import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import TeamStats from '../components/TeamStats';
import { fetchAllPlayers, deletePlayer } from '../services/api';
import { Player } from '../types/Player';
import { Trophy, AlertCircle, UserPlus, Loader2  } from 'lucide-react';

const HomePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPlayers();
        setPlayers(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch players:', err);
        setError('Failed to load players. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
        <Loader2 size={40} className="text-indigo-600 animate-spin mb-4" />
        <p className="text-indigo-600 font-medium">Loading player data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-4 rounded-md shadow-md animate-fade-in">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-500 mt-2 text-sm">Please check your connection and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
        <div className="flex items-center mb-4 md:mb-0">
          <Trophy size={32} className="text-yellow-500 mr-3 animate-pulse-slow" />
          <h1 className="text-3xl font-bold gradient-text">Premier League Players</h1>
        </div>
        <button
          onClick={() => navigate('/add-player')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Add New Player
        </button>
      </div>

      {players.length > 0 ? (
        <>
          <TeamStats players={players} />
          <div className="mt-8">
            <PlayerList 
              players={players} 
              onEditPlayer={handleEditPlayer} 
              onDeletePlayer={handleDeletePlayer} 
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md animate-fade-in">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">No Players Found</h3>
          <p className="text-gray-600 mb-6">Start by adding some players to your database.</p>
          <button
            onClick={() => navigate('/add-player')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center mx-auto"
          >
            <UserPlus size={18} className="mr-2" />
            Add Your First Player
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;