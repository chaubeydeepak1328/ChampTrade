import { User, Award } from 'lucide-react';

interface UserStatsProps {
  stats: {
    totalBought: number;
    tier1Rewards: number;
    tier2Rewards: number;
    directReferrals: number;
  };
  address?: string;
}

export function UserStats({ stats, address }: UserStatsProps) {
  if (!address) {
    return (
      <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 text-center border border-amber-500/50">
        <User className="mx-auto mb-4 text-amber-500" size={32} />
        <p className="text-gray-400">Connect your wallet to view your stats</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-500/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-yellow-500">
        <Award className="mr-2" />
        Your Stats
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black rounded-lg border border-amber-500/50">
          <p className="text-amber-500">Total Bought</p>
          <p className="text-xl font-semibold text-white">{stats.totalBought} TCC2.0</p>
        </div>
        <div className="p-4 bg-black rounded-lg border border-amber-500/50">
          <p className="text-yellow-500">Direct Referrals</p>
          <p className="text-xl font-semibold text-white">{stats.directReferrals}</p>
        </div>
        <div className="p-4 bg-black rounded-lg border border-amber-500/50">
          <p className="text-yellow-500">Tier 1 Rewards</p>
          <p className="text-xl font-semibold text-white">{stats.tier1Rewards} TCC2.0</p>
        </div>
        <div className="p-4 bg-black rounded-lg border border-amber-500/50">
          <p className="text-yellow-500">Tier 2 Rewards</p>
          <p className="text-xl font-semibold text-white">{stats.tier2Rewards} TCC2.0</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-[#161818] rounded-lg border border-amber-500/50">
        <p className="text-yellow-500">Your Address</p>
        <p className="font-mono text-sm truncate text-gray-300">{address}</p>
      </div>
    </div>
  );
}