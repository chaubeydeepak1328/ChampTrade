import React, { useState } from 'react';
import { Users, UserCheck,  Filter, ChevronDown, ChevronUp } from 'lucide-react';

const Reward: React.FC = () => {
  // Team stats by filter
  const teamStatsData = {
    'Reward 1': {
      totalMembers: 100,
      activeMembers: 85,
      inactiveMembers: 15,
    },
    'Reward 2': {
      totalMembers: 155,
      activeMembers: 142,
      inactiveMembers: 13,
    },
    'Reward 3': {
      totalMembers: 200,
      activeMembers: 180,
      inactiveMembers: 20,
    },
    'Details': { // Default selection
      totalMembers: 155,
      activeMembers: 142,
      inactiveMembers: 13,
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Details');
  const [selectedSort, setSelectedSort] = useState('Most Recent');

  const filters = ['Details', 'Reward 1', 'Reward 2', 'Reward 3'];
  const sortOptions = ['Most Recent', 'Oldest', 'By Member', 'By Type'];

  // Get current stats based on selected filter
  const currentStats = teamStatsData[selectedFilter as keyof typeof teamStatsData];

  return (
    <div className="space-y-6">
      {/* Team Statistics */}
      <div className="bg-[rgb(20,20,20)] p-4 sm:p-6 rounded-xl border-2 border-yellow-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Achievement Status
          </span>
        </h3>
        <div className="space-y-3">
          {/* Pending Activity */}
          <div className="flex items-center justify-between py-3 border-b border-yellow-500/10 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">Reward 1</p>
              </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">Pending</span>
          </div>

          {/* Ongoing Activity */}
          <div className="flex items-center justify-between py-3 border-b border-yellow-500/10 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">Reward 2</p>
              </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">Ongoing</span>
          </div>

          {/* Completed Activity */}
          <div className="flex items-center justify-between py-3 hover:bg-[rgb(30,30,30)] px-2 rounded transition-colors">
            <div>
              <p className="font-medium text-white">Reward 3</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300">Completed</span>
          </div>
        </div>
      </div>

      {/* Dropdown Options Below Activity Card */}
      <div className="space-y-4 w-full">
        {/* Full Width Dropdown Filter */}
        <div className="relative w-full">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-between w-full bg-[rgb(30,30,30)] hover:bg-[rgb(40,40,40)] px-4 py-3 rounded-lg border border-yellow-500/20 text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-500" />
              <span>{selectedFilter}</span>
            </div>
            {showDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-[rgb(30,30,30)] rounded-lg shadow-lg border border-yellow-500/20">
              <div className="py-1">
                <h4 className="px-4 py-2 text-xs font-semibold text-yellow-500 border-b border-yellow-500/10">FILTER BY</h4>
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-3 overflow-y-auto text-sm ${
                      selectedFilter === filter 
                        ? 'bg-yellow-500/10 text-yellow-500' 
                        : 'text-gray-300 hover:bg-yellow-500/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Total Members Card */}
          <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-yellow-500/20 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all h-full">
            <div className="flex items-start justify-between h-full">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-neutral-300 text-sm">Total Members</p>
                  <p className="text-2xl font-bold text-white">{currentStats.totalMembers}</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-500">Leg1:</span>
                    <span className="text-sm font-medium text-white">2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-500">Leg2:</span>
                    <span className="text-sm font-medium text-white">4</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>
          
          {/* Active Members Card */}
          <div className="bg-[rgb(20,20,20)] p-4 rounded-xl border-2 border-green-500/20 hover:shadow-[0_0_10px_rgb(74,222,128,0.1)] transition-all h-full">
            <div className="flex items-start justify-between h-full">
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <p className="text-neutral-300 text-sm">Active Members</p>
                  <p className="text-2xl font-bold text-green-500">{currentStats.activeMembers}</p>
                </div>
                
                <div className="relative">
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-2 scrollbar-transparent hover:scrollbar-thin hover:scrollbar-thumb-yellow-500/30">
                    {[
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      { name: "Leg1", value: 2 },
                      { name: "Leg2", value: 4 },
                      // ... other legs
                    ].map((leg, index) => (
                      <div key={index} className="flex-shrink-0 flex items-center gap-1">
                        <span className="text-xs text-yellow-500 whitespace-nowrap">{leg.name}:</span>
                        <span className="text-xs font-medium text-white">{leg.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[rgb(20,20,20)] to-transparent pointer-events-none"></div>
                </div>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                <UserCheck className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;