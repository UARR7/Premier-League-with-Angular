import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';
import { fetchPlayersByName, updatePlayer } from '../services/api';
import { Player } from '../types/Player';
import { UserCog, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

const EditPlayerPage: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlayer = async () => {
      if (!playerName) return;
      
      try {
        setLoading(true);
        const players = await fetchPlayersByName(playerName);
        
        if (players.length > 0) {
          setPlayer(players[0]);
          setError(null);
        } else {
          setError('Player not found');
        }
      } catch (err) {
        console.error('Failed to fetch player:', err);
        setError('Failed to load player data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [playerName]);

  const handleSubmit = async (updatedPlayer: Player) => {
    try {
      await updatePlayer(updatedPlayer);
      alert('Player updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating player:', error);
      alert('Failed to update player. Please try again.');
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

  if (error || !player) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 animate-slide-in">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span className="gradient-border">Back to Players</span>
          </button>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md shadow-md animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error || 'Player not found'}</p>
              <p className="text-red-500 mt-2 text-sm">Please check the player name and try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 animate-slide-in">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span className="gradient-border">Back to Players</span>
        </button>
      </div>
      
      <div className="flex items-center mb-6 animate-fade-in">
        <UserCog size={28} className="text-indigo-600 mr-3 animate-pulse-slow" />
        <h1 className="text-2xl font-bold gradient-text">Edit Player: <span className="text-indigo-700">{player.name}</span></h1>
      </div>
      
      <PlayerForm initialData={player} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
};

export default EditPlayerPage;