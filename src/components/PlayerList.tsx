// import React, { useState } from 'react';
// import { Player } from '../types/Player';
// import PlayerCard from './PlayerCard';
// import { Filter, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

// interface PlayerListProps {
//   players: Player[];
//   onEditPlayer: (player: Player) => void;
//   onDeletePlayer: (playerName: string) => void;
// }

// const PlayerList: React.FC<PlayerListProps> = ({ players, onEditPlayer, onDeletePlayer }) => {
//   const [sortBy, setSortBy] = useState<keyof Player>('name');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [filterTeam, setFilterTeam] = useState<string>('');
//   const [filterPosition, setFilterPosition] = useState<string>('');
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

//   const uniqueTeams = Array.from(new Set(players.map(player => player.team))).sort();
//   const positions = ['GK', 'DF', 'MF', 'FW'];

//   const handleSort = (key: keyof Player) => {
//     if (sortBy === key) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(key);
//       setSortOrder('asc');
//     }
//   };

//   const filteredPlayers = players
//     .filter(player => !filterTeam || player.team === filterTeam)
//     .filter(player => !filterPosition || player.pos === filterPosition)
//     .sort((a, b) => {
//       const valueA = a[sortBy];
//       const valueB = b[sortBy];
      
//       if (typeof valueA === 'string' && typeof valueB === 'string') {
//         return sortOrder === 'asc' 
//           ? valueA.localeCompare(valueB) 
//           : valueB.localeCompare(valueA);
//       } else {
//         return sortOrder === 'asc' 
//           ? Number(valueA) - Number(valueB) 
//           : Number(valueB) - Number(valueA);
//       }
//     });

//   return (
//     <div className="animate-fade-in">
//       <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow-md mb-6 border border-purple-100">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <Filter size={20} className="text-indigo-600 mr-2" />
//             <h3 className="text-lg font-semibold gradient-text">Filters & Sorting</h3>
//           </div>
//           <button 
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="text-indigo-600 hover:text-indigo-800 transition-colors"
//           >
//             <SlidersHorizontal size={20} className={`transform transition-transform duration-300 ${isFilterOpen ? 'rotate-0' : 'rotate-180'}`} />
//           </button>
//         </div>
        
//         {isFilterOpen && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
//             <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
//               <select
//                 value={filterTeam}
//                 onChange={(e) => setFilterTeam(e.target.value)}
//                 className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400"
//               >
//                 <option value="">All Teams</option>
//                 {uniqueTeams.map(team => (
//                   <option key={team} value={team}>{team}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//               <select
//                 value={filterPosition}
//                 onChange={(e) => setFilterPosition(e.target.value)}
//                 className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400"
//               >
//                 <option value="">All Positions</option>
//                 {positions.map(pos => (
//                   <option key={pos} value={pos}>{pos}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
//               <div className="relative">
//                 <select
//                   value={`${sortBy}-${sortOrder}`}
//                   onChange={(e) => {
//                     const [newSortBy, newSortOrder] = e.target.value.split('-');
//                     setSortBy(newSortBy as keyof Player);
//                     setSortOrder(newSortOrder as 'asc' | 'desc');
//                   }}
//                   className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400 pr-10"
//                 >
//                   <option value="name-asc">Name (A-Z)</option>
//                   <option value="name-desc">Name (Z-A)</option>
//                   <option value="age-asc">Age (Low to High)</option>
//                   <option value="age-desc">Age (High to Low)</option>
//                   <option value="gls-desc">Goals (High to Low)</option>
//                   <option value="ast-desc">Assists (High to Low)</option>
//                   <option value="mp-desc">Matches Played (High to Low)</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                   {sortOrder === 'asc' ? (
//                     <ArrowDownAZ size={16} className="text-indigo-500" />
//                   ) : (
//                     <ArrowUpAZ size={16} className="text-indigo-500" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPlayers.length > 0 ? (
//           filteredPlayers.map((player, index) => (
//             <PlayerCard 
//               key={player.name} 
//               player={player} 
//               onEdit={() => onEditPlayer(player)}
//               onDelete={() => onDeletePlayer(player.name)}
//               index={index}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10 animate-fade-in">
//             <p className="text-gray-500 text-lg">No players found matching your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlayerList;

import React, { useState, useMemo, useCallback } from 'react';
import { Player } from '../types/Player';
import PlayerCard from './PlayerCard';
import { Filter, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (playerName: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onEditPlayer, onDeletePlayer }) => {
  const [filters, setFilters] = useState({
    sortBy: 'name' as keyof Player,
    sortOrder: 'asc' as 'asc' | 'desc',
    team: '',
    position: '',
    isFilterOpen: true,
  });

  const uniqueTeams = useMemo(() => Array.from(new Set(players.map(p => p.team))).sort(), [players]);
  const positions = ['GK', 'DF', 'MF', 'FW'];

  const handleSort = useCallback((key: keyof Player) => {
    setFilters(prev => ({
      ...prev,
      sortBy: key,
      sortOrder: prev.sortBy === key ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  }, []);

  const handleFilterChange = useCallback((field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  }, []);

  const filteredPlayers = useMemo(() => {
    return players
      .filter(p => !filters.team || p.team === filters.team)
      .filter(p => !filters.position || p.pos === filters.position)
      .sort((a, b) => {
        const valueA = a[filters.sortBy];
        const valueB = b[filters.sortBy];

        return typeof valueA === 'string' && typeof valueB === 'string'
          ? filters.sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
          : filters.sortOrder === 'asc' ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      });
  }, [players, filters]);

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow-md mb-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter size={20} className="text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold gradient-text">Filters & Sorting</h3>
          </div>
          <button 
            onClick={() => handleFilterChange('isFilterOpen', (!filters.isFilterOpen).toString())}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <SlidersHorizontal size={20} className={`transform transition-transform duration-300 ${filters.isFilterOpen ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>

        {filters.isFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {/* Team Filter */}
            <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                value={filters.team}
                onChange={(e) => handleFilterChange('team', e.target.value)}
                className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400"
              >
                <option value="">All Teams</option>
                {uniqueTeams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400"
              >
                <option value="">All Positions</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="transition-all duration-300 hover:shadow-md p-2 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="relative">
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-');
                    handleFilterChange('sortBy', newSortBy);
                    handleFilterChange('sortOrder', newSortOrder);
                  }}
                  className="w-full p-2 border border-purple-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-300 hover:border-indigo-400 pr-10"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="age-asc">Age (Low to High)</option>
                  <option value="age-desc">Age (High to Low)</option>
                  <option value="gls-desc">Goals (High to Low)</option>
                  <option value="ast-desc">Assists (High to Low)</option>
                  <option value="mp-desc">Matches Played (High to Low)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  {filters.sortOrder === 'asc' ? (
                    <ArrowDownAZ size={16} className="text-indigo-500" />
                  ) : (
                    <ArrowUpAZ size={16} className="text-indigo-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player, index) => (
            <PlayerCard 
              key={player.name} 
              player={player} 
              onEdit={() => onEditPlayer(player)}
              onDelete={() => onDeletePlayer(player.name)}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 animate-fade-in">
            <p className="text-gray-500 text-lg">No players found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
