import React, { useState, useEffect } from 'react';
import { Player } from '../types/Player';
import { Save, AlertCircle } from 'lucide-react';

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: (player: Player) => void;
  isEditing?: boolean;
}

const defaultPlayer: Player = {
  name: '',
  nation: '',
  pos: 'MF',
  age: 25,
  mp: 0,
  starts: 0,
  min: 0,
  gls: 0,
  ast: 0,
  pk: 0,
  crdv: 0,
  crdr: 0,
  xg: 0,
  xag: 0,
  team: '',
};

const PlayerForm: React.FC<PlayerFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const [player, setPlayer] = useState<Player>(initialData || defaultPlayer);
  const [errors, setErrors] = useState<Partial<Record<keyof Player, string>>>({});
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setPlayer(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['age', 'mp', 'starts', 'min', 'gls', 'ast', 'pk', 'crdv', 'crdr', 'xg', 'xag'].includes(name)) {
      setPlayer({
        ...player,
        [name]: name === 'age' || name === 'mp' || name === 'starts' 
          ? parseInt(value) || 0 
          : parseFloat(value) || 0
      });
    } else {
      setPlayer({ ...player, [name]: value });
    }
    
    // Clear error when field is edited
    if (errors[name as keyof Player]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Player, string>> = {};
    
    if (!player.name.trim()) newErrors.name = 'Name is required';
    if (!player.nation.trim()) newErrors.nation = 'Nation is required';
    if (!player.pos.trim()) newErrors.pos = 'Position is required';
    if (!player.team.trim()) newErrors.team = 'Team is required';
    if (player.age <= 0) newErrors.age = 'Age must be positive';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(player);
    }
  };

  const getInputClasses = (fieldName: string, hasError?: boolean) => {
    return `shadow appearance-none border rounded w-full py-2 px-3 leading-tight transition-all duration-300 ${
      hasError 
        ? 'border-red-500 bg-red-50' 
        : focused === fieldName
          ? 'border-indigo-500 ring-2 ring-indigo-200'
          : 'border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline hover:border-indigo-300'
    } ${isEditing && fieldName === 'name' ? 'bg-gray-100' : ''}`;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
        {isEditing ? 'Edit Player' : 'Add New Player'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Player Name*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={player.name}
            onChange={handleChange}
            disabled={isEditing}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('name', !!errors.name)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team">
            Team*
          </label>
          <input
            id="team"
            name="team"
            type="text"
            value={player.team}
            onChange={handleChange}
            onFocus={() => setFocused('team')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('team', !!errors.team)}
          />
          {errors.team && (
            <p className="text-red-500 text-xs italic mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              {errors.team}
            </p>
          )}
        </div>
        
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nation">
            Nation*
          </label>
          <input
            id="nation"
            name="nation"
            type="text"
            value={player.nation}
            onChange={handleChange}
            onFocus={() => setFocused('nation')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('nation', !!errors.nation)}
          />
          {errors.nation && (
            <p className="text-red-500 text-xs italic mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              {errors.nation}
            </p>
          )}
        </div>
        
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pos">
            Position*
          </label>
          <select
            id="pos"
            name="pos"
            value={player.pos}
            onChange={handleChange}
            onFocus={() => setFocused('pos')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('pos')}
          >
            <option value="GK">Goalkeeper (GK)</option>
            <option value="DF">Defender (DF)</option>
            <option value="MF">Midfielder (MF)</option>
            <option value="FW">Forward (FW)</option>
          </select>
        </div>
        
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age*
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="15"
            max="50"
            value={player.age}
            onChange={handleChange}
            onFocus={() => setFocused('age')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('age', !!errors.age)}
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic mt-1 flex items-center">
              <AlertCircle size={12} className="mr-1" />
              {errors.age}
            </p>
          )}
        </div>
        
        <div className="staggered-item">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mp">
            Matches Played
          </label>
          <input
            id="mp"
            name="mp"
            type="number"
            min="0"
            value={player.mp}
            onChange={handleChange}
            onFocus={() => setFocused('mp')}
            onBlur={() => setFocused(null)}
            className={getInputClasses('mp')}
          />
        </div>
      </div>
      
      <div className="mt-6 staggered-item">
        <h3 className="text-lg font-semibold mb-3 gradient-text">Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="starts">
              Starts
            </label>
            <input
              id="starts"
              name="starts"
              type="number"
              min="0"
              value={player.starts}
              onChange={handleChange}
              onFocus={() => setFocused('starts')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('starts')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="min">
              Minutes
            </label>
            <input
              id="min"
              name="min"
              type="number"
              min="0"
              step="1"
              value={player.min}
              onChange={handleChange}
              onFocus={() => setFocused('min')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('min')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gls">
              Goals
            </label>
            <input
              id="gls"
              name="gls"
              type="number"
              min="0"
              step="1"
              value={player.gls}
              onChange={handleChange}
              onFocus={() => setFocused('gls')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('gls')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ast">
              Assists
            </label>
            <input
              id="ast"
              name="ast"
              type="number"
              min="0"
              step="1"
              value={player.ast}
              onChange={handleChange}
              onFocus={() => setFocused('ast')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('ast')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pk">
              Penalties
            </label>
            <input
              id="pk"
              name="pk"
              type="number"
              min="0"
              step="1"
              value={player.pk}
              onChange={handleChange}
              onFocus={() => setFocused('pk')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('pk')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="crdv">
              Yellow Cards
            </label>
            <input
              id="crdv"
              name="crdv"
              type="number"
              min="0"
              step="1"
              value={player.crdv}
              onChange={handleChange}
              onFocus={() => setFocused('crdv')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('crdv')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="crdr">
              Red Cards
            </label>
            <input
              id="crdr"
              name="crdr"
              type="number"
              min="0"
              step="1"
              value={player.crdr}
              onChange={handleChange}
              onFocus={() => setFocused('crdr')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('crdr')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="xg">
              Expected Goals (xG)
            </label>
            <input
              id="xg"
              name="xg"
              type="number"
              min="0"
              step="0.01"
              value={player.xg}
              onChange={handleChange}
              onFocus={() => setFocused('xg')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('xg')}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="xag">
              Expected Assists (xA)
            </label>
            <input
              id="xag"
              name="xag"
              type="number"
              min="0"
              step="0.01"
              value={player.xag}
              onChange={handleChange}
              onFocus={() => setFocused('xag')}
              onBlur={() => setFocused(null)}
              className={getInputClasses('xag')}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end staggered-item">
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
        >
          <Save size={18} className="mr-2" />
          {isEditing ? 'Update Player' : 'Add Player'}
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;