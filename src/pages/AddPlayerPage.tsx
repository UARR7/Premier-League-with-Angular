import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';
import { addPlayer } from '../services/api';
import { Player } from '../types/Player';
import { UserPlus, ArrowLeft } from 'lucide-react';

const AddPlayerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (player: Player) => {
    try {
      await addPlayer(player);
      alert('Player added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add player. Please try again.');
    }
  };

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
        <UserPlus size={28} className="text-indigo-600 mr-3 animate-pulse-slow" />
        <h1 className="text-2xl font-bold gradient-text">Add New Player</h1>
      </div>
      
      <PlayerForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddPlayerPage;