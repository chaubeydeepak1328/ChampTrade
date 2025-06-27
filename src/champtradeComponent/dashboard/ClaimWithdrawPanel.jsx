import React, { useEffect, useState } from 'react';
import { Wallet, Clock, AlertCircle, Copy, RefreshCw } from 'lucide-react';
import { useStore } from '../../Store/UserStore';
import { useTransaction } from '../../config/register';
import Swal from 'sweetalert2';
import { useAppKitAccount } from '@reown/appkit/react';



function getMondayDate() {
  const today = new Date();
  const day = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const diff = today.getDate() - (day === 0 ? 6 : day - 1); // Move to Monday
  const monday = new Date(today.setDate(diff));

  const dd = monday.getDate().toString().padStart(2, '0');
  const mm = (monday.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const yyyy = monday.getFullYear();

  return `${dd}/${mm}/${yyyy}`; // ✅ corrected format: dd/mm/yyyy
}


const ClaimWithdrawPanel = () => {
  const [loading, setLoading] = useState(false);


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
    }
  }, [hash]);



  const isSunday = new Date().getDay() === 0;



  const widthdrawAll = async () => {
    if (address && isConnected && (address == userAddress)) {

      if (isSunday) {

        setLoading(true);
        try {
          const response = await ClaimAllReward(userAddress);

          console.log(response)
          if (response) {
            await handleSendTx(response);
            setLoading(false)


          } else {
            setLoading(false)

            Swal.fire("Warning", "No rewards to claim.", "warning");
          }
        } catch (error) {
          setLoading(false)

          console.error("Claim error:", error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      } else {
        setLoading(false)

        Swal.fire("Warning", "Claim Available only on Sunday", "warning");
      }
    } else {
      setLoading(false)

      Swal.fire("Warning", "Connect your wallet first", "warning");
    }
  };


  // ===========================================================
  // widthdraw History
  // ===========================================================

  const [claimHistory, setClaimHistory] = useState([]);

  const LevelClaiWithrawHistory = useStore((state) => state.LevelClaiWithrawHistory)

  useEffect(() => {
    const fetchClaim = async () => {
      const response = await LevelClaiWithrawHistory(userAddress)
      setClaimHistory(response)

      console.log(response)
    }


    if (userAddress) {
      fetchClaim();
    }
  }, [userAddress])



  return (
    <div className="space-y-6 bg-[rgb(20,20,20)]  rounded-xl p-6 shadow-lg border border-yellow-500/20">
      {/* Available Balance */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 text-yellow-500" />
          <h3 className="text-sm lg:text-lg font-semibold text-white">Available Balance</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">{withdrawData?.userBalance} TCC2.0</div>
        <p className="text-gray-400">≈ ${parseFloat(tccPriceUsd).toFixed(4)} USD</p>
      </div>

      {/* Claim Options */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-1">This Week’s Claim Details</h3>
        <h5 className='text-sm mb-4'>Earnings counted from: Monday {getMondayDate()}</h5>
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

      <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md text-sm font-medium shadow-sm">
        🗓️ You can claim all your previous weekly income every <span className="font-semibold">Sunday</span>.
      </div>


      {/* Action Buttons */}
      <div className="space-y-3">
        <button disabled={!isSunday || loading}
          onClick={widthdrawAll} className={`w-full ${isSunday ? "bg-yellow-600 hover:bg-yellow-500" : ""}  text-white font-bold py-3 px-6 rounded-lg  transition-colors border border-yellow-500`}>
          {loading ? "Processing..." : (!isSunday ? "🔒 Note: You can claim your weekly income only on Sunday" : "Claim All Rewards")}
        </button>
        {/* <button className="w-full bg-[rgba(20,20,20,0)] border border-yellow-500/50 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors ">
          Withdraw to Wallet
        </button> */}
      </div>

      {/* Important Notice */}
      <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          Withdrawals are allowed only on Sundays
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


      {/* ===================================================== */}
      {/* Claim History */}
      {/* ===================================================== */}

      <div className="space-y-6 mx-auto mt-4">
        <p className="text-yellow-500 font-bold text-xl">Claim History</p>

        <div className="bg-[rgb(20,20,20)] rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <RefreshCw className="w-6 h-6 text-yellow-500" />
            Claim History
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-yellow-500/20">
            <table className="min-w-[1600px] divide-y divide-yellow-500/20">
              <thead className="bg-[rgb(25,25,25)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">S. No</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Investment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed (TCC)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10 bg-[rgb(15,15,15)]">
                {claimHistory && claimHistory.length > 0 ? (
                  claimHistory.map((inv, index) => (
                    <tr key={inv.receivedID || index} className="hover:bg-yellow-500/5">
                      <td className="px-4 py-3 text-sm text-white">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-white">{inv.receivedID.toString()}</td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.amountInUSD ? `$${(Number(inv.amountInUSD) / 1e8).toFixed(4)}` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.amountInTCC ? `${((Number(inv.amountInTCC) * 4) / 1e18).toFixed(2)} TCC` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.noOfDaysReceivedFor ? `${Number(inv.noOfDaysReceivedFor).toFixed(0)} Days` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.receivedAt ? new Date(Number(inv.receivedAt) * 1000).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-4">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {claimHistory?.map((inv, index) => (
              <div key={inv.receivedID || index} className="bg-[rgb(30,30,30)] p-4 rounded-lg border border-yellow-500/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-yellow-500">Investment ID</p>
                    <p className="text-sm text-white">{inv.receivedID.toString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed (TCC)</p>
                    <p className="text-sm text-white">
                      {inv.amountInTCC ? `${((Number(inv.amountInTCC) * 4) / 1e18).toFixed(2)} TCC` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed (USD)</p>
                    <p className="text-sm text-white">
                      {inv.amountInUSD ? `$${(Number(inv.amountInUSD) / 1e8).toFixed(2)}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed</p>
                    <p className="text-sm text-white">
                      {inv.noOfDaysReceivedFor ? `${inv.noOfDaysReceivedFor.toString()} Days` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed At</p>
                    <p className="text-sm text-white">
                      {inv.receivedAt ? new Date(Number(inv.receivedAt) * 1000).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClaimWithdrawPanel;