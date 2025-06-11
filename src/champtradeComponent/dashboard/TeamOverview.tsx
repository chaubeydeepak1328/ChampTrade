import React from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const TeamOverview: React.FC = () => {
  const teamStats = {
    totalMembers: 155,
    activeMembers: 142,
    inactiveMembers: 13,
    dailyEarnings: 6.20,
    weeklyGrowth: '+12%',
    monthlyGrowth: '+45%'
  };

  return (
    <div className="space-y-6">
      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-yellow-500/20 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-300 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">{teamStats.totalMembers}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-green-500/20 hover:shadow-[0_0_10px_rgb(74,222,128,0.1)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-300 text-sm">Active Members</p>
              <p className="text-2xl font-bold text-green-400">{teamStats.activeMembers}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-red-500/20 hover:shadow-[0_0_10px_rgb(248,113,113,0.1)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-300 text-sm">Inactive Members</p>
              <p className="text-2xl font-bold text-red-400">{teamStats.inactiveMembers}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-rose-400/20 rounded-full flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-yellow-500/20 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-300 text-sm">Daily Team Earnings</p>
              <p className="text-2xl font-bold text-yellow-500">${teamStats.dailyEarnings}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="bg-[rgb(20,20,20)] p-6 rounded-xl border-2 border-yellow-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Team Growth
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-4 rounded-lg border border-yellow-500/10">
            <p className="text-neutral-300">Weekly Growth</p>
            <p className="text-xl font-bold text-green-400">{teamStats.weeklyGrowth}</p>
          </div>
          <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-4 rounded-lg border border-yellow-500/10">
            <p className="text-neutral-300">Monthly Growth</p>
            <p className="text-xl font-bold text-green-400">{teamStats.monthlyGrowth}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[rgb(20,20,20)] p-6 rounded-xl border-2 border-yellow-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Recent Team Activity
          </span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-yellow-500/10 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <p className="font-medium text-white">New Member Joined</p>
              <p className="text-sm text-neutral-400">0x8765...4321</p>
            </div>
            <span className="text-sm text-yellow-500/80">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-yellow-500/10 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <p className="font-medium text-white">Level Up - L2 to L3</p>
              <p className="text-sm text-neutral-400">0x1234...5678</p>
            </div>
            <span className="text-sm text-yellow-500/80">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <p className="font-medium text-white">Milestone Achieved</p>
              <p className="text-sm text-neutral-400">100 Active Members</p>
            </div>
            <span className="text-sm text-yellow-500/80">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;