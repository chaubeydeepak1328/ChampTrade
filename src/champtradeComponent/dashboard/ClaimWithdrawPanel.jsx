import React, { useEffect, useState } from 'react';
import { Wallet, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../../Store/UserStore';

const ClaimWithdrawPanel = () => {

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const getWihDrawDetails = useStore((state) => state.getWihDrawDetails)
  const [withdrawData, setWithDrawData] = useState();

  useEffect(() => {

    const fetchWIthdrowinfo = async () => {
      const res = await getWihDrawDetails(userAddress);
      setWithDrawData(res)
    }

    if (userAddress) fetchWIthdrowinfo()

  }, [])


  const tccPriceUsd = parseFloat(withdrawData?.userBalance) * parseFloat(withdrawData?.TccPriceUsd)


  return (
    <div className="space-y-6 bg-[rgb(20,20,20)]  rounded-xl p-6 shadow-lg border border-yellow-500/20">
      {/* Available Balance */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Available Balance</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">{withdrawData?.userBalance} TCC</div>
        <p className="text-gray-400">≈ ${tccPriceUsd} USD</p>
      </div>

      {/* Claim Options */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Claim Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4  rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 hover:border-yellow-500/50 transition-colors">
            <div>
              <p className="font-medium text-white">Daily Rewards</p>
              <p className="text-sm text-gray-400">Available in 12 hours</p>
            </div>
            <Clock className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="flex items-center justify-between p-4  rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 hover:border-yellow-500/50 transition-colors">
            <div>
              <p className="font-medium text-white">Team Bonus</p>
              <p className="text-sm text-gray-400">Ready to claim</p>
            </div>
            <div className="text-yellow-500 font-semibold">25.5 TCC</div>
          </div>
          <div className="flex items-center justify-between p-4  rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 hover:border-yellow-500/50 transition-colors">
            <div>
              <p className="font-medium text-white">Referral Rewards</p>
              <p className="text-sm text-gray-400">Ready to claim</p>
            </div>
            <div className="text-yellow-500 font-semibold">97.95 TCC</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors border border-yellow-500">
          Claim All Rewards
        </button>
        {/* <button className="w-full bg-[rgba(20,20,20,0)] border border-yellow-500/50 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors ">
          Withdraw to Wallet
        </button> */}
      </div>

      {/* Important Notice */}
      <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          Withdrawals are processed within Same time. Minimum withdrawal amount is 1 TCC.
        </p>
      </div>
    </div>
  );
};

export default ClaimWithdrawPanel;