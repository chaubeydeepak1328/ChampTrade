import React, { useEffect, useState } from 'react';
import { Wallet, Clock, AlertCircle, Copy } from 'lucide-react';
import { useStore } from '../../Store/UserStore';
import { useTransaction } from '../../config/register';
import Swal from 'sweetalert2';
import { useAppKitAccount } from '@reown/appkit/react';

const ClaimWithdrawPanel = () => {

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const { address, isConnected } = useAppKitAccount();

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


  const [copiedMap, setCopiedMap] = useState({});


  const handleCopy = (data, key) => {
    navigator.clipboard.writeText(data);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };




  // ===========================================================
  // widthdrawAll
  // ===========================================================
  const ClaimAllReward = useStore((state) => state.ClaimAllReward)

  const { handleSendTx, hash } = useTransaction()


  useEffect(() => {
    if (hash) {

      Swal.fire({
        title: 'Claim SuccessFull',
        html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
        icon: 'success',
        confirmButtonText: 'Close'
      });

      setLoading(false)
    }
  }, [hash]);



  const isSunday = new Date().getDay() === 0;

  console.log(isSunday)



  const widthdrawAll = async () => {
    if (address && isConnected) {
      const response = ClaimAllReward(userAddress);
      if (response) {
        await handleSendTx(response);
      }
    } else {
      Swal.fire("Warning", "Connect your wallet first", "warning");
    }

  }


  return (
    <div className="space-y-6 bg-[rgb(20,20,20)]  rounded-xl p-6 shadow-lg border border-yellow-500/20">
      {/* Available Balance */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 text-yellow-500" />
          <h3 className="text-sm lg:text-lg font-semibold text-white">Available Balance</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">{withdrawData?.userBalance} TCC2.0</div>
        <p className="text-gray-400">≈ ${tccPriceUsd} USD</p>
      </div>

      {/* Claim Options */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Claim Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4  rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 hover:border-yellow-500/50 transition-colors">

            <div>
              <p className="text-sm text-gray-400">Ready to claim</p>
              <div className="text-yellow-500 font-semibold">$ {parseFloat(withdrawData?.ReferralUsd) || 0}</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4  rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 hover:border-yellow-500/50 transition-colors">
            <div>
              <p className="font-medium text-white">Referral Rewards</p>
              <div className="text-yellow-500 font-semibold">{withdrawData?.ReferralTcc || 0} TCC</div>
            </div>

          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button disabled={!isSunday}
          onClick={() => widthdrawAll()} className={`w-full ${isSunday ? "bg-yellow-600 hover:bg-yellow-500" : ""}  text-white font-bold py-3 px-6 rounded-lg  transition-colors border border-yellow-500`}>
          {!isSunday ? "Claim on Sunday" : "Claim All Rewards"}
        </button>
        {/* <button className="w-full bg-[rgba(20,20,20,0)] border border-yellow-500/50 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors ">
          Withdraw to Wallet
        </button> */}
      </div>

      {/* Important Notice */}
      <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          Withdrawals only Available on Sunday
        </p>
      </div>


      {withdrawData?.dailyIncomes &&
        (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] table-auto">
              <thead>
                <tr className="border-b border-yellow-500/20">
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap">Level</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap min-w-[160px]">From Address</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap">Claim Status</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap">ROI TCC</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap">ROI USD</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap min-w-[140px]">Date</th>
                  <th className="text-left py-2 px-2 text-yellow-500 text-[11px] whitespace-nowrap min-w-[140px]">Day</th>
                </tr>
              </thead>
              <tbody>
                {withdrawData?.dailyIncomes.length > 0 ? withdrawData.dailyIncomes.map((CurElm, index) => (
                  <tr key={`${index}-${CurElm.date}`} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors">
                    <td className="py-2 px-2 text-white text-xs whitespace-nowrap">{CurElm?.level.toString()}</td>
                    <td className="py-2 px-2 text-white text-xs whitespace-nowrap">
                      <span className="text-sm text-golden-white">
                        {CurElm.fromUser.slice(2, 7)}...{CurElm.fromUser.slice(-7)}
                      </span>
                      <button onClick={() => handleCopy(CurElm.fromUser, `wallet-${index}`)} className="ml-1 text-golden hover:text-white transition">
                        <Copy className="h-4 w-4 inline" />
                      </button>
                      {copiedMap[`wallet-${index}`] && (
                        <span className="ml-1 text-xs text-green-400">Copied!</span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-yellow-500 text-xs whitespace-nowrap">
                      {CurElm.isClaimed ? "Claimed" : "Not Claimed"}
                    </td>
                    <td className="py-2 px-2 text-yellow-500 text-xs whitespace-nowrap">
                      {(Number(CurElm.roiTcc) / 1e28).toFixed(4)}
                    </td>
                    <td className="py-2 px-2 text-yellow-500 text-xs whitespace-nowrap">
                      {(Number(CurElm.roiUsd) / 1e18).toFixed(4)}
                    </td>
                    <td className="py-2 px-2 text-yellow-500 text-xs whitespace-nowrap">
                      {new Date(Number(CurElm.date) * 1000).toLocaleString()}
                    </td>
                    <td className="py-2 px-2 text-yellow-500 text-xs whitespace-nowrap">
                      {new Date(Number(CurElm.day) * 86400 * 1000).toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-3 text-center text-neutral-400 text-xs sm:text-sm">No referrals found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        )
      }

    </div>
  );
};

export default ClaimWithdrawPanel;