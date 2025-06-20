import React, { useEffect, useState } from 'react';
import { Users, ChevronRight, ChevronLeft, Table, Copy } from 'lucide-react';
import { useStore } from '../../Store/UserStore';


const ReferralStats = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [viewMode, setViewMode] = useState('cards');

  const [levelUsers, setLevelUsers] = useState([])


  const [copiedMap, setCopiedMap] = useState({});


  const handleCopy = (data, key) => {
    navigator.clipboard.writeText(data);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };






  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setViewMode('table');
  };

  const handleBackClick = () => {
    setViewMode('cards');
    setSelectedLevel(null);
  };


  // ================================================================================
  // Refferal Come Here 
  // ================================================================================
  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const [RefferalDetails, setRefferalDetails] = useState();

  const myReferral = useStore((state) => state.myReferral);

  useEffect(() => {
    const fetchEarning = async () => {
      const res = await myReferral(userAddress);
      console.log(res)
      setRefferalDetails(res);
    }
    fetchEarning();
  }, [])

  const referralLevels = RefferalDetails?.map((levelData) => ({
    level: `L${levelData.level}`,
    isActive: levelData.totalReferrals !== 0,
    dailyContribution: parseFloat(levelData.dailyContribution),
    totalReferrals: levelData.totalReferrals,
    levelWiseTeam: levelData.levelWiseTeam
  })) || [];



  // ================================================================================
  // Get Users Information
  // ================================================================================

  const getUserInfo = useStore((state) => state.getUserInfo);
  const [userinfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo(levelUsers);
      console.log(response);
      setUserInfo(response)

    }
    if (levelUsers) {
      fetchUserInfo();
    }
  }, [levelUsers])




  return (
    <div className="bg-[rgb(20,20,20)] rounded-xl p-3 sm:p-6 border-2 border-yellow-500/30 hover:shadow-[0_0_20px_rgb(250,204,21,0.1)] transition-all duration-300">
      <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl border-2 border-yellow-500/20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
          <div>
            <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Active Referrals</p>
            <p className="text-lg sm:text-2xl font-bold text-yellow-500">
              {
                RefferalDetails
                  ? RefferalDetails.reduce((sum, item) => sum + item.totalReferrals, 0)
                  : 0
              }
            </p>
          </div>
          <div>
            <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Daily Earnings</p>
            <p className="text-lg sm:text-2xl font-bold text-yellow-500">
              ${
                RefferalDetails
                  ? RefferalDetails.reduce((sum, item) => sum + parseFloat(item.dailyContribution), 0).toFixed(2)
                  : "0.00"
              }
            </p>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3 mt-5 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
        </div>
        <h2 className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          Referral Stats
        </h2>
        {viewMode === 'table' && (
          <button
            onClick={handleBackClick}
            className="ml-auto flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30 transition-all text-yellow-500 text-xs sm:text-sm"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back</span>
          </button>
        )}
      </div>

      {viewMode === 'cards' ? (
        <div className="space-y-3 sm:space-y-4">
          {referralLevels.map((level) => (
            <div
              key={level.level}
              className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-yellow-500 font-bold text-sm sm:text-lg">{level.level}</span>
                <button
                  onClick={() => {
                    handleLevelClick(level);
                    setLevelUsers(level.levelWiseTeam || []);
                  }}
                  className="p-1 rounded-full hover:bg-yellow-500/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">


                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Status</p>
                  <p className={`font-medium text-xs sm:text-sm ${level.isActive ? "text-green-400" : "text-red-400"}`}>
                    {level.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Daily Contribution</p>
                  <p className="text-yellow-500 font-bold text-xs sm:text-sm">${level.dailyContribution.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Total Referrals</p>
                  <p className="text-white font-bold text-xs sm:text-sm">{level.totalReferrals}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-yellow-500/20">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Table className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <h3 className="text-sm sm:text-lg font-bold text-yellow-500">{selectedLevel?.level} Referrals</h3>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-2 -mx-1 sm:mx-0">
              <table className="w-full min-w-[200px] overflow-x-auto">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">ID</th>
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Wallet Address</th>
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Sponser Address</th>
                    <th className="text-right py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Total Investment</th>
                    <th className="text-right py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Total Tcc Invested</th>

                  </tr>
                </thead>
                <tbody>
                  {userinfo.map((CurElm, index) => (
                    <tr key={`${index} - ${CurElm.userID}`} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors">
                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">{CurElm?.userID.toString()}</td>

                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap  sm:max-w-none">

                        <span className="text-sm text-golden-white">
                          {CurElm.address.slice(2, 7)}...{CurElm.address.slice(-7)}
                        </span>
                        <button
                          onClick={() => handleCopy(CurElm.address, `wallet-${index}`)}
                          className="text-golden hover:text-white transition"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {copiedMap[`wallet-${index}`] && (
                          <span className="text-xs text-green-400">Copied!</span>
                        )}

                      </td>
                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">


                        <span className="text-sm text-golden-white">
                          {CurElm.sponsor.slice(2, 7)}...{CurElm.sponsor.slice(-7)}
                        </span>
                        <button
                          onClick={() => handleCopy(CurElm.sponsor, `sponsor-${index}`)}
                          className="text-golden hover:text-white transition"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {copiedMap[`sponsor-${index}`] && (
                          <span className="text-xs text-green-400">Copied!</span>
                        )}


                      </td>
                      <td className="py-2 px-2 text-right text-yellow-500 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">
                        {CurElm.totalInvestments.toString()}
                      </td>
                      <td className="py-2 px-2 text-right text-yellow-500 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">
                        {(Number(CurElm.totalTccInvested) / 1e18).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                  {(!selectedLevel?.totalReferrals || selectedLevel.totalReferrals === 0) && (
                    <tr>
                      <td colSpan={4} className="py-3 text-center text-neutral-400 text-xs sm:text-sm">No referrals found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="md:hidden absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[rgb(30,30,30)] to-transparent pointer-events-none"></div>
          </div>

          <p className="md:hidden text-[10px] xs:text-xs text-yellow-500/70 mt-1 text-center">
            Scroll horizontally to view all columns →
          </p>
        </div>
      )}


    </div>
  );
};

export default ReferralStats;