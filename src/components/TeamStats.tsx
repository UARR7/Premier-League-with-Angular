import React, { useMemo } from 'react';
import { Player } from '../types/Player';
import { BarChart, Trophy, Users, Goal, Medal } from 'lucide-react';

interface TeamStatsProps {
  players: Player[];
}

const TeamStats: React.FC<TeamStatsProps> = ({ players }) => {
  const stats = useMemo(() => {
    const teams = Array.from(new Set(players.map(p => p.team)));
    
    return teams.map(team => {
      const teamPlayers = players.filter(p => p.team === team);
      const totalGoals = teamPlayers.reduce((sum, p) => sum + p.gls, 0);
      const totalAssists = teamPlayers.reduce((sum, p) => sum + p.ast, 0);
      const totalYellowCards = teamPlayers.reduce((sum, p) => sum + p.crdv, 0);
      const totalRedCards = teamPlayers.reduce((sum, p) => sum + p.crdr, 0);
      
      return {
        team,
        playerCount: teamPlayers.length,
        totalGoals,
        totalAssists,
        totalYellowCards,
        totalRedCards,
        topScorer: teamPlayers.reduce((top, p) => p.gls > (top?.gls || 0) ? p : top, null as Player | null),
        topAssister: teamPlayers.reduce((top, p) => p.ast > (top?.ast || 0) ? p : top, null as Player | null),
      };
    }).sort((a, b) => b.totalGoals - a.totalGoals);
  }, [players]);

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <BarChart size={24} className="text-indigo-600 mr-2 animate-pulse-slow" />
        <h2 className="text-xl font-bold gradient-text">Team Statistics</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Team
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <Users size={14} className="mr-1 text-indigo-600" />
                  <span>Players</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <Goal size={14} className="mr-1 text-indigo-600" />
                  <span>Goals</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Assists
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <Trophy size={14} className="mr-1 text-yellow-500" />
                  <span>Top Scorer</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-100">
            {stats.map((teamStat, index) => (
              <tr key={teamStat.team} className="hover:bg-indigo-50 transition-colors duration-150 staggered-item">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 flex items-center">
                    {index < 3 && (
                      <Medal size={16} className={`mr-2 ${
                        index === 0 ? 'text-yellow-500' : 
                        index === 1 ? 'text-gray-400' : 
                        'text-amber-700'
                      }`} />
                    )}
                    {teamStat.team}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                    {teamStat.playerCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {teamStat.totalGoals}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {teamStat.totalAssists}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teamStat.topScorer ? (
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">{teamStat.topScorer.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Goal size={12} className="text-green-500 mr-1" />
                          {teamStat.topScorer.gls} goals
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStats;