import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Helper function to shorten wallet addresses
const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// StatCard component for overview section
const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-bold mt-1">{value}</div>
  </div>
);

const Dashboard = () => {
  // Fake data for testing
  const [address] = useState("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
  
  const [user] = useState({
    totalBoughtTokens: 25000,
    tier1Rewards: 4800,
    tier2Rewards: 1200
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

  const [uplines] = useState([
    "0xdef0123456789abcdef0123456789abcdef0123",
    "0x456789abcdef0123456789abcdef0123456789"
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link 
            to="/" 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-[#161818] text-white p-6 rounded-xl shadow mb-8">
          <h1 className="text-2xl font-bold">Welcome, {shortenAddress(address)}</h1>
          <p className="text-sm mt-1">Your Wallet Address</p>
          <p className="text-xs opacity-80">{address}</p>
          <p className="mt-2">Your Referral Link:</p>
          <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded mt-1 text-sm break-all">
            https://tcc20.com/?ref={address}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="TCC Purchased" 
            value={`${user.totalBoughtTokens.toLocaleString()} TCC`} 
            icon="🪙" 
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

        {/* Referral Network Visual */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Referral Network Overview</h2>
          <p className="text-sm text-gray-600 mb-3">You're at the top. Here's who you've invited:</p>
          <div className="flex flex-wrap gap-4">
            {referrals.map((ref, i) => (
              <div key={i} className="p-2 px-4 bg-indigo-100 rounded-full text-sm">
                {shortenAddress(ref.address)}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Referrals Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Direct Referrals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3">#</th>
                  <th className="py-3">Wallet</th>
                  <th className="py-3">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3">{idx + 1}</td>
                    <td className="py-3 font-mono">{shortenAddress(ref.address)}</td>
                    <td className="py-3 text-gray-500">{ref.dateJoined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upline Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Uplines</h2>
          <div className="space-y-3">
            {uplines.map((upline, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Level {i + 1}</p>
                <p className="font-mono">{upline ? shortenAddress(upline) : "None"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings History (Future Section) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Earnings Over Time</h2>
          <p className="text-sm text-gray-500">Coming Soon: Detailed earnings history and analytics</p>
          <div className="h-48 bg-gray-50 rounded-lg mt-4 flex items-center justify-center">
            <p className="text-gray-400">Chart coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;