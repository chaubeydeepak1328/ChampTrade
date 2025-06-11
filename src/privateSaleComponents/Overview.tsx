import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
  <div className="bg-[#161818] p-4 sm:p-6 rounded-xl shadow-lg border border-amber-500/50 hover:shadow-amber-700" >
    <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
    <div className="text-xs sm:text-sm text-yellow-500">{label}</div>
    <div className="text-lg sm:text-xl font-bold mt-1 text-white">{value}</div>
  </div>
);

export function Overview() {
  const [user] = useState({
    totalBoughtTokens: 25000,
    tier1Rewards: 4800,
    tier2Rewards: 1200,
    availableTCC: 31000,
    bnbBalance: 2.5
  });
  
  const [referrals] = useState([
    {
      address: "0x1234567890123456789012345678901234567890",
      dateJoined: "2024-02-15"
    },
    {
      address: "0xabcdef0123456789abcdef0123456789abcdef01",
      dateJoined: "2024-02-16"
    },
    {
      address: "0x9876543210987654321098765432109876543210",
      dateJoined: "2024-02-17"
    },
    {
      address: "0xfedcba9876543210fedcba9876543210fedcba98",
      dateJoined: "2024-02-18"
    }
  ]);

  const [purchaseHistory] = useState([
    {
      date: "2024-03-10T14:30:00",
      bnbAmount: 1.5,
      tccAmount: 5000,
      transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      status: "completed"
    },
    {
      date: "2024-03-09T10:15:00",
      bnbAmount: 2.0,
      tccAmount: 6500,
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      status: "completed"
    },
    {
      date: "2024-03-08T16:45:00",
      bnbAmount: 3.5,
      tccAmount: 11000,
      transactionHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
      status: "completed"
    }
  ]);

  const [earningsData] = useState([
    { date: '2024-03-01', earnings: 120 },
    { date: '2024-03-02', earnings: 250 },
    { date: '2024-03-03', earnings: 380 },
    { date: '2024-03-04', earnings: 420 },
    { date: '2024-03-05', earnings: 550 },
    { date: '2024-03-06', earnings: 680 },
    { date: '2024-03-07', earnings: 750 },
    { date: '2024-03-08', earnings: 890 },
    { date: '2024-03-09', earnings: 980 },
    { date: '2024-03-10', earnings: 1200 }
  ]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161818] p-3 border border-amber-500/50 rounded-lg shadow-lg">
          <p className="text-yellow-500 text-sm">{new Date(label).toLocaleDateString()}</p>
          <p className="text-white text-sm font-semibold">
            {payload[0].value.toLocaleString()} TCC
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard 
          label="TCC Purchased" 
          value={`${user.totalBoughtTokens.toLocaleString()} TCC`} 
          icon="🪙" 
        />
        <StatCard 
          label="Available TCC" 
          value={`${user.availableTCC.toLocaleString()} TCC`} 
          icon="💰" 
        />
        <StatCard 
          label="BNB Balance" 
          value={`${user.bnbBalance.toFixed(4)} BNB`} 
          icon="⚡" 
        />
        <StatCard 
          label="Tier 1 Earnings" 
          value={`${user.tier1Rewards.toLocaleString()} TCC`} 
          icon="🥇" 
        />
        <StatCard 
          label="Tier 2 Earnings" 
          value={`${user.tier2Rewards.toLocaleString()} TCC`} 
          icon="🥈" 
        />
        <StatCard 
          label="Direct Referrals" 
          value={referrals.length} 
          icon="👥" 
        />
      </div>

      <div className="bg-[#161818] rounded-xl overflow-x-auto shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-amber-500/50">
        <h2 className="text-lg font-semibold mb-4 text-yellow-500">Purchase History</h2>
        <div className="overflow-x-auto  sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Date</th>
                  <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">BNB</th>
                  <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">TCC</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Tx</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-yellow-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {purchaseHistory.map((purchase, index) => (
                  <tr key={index} >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{formatDate(purchase.date)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-right text-gray-300">{purchase.bnbAmount}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-right text-gray-300">{purchase.tccAmount.toLocaleString()}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <a
                        href={`https://bscscan.com/tx/${purchase.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-yellow-500 hover:text-yellow-400"
                      >
                        {shortenAddress(purchase.transactionHash)}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-yellow-500">
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-[#161818] rounded-xl shadow-lg p-4 sm:p-6 border border-amber-500/50">
        <h2 className="text-lg font-semibold mb-2 text-yellow-500">Earnings Over Time</h2>
        <p className="text-xs sm:text-sm text-gray-400 mb-4">Total earnings from referrals</p>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={earningsData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                stroke="#F59E0B"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis
                stroke="#F59E0B"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickFormatter={(value) => `${value} TCC`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}