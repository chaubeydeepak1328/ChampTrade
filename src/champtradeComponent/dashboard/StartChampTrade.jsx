import { useEffect, useState } from 'react';
import { Clock, RefreshCw, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';
import { Coins, TrendingUp } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useTransaction } from '../../config/register';
import { useStore } from '../../Store/UserStore';
import Swal from 'sweetalert2';
import { Spinner } from '../../utils/helpingAnimation'

const StartChampTrade = () => {

  const localData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = localData?.userAddress || null;

  const amount = 10000;


  const [trxData, setTrxData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const { address, isConnected } = useAppKitAccount();


  const getUserAllowance = useStore((state) => state.getUserAllowance);

  const [userData, setUserData] = useState();



  useEffect(() => {
    const fetchUserAllowance = async () => {
      const res = await getUserAllowance(userAddress)
      setUserData(res)

    }
    if (userAddress)
      fetchUserAllowance()
  }, [])


  const { handleSendTx, hash } = useTransaction()

  // =====================================================================
  // for Invest the stake
  // =====================================================================


  const stackAmount = useStore((state) => state.stackAmount);


  useEffect(() => {
    if (hash) {
      const title = currentAction === "approve" ? "Approval Successful!" : "Staking Successful!";
      Swal.fire({
        title: title,
        html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
        icon: 'success',
        confirmButtonText: 'Close'
      });

      setLoading(false)
    }
  }, [hash, currentAction]);



  // =====================================================================
  // for approve the Amount
  // =====================================================================

  const approveStakeAmount = useStore((state) => state.approveStakeAmount);

  const handleStake = async () => {
    if (address && isConnected) {
      try {
        setLoading(true);
        const response = await approveStakeAmount(address, amount);

        if (response?.status) {
          // If already approved, proceed to stake
          const stakeResponse = await stackAmount(address, amount);
          setCurrentAction("stake");
          try {
            console.log(currentAction, stakeResponse)
            await handleSendTx(stakeResponse);
          } catch (error) {
            Swal.fire("Error", "Something went wrong during transaction", "error");
          }
        } else {
          // For approval, wait for user confirmation
          setCurrentAction("approve");
          try {
            console.log(currentAction, trxData)
            await handleSendTx(response?.trxData);
          } catch (error) {
            Swal.fire("Error", "Something went wrong during transaction", "error");
          }
          // Show modal or confirmation dialog here
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong during approve", "error");
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire("Warning", "Connect your wallet first", "warning");
    }
  };

  //  

  const requiredTcc = parseFloat(userData?.requiredTcc);
  const tccPriceUsd = parseFloat(userData?.TccPriceUsd);

  const required = parseFloat(110 / tccPriceUsd).toFixed(4);



  return (
    <>
      {/* Stylish Centered Flash Message */}

      <style>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
`}</style>


      <div className="bg-[rgb(20,20,20)] rounded-xl mb-5 p-4 sm:p-6 shadow-lg border border-yellow-500/20 mx-2 sm:mx-0">
        <p className='text-yellow-500 font-2xl font-bold mb-4'>Start Quick Trade</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Price Card */}
          <div className="bg-[rgba(20,20,20,0.8)] border border-yellow-500/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Current Price (TCC)</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">${userData?.TccPriceUsd}</div>
            <div className="flex items-center gap-2 text-green-400">
              {/* <TrendingUp className="h-4 w-4" /> */}
              {/* <span>+5.2% (24h)</span> */}
            </div>
          </div>

          {/* Available TCC Card */}
          <div className="bg-[rgba(20,20,20,0.8)] border border-yellow-500/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Available TCC</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">{userData?.userBalance}</div>
            <div className="flex items-center gap-2 text-green-400">
              {/* <TrendingUp className="h-4 w-4" />
              <span>+3.8% (24h)</span> */}
            </div>
          </div>
        </div>

        <div className="bg-[rgba(20,20,20,0)] mt-5 border border-yellow-500/50 p-6 rounded-lg ">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Trade</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
                <p className="text-sm text-gray-400 mb-1">You Pay</p>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="text-lg font-bold w-20 focus:outline-none bg-transparent text-white"
                    placeholder={`$110`} disabled
                  />
                  <span className="text-gray-400">TCC</span>
                </div>
              </div>
              <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
                <p className="text-sm text-gray-400 mb-1">Required TCC</p>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="text-lg font-bold w-20 focus:outline-none bg-transparent text-white"
                    placeholder={required} disabled
                  />
                  <span className="text-gray-400">TCC</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center items-center min-h-[100px]">
                <button
                  onClick={() => handleStake()}
                  className={`font-medium p-4 hover:text-yellow-500 transition-colors   ${parseFloat(amount) <= parseFloat(userData?.approvedAmt) ? "bg-green-800" : "bg-yellow-800"} text-white rounded-lg hover:bg-yellow-700 transform hover:scale-105 transition-transform duration-200`}
                >
                  {loading ? <Spinner /> : parseFloat(amount) <= parseFloat(userData?.approvedAmt) ? "Start Champ trade" : "Approve Amount"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartChampTrade; 