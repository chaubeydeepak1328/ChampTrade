import { useState } from 'react';
import { HeroSection } from '../privateSaleComponents/HeroSection';
import { PresaleProgress } from '../privateSaleComponents/PresaleProgress';
// import { BuyTokens } from '../privateSaleComponents/BuyTokens';
import { ReferralSystem } from '../privateSaleComponents/ReferralSystem';
import { UserStats } from '../privateSaleComponents/UserStats';
import { Leaderboard } from '../privateSaleComponents/Leaderboard';
import { FAQSection } from '../privateSaleComponents/FAQSection';
import { Footer } from '../privateSaleComponents/Footer';

function PrivateLandingPage() {
  const [presaleData] = useState({
    totalSold: 2500000,
    remainingTokens: 7500000,
    currentPrice: 0.02,
    currentPhase: 0
  });

  const [referralStats] = useState({
    totalReferrals: 0,
    totalEarnings: 0,
    level1Count: 0,
    level2Count: 0
  });

  // Updated level 1 referrals with correct property names and added earnings
  const [level1Referrals] = useState([
    {
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      dateJoined: '2024-01-15',
      totalBoughtTokens: 5000,
      earnings: 250
    },
    {
      address: '0x9B8b7B6C4D3E2F1A5B0D8C7E6F4E3D2C1B0A9F8E',
      dateJoined: '2024-01-16',
      totalBoughtTokens: 3000,
      earnings: 150
    },
    {
      address: '0x5A4d3C2B1E0F9A8B7C6D5E4F3A2B1C0D9E8F7A6B',
      dateJoined: '2024-01-17',
      totalBoughtTokens: 7000,
      earnings: 350
    }
  ]);

  // Updated level 2 referrals with correct property names and added earnings
  const [level2Referrals] = useState([
    {
      address: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B',
      dateJoined: '2024-01-18',
      totalBoughtTokens: 2000,
      earnings: 50,
      parent: '0xParentAddress1' // Replace with actual parent
    },
    {
      address: '0x2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1',
      dateJoined: '2024-01-19',
      totalBoughtTokens: 4000,
      earnings: 100,
      parent: '0xParentAddress2' // Replace with actual parent
    }
  ]);


  const [userStats] = useState({
    totalBought: 0,
    tier1Rewards: 0,
    tier2Rewards: 0,
    directReferrals: 0
  });

  const [leaderboardEntries] = useState([
    { address: '0x1234...5678', referrals: 100, rewards: 12000 },
    { address: '0xabcd...efgh', referrals: 80, rewards: 10400 },
    { address: '0x9876...5432', referrals: 75, rewards: 9500 }
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PresaleProgress {...presaleData} />
          {/* <BuyTokens /> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ReferralSystem
            referralStats={referralStats}
            level1Referrals={level1Referrals}
            level2Referrals={level2Referrals}
          />
          <UserStats stats={userStats} />
        </div>

        <Leaderboard entries={leaderboardEntries} />

        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}

export default PrivateLandingPage;