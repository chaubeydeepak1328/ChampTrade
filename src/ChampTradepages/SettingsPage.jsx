import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store/UserStore';
import { useAppKitAccount } from '@reown/appkit/react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const [profileData, setProfileData] = useState();
  const { address, isConnected } = useAppKitAccount();

  const referralLink = profileData?.userId
    ? `${window.location.origin}/referral?ref=TCC${profileData.userId}`
    : '';

  const handleCopyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareLink = async () => {
    if (!referralLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join ROPDY with me!',
          text: 'Check out this amazing opportunity on ROPDY.',
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this device. Please use the "Copy Link" button instead.');
    }
  };

  // ================================================
  // Profile Page 
  // ================================================

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const Profile = useStore((state) => state.Profile)



  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await Profile(userAddress)

      setProfileData(res)
    }
    fetchProfileData()
  }, [])





  return (
    <div className="bg-[#111] text-white p-6 rounded-lg max-w-4xl mx-auto border border-yellow-500 ">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Profile Section */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 border-b border-yellow-500 pb-2">Basic Profile</h2>
            <div className="space-y-3">
              <ProfileItem label="Connected Address" value={userAddress.slice(0, 6) + "...." + userAddress.slice(0, 6)} />
              <ProfileItem label="Connected Status" value={isConnected ? "Online" : "Offline"} />
              <ProfileItem label="Sponsor" value={profileData?.directSponsor.slice(0, 6) + "...." + profileData?.directSponsor.slice(0, 6)} />
              {/* <ProfileItem label="User Id" value="1" /> */}
              {/* <ProfileItem label="Sponsor Id" value="Loading..." /> */}
            </div>
          </div>

        </div>
      </div>

      <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-admin-new-green/30 mb-8">
        <h2 className="text-xl font-semibold text-admin-cyan dark:text-admin-cyan-dark mb-4">🔗 Your Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={referralLink || 'Loading...'}
            readOnly
            className="flex-1 px-4 py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-green-800 text-white rounded-lg font-semibold hover:bg-admin-new-green/80 transition-colors border border-admin-new-green/30 min-w-[100px]"
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShareLink}
              className="px-4 py-2 bg-admin-cyan dark:bg-cyan-800 text-white rounded-lg font-semibold hover:opacity-80 transition-opacity"
            >
              Share
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Reusable component for profile items
const ProfileItem = ({ label, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
};

export default ProfilePage;
