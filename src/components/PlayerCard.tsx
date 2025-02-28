import React from 'react';
import { Player } from '../types/Player';
import { Award, Clock, Goal, Shirt, Flag } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onEdit?: () => void;
  onDelete?: () => void;
  index?: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, onDelete, index = 0 }) => {
  const getPositionColor = (pos: string) => {
    switch (pos.toLowerCase()) {
      case 'gk': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'df': return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'mf': return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'fw': return 'bg-gradient-to-r from-red-400 to-red-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const getPositionBorderColor = (pos: string) => {
    switch (pos.toLowerCase()) {
      case 'gk': return 'border-yellow-400';
      case 'df': return 'border-blue-400';
      case 'mf': return 'border-green-400';
      case 'fw': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  const animationDelay = `${(index % 10) * 0.1}s`;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover-scale card-glow border-l-4 staggered-item"
      style={{ 
        animationDelay,
        borderLeftColor: `var(--tw-${getPositionBorderColor(player.pos).split('-')[1]}-${getPositionBorderColor(player.pos).split('-')[2]})` 
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800 gradient-border">{player.name}</h3>
            <div className="flex items-center mt-1 animate-slide-in" style={{ animationDelay: `calc(${animationDelay} + 0.2s)` }}>
              <Flag size={16} className="text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{player.nation}</span>
            </div>
          </div>
          <div className={`${getPositionColor(player.pos)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
            {player.pos}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center animate-slide-in" style={{ animationDelay: `calc(${animationDelay} + 0.3s)` }}>
            <Shirt size={16} className="text-blue-600 mr-2" />
            <span className="text-sm">{player.team}</span>
          </div>
          <div className="flex items-center animate-slide-in" style={{ animationDelay: `calc(${animationDelay} + 0.4s)` }}>
            <Clock size={16} className="text-gray-600 mr-2" />
            <span className="text-sm">{player.age} years</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded shadow-sm hover-scale">
            <div className="text-lg font-bold text-blue-700">{player.mp}</div>
            <div className="text-xs text-gray-500">Matches</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-2 rounded shadow-sm hover-scale">
            <div className="text-lg font-bold text-green-700">{player.gls}</div>
            <div className="text-xs text-gray-500">Goals</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 rounded shadow-sm hover-scale">
            <div className="text-lg font-bold text-purple-700">{player.ast}</div>
            <div className="text-xs text-gray-500">Assists</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <div className="flex items-center animate-slide-in" style={{ animationDelay: `calc(${animationDelay} + 0.5s)` }}>
            <Award size={16} className="text-yellow-500 mr-1" />
            <span>xG: {player.xg.toFixed(2)}</span>
          </div>
          <div className="flex items-center animate-slide-in" style={{ animationDelay: `calc(${animationDelay} + 0.6s)` }}>
            <Goal size={16} className="text-green-500 mr-1" />
            <span>xA: {player.xag.toFixed(2)}</span>
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="mt-4 flex justify-end space-x-2 animate-fade-in" style={{ animationDelay: `calc(${animationDelay} + 0.7s)` }}>
            {onEdit && (
              <button 
                onClick={onEdit}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button 
                onClick={onDelete}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md text-sm hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;