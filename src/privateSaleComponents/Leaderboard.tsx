// import { Trophy } from 'lucide-react';

// interface LeaderboardEntry {
//   address: string;
//   referrals: number;
//   rewards: number;
// }

// interface LeaderboardProps {
//   entries: LeaderboardEntry[];
// }

// export function Leaderboard({ entries }: LeaderboardProps) {
//   return (
//     <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-500/50">
//       <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-yellow-500">
//         <Trophy className="mr-2" />
//         Top Referrers
//       </h2>

//       <div className="overflow-x-auto -mx-4 sm:mx-0">
//         <div className="inline-block min-w-full align-middle">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Rank</th>
//                 <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Wallet</th>
//                 <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Referrals</th>
//                 <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Rewards</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {entries.map((entry, index) => (
//                 <tr key={entry.address} className="hover:bg-gray-800">
//                   <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">
//                     {index === 0 && '🥇'}
//                     {index === 1 && '🥈'}
//                     {index === 2 && '🥉'}
//                     {index > 2 && index + 1}
//                   </td>
//                   <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-300">
//                     {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
//                   </td>
//                   <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{entry.referrals}</td>
//                   <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{entry.rewards.toLocaleString()} TCC2.0</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  address: string;
  referrals: number;
  rewards: number;
}

interface LeaderboardProps {
  entries?: LeaderboardEntry[]; // Made optional for safety
}

export function Leaderboard({ entries = [] }: LeaderboardProps) {
  const hasData = entries.length > 0;

  return (
    <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-500/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-yellow-500">
        <Trophy className="mr-2" />
        Top Referrers
      </h2>

      {!hasData ? (
        <p className="text-gray-400">No referral data available yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="text-left">
                  <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Rank</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Wallet</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Referrals</th>
                  <th className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Rewards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {entries.map((entry, index) => (
                  <tr key={entry.address} className="hover:bg-gray-800">
                    <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && index + 1}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-mono text-gray-300">
                      {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">
                      {entry.referrals}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">
                      {entry.rewards.toLocaleString()} TCC2.0
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
