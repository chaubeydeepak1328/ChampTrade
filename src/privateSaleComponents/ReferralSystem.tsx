// import { Share2, Copy } from 'lucide-react';

// interface ReferralSystemProps {
//   userAddress?: string;
//   referralStats: {
//     totalReferrals: number;
//     totalEarnings: number;
//     level1Count: number;
//     level2Count: number;
//   };
//   level1Referrals: {
//     address: string;
//     totalBoughtTokens: number;
//     dateJoined: string;
//     earnings: number;
//   }[];
//   level2Referrals: {
//     address: string;
//     totalBoughtTokens: number;
//     dateJoined: string;
//     earnings: number;
//     parent: string;
//   }[];
// }

// const shortenAddress = (address: string) => {
//   if (!address) return "";
//   return `${address.slice(0, 6)}...${address.slice(-4)}`;
// };

// export function ReferralSystem({ userAddress, referralStats, level1Referrals, level2Referrals }: ReferralSystemProps) {
//   const referralLink = userAddress 
//     ? `https://tcc20.com/?ref=${userAddress}`
//     : 'Connect wallet to get your referral link';

//   const copyToClipboard = () => {
//     if (userAddress) {
//       navigator.clipboard.writeText(referralLink);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-yellow-500/50">
//         <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-yellow-500">
//           <Share2 className="mr-2" />
//           Referral Program
//         </h2>

//         {/* Wallet Info Section */}
//         <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-black p-4 rounded-xl mb-8">
//           <h3 className="text-lg font-semibold mb-2">Your Wallet</h3>
//           <p className="text-sm opacity-80 break-all">{userAddress || 'Connect your wallet'}</p>
//           <p className="mt-4 text-sm font-semibold">Your Referral Link:</p>
//           <div className="bg-[#161818] backdrop-blur-sm text-white p-2 rounded mt-1 text-sm break-all">
//             {referralLink}
//           </div>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2 text-yellow-500">How it works</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="p-4 bg-amber-500/20 rounded-lg">
//               <p className="font-semibold text-yellow-500">Level 1: 8%</p>
//               <p className="text-sm text-gray-300">Direct referrals</p>
//             </div>
//             <div className="p-4 bg-amber-500/20 rounded-lg">
//               <p className="font-semibold text-yellow-500">Level 2: 2%</p>
//               <p className="text-sm text-gray-300">Indirect referrals</p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2 text-yellow-500">Quick Copy</h3>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="text"
//               readOnly
//               value={referralLink}
//               className="flex-1 p-3 bg-black border border-black bg-yellow-500/20 rounded-lg text-sm text-gray-300"
//             />
//             <button
//               onClick={copyToClipboard}
//               disabled={!userAddress}
//               className="w-full sm:w-auto p-3 bg-yellow-500 border-black text-black rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Copy size={20} className="sm:mr-2" />
//               <span className="hidden sm:inline">Copy Link</span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="p-4 bg-black rounded-lg border border-black bg-yellow-500/20">
//             <p className="texr-yellow-500">Total Referrals</p>
//             {/* <p className="text-xl font-semibold text-yellow-500">{referralStats.totalReferrals}</p> */}
//             <p className="text-xl font-semibold text-yellow-500">
//   {referralStats?.totalEarnings ?? 'N/A'} TCC2.0
// </p>

//           </div>
//           <div className="p-4 bg-black rounded-lg border border-black bg-yellow-500/20">
//             <p className="texr-yellow-500">Total Earnings</p>
//             <p className="text-xl font-semibold text-yellow-500">{referralStats.totalEarnings} TCC2.0</p>
//           </div>
//         </div>
//       </div>

//       {/* Level 1 Referrals Table */}
//       <div className="bg-black rounded-2xl shadow-xl p-4 sm:p-8 overflow-x-auto border  border-black bg-yellow-500/20">
//         <h2 className="text-xl font-bold mb-6 text-yellow-500">Level 1 Referrals</h2>
//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <div className="inline-block min-w-full align-middle">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">#</th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Wallet</th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Date Joined</th>
//                   <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Purchased</th>
//                   <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Your Earnings</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {level1Referrals.map((ref, idx) => (
//                   <tr key={idx} className="hover:bg-black">
//                     <td className="py-2 px-4 text-sm text-gray-300">{idx + 1}</td>
//                     <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.address)}</td>
//                     <td className="py-2 px-4 text-sm text-gray-300">{ref.dateJoined}</td>
//                     <td className="py-2 px-4 text-sm text-right text-gray-300">{ref.totalBoughtTokens.toLocaleString()} TCC</td>
//                     <td className="py-2 px-4 text-sm text-right texr-yellow-500">{ref.earnings.toLocaleString()} TCC</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Level 2 Referrals Table */}
//       <div className="bg-black rounded-2xl shadow-xl p-4 sm:p-8 overflow-x-auto  border border-black bg-yellow-500/20">
//         <h2 className="text-xl font-bold mb-6 texr-yellow-500">Level 2 Referrals</h2>
//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <div className="inline-block min-w-full align-middle">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">#</th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Wallet</th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Parent</th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Date Joined</th>
//                   <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Purchased</th>
//                   <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Your Earnings</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {level2Referrals.map((ref, idx) => (
//                   <tr key={idx} className="hover:bg-black">
//                     <td className="py-2 px-4 text-sm text-gray-300">{idx + 1}</td>
//                     <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.address)}</td>
//                     <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.parent)}</td>
//                     <td className="py-2 px-4 text-sm text-gray-300">{ref.dateJoined}</td>
//                     <td className="py-2 px-4 text-sm text-right text-gray-300">{ref.totalBoughtTokens.toLocaleString()} TCC</td>
//                     <td className="py-2 px-4 text-sm text-right texr-yellow-500">{ref.earnings.toLocaleString()} TCC</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Share2, Copy } from 'lucide-react';

interface ReferralSystemProps {
  userAddress?: string;
  referralStats?: {
    totalReferrals: number;
    totalEarnings: number;
    level1Count: number;
    level2Count: number;
  };
  level1Referrals?: {
    address: string;
    totalBoughtTokens: number;
    dateJoined: string;
    earnings: number;
  }[];
  level2Referrals?: {
    address: string;
    totalBoughtTokens: number;
    dateJoined: string;
    earnings: number;
    parent: string;
  }[];
}

const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ReferralSystem({
  userAddress,
  referralStats = {
    totalReferrals: 0,
    totalEarnings: 0,
    level1Count: 0,
    level2Count: 0,
  },
  level1Referrals = [],
  level2Referrals = [],
}: ReferralSystemProps) {
  const referralLink = userAddress
    ? `https://tcc20.com/?ref=${userAddress}`
    : 'Connect wallet to get your referral link';

  const copyToClipboard = () => {
    if (userAddress) {
      navigator.clipboard.writeText(referralLink);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-yellow-500/50">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-yellow-500">
          <Share2 className="mr-2" />
          Referral Program
        </h2>

        {/* Wallet Info Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-black p-4 rounded-xl mb-8">
          <h3 className="text-lg font-semibold mb-2">Your Wallet</h3>
          <p className="text-sm opacity-80 break-all">{userAddress || 'Connect your wallet'}</p>
          <p className="mt-4 text-sm font-semibold">Your Referral Link:</p>
          <div className="bg-[#161818] backdrop-blur-sm text-white p-2 rounded mt-1 text-sm break-all">
            {referralLink}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-yellow-500">How it works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-500/20 rounded-lg">
              <p className="font-semibold text-yellow-500">Level 1: 8%</p>
              <p className="text-sm text-gray-300">Direct referrals</p>
            </div>
            <div className="p-4 bg-amber-500/20 rounded-lg">
              <p className="font-semibold text-yellow-500">Level 2: 2%</p>
              <p className="text-sm text-gray-300">Indirect referrals</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-yellow-500">Quick Copy</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 p-3 bg-black border border-black bg-yellow-500/20 rounded-lg text-sm text-gray-300"
            />
            <button
              onClick={copyToClipboard}
              disabled={!userAddress}
              className="w-full sm:w-auto p-3 bg-yellow-500 border-black text-black rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy size={20} className="sm:mr-2" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-black rounded-lg border border-black bg-yellow-500/20">
            <p className="text-yellow-500">Total Referrals</p>
            <p className="text-xl font-semibold text-yellow-500">{referralStats.totalReferrals}</p>
          </div>
          <div className="p-4 bg-black rounded-lg border border-black bg-yellow-500/20">
            <p className="text-yellow-500">Total Earnings</p>
            <p className="text-xl font-semibold text-yellow-500">{referralStats.totalEarnings} TCC2.0</p>
          </div>
        </div>
      </div>

      {/* Level 1 Referrals Table */}
      <div className="bg-black rounded-2xl shadow-xl p-4 sm:p-8 overflow-x-auto border border-black bg-yellow-500/20">
        <h2 className="text-xl font-bold mb-6 text-yellow-500">Level 1 Referrals</h2>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">#</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Wallet</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Date Joined</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Purchased</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Your Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {level1Referrals.map((ref, idx) => (
              <tr key={idx} className="hover:bg-black">
                <td className="py-2 px-4 text-sm text-gray-300">{idx + 1}</td>
                <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.address)}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{ref.dateJoined}</td>
                <td className="py-2 px-4 text-sm text-right text-gray-300">{ref.totalBoughtTokens.toLocaleString()} TCC</td>
                <td className="py-2 px-4 text-sm text-right text-yellow-500">{ref.earnings.toLocaleString()} TCC</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Level 2 Referrals Table */}
      <div className="bg-black rounded-2xl shadow-xl p-4 sm:p-8 overflow-x-auto border border-black bg-yellow-500/20">
        <h2 className="text-xl font-bold mb-6 text-yellow-500">Level 2 Referrals</h2>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">#</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Wallet</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Parent</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-yellow-500">Date Joined</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Purchased</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-yellow-500">Your Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {level2Referrals.map((ref, idx) => (
              <tr key={idx} className="hover:bg-black">
                <td className="py-2 px-4 text-sm text-gray-300">{idx + 1}</td>
                <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.address)}</td>
                <td className="py-2 px-4 text-sm font-mono text-gray-300">{shortenAddress(ref.parent)}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{ref.dateJoined}</td>
                <td className="py-2 px-4 text-sm text-right text-gray-300">{ref.totalBoughtTokens.toLocaleString()} TCC</td>
                <td className="py-2 px-4 text-sm text-right text-yellow-500">{ref.earnings.toLocaleString()} TCC</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

