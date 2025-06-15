



import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import trade from '../images/trade.png'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { RxDashboard } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { useStore } from "../Store/UserStore";

function LandingPage() {


  const [authLoading, setAuthLoading] = useState(false);

  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const [walletPrompted, setWalletPrompted] = useState(false);


  const handleClick = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const userData = JSON.parse(localStorage.getItem("userData") || "null");
    const userAddress = userData?.userAddress || null;

    // console.log("step1 ==========", userAddress);

    if (address && isConnected && userAddress) {

      setAuthLoading(false);
      navigate("/champ-trade-dashboard");

    } else if (address && isConnected && !userAddress) {
      if (isConnected && address) {
        try {
          const user = await IsUserExist(address);
          // console.log("this is User=========>", user?.userId?.toString(), user);


          if (user) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                userAddress: address,
                data: {},
              })
            );

            setAuthLoading(false);
            navigate("/champ-trade-dashboard");
          }
          else {
            navigate("/RegisterNewUser");
          }
          // Storing to the local storage end

        } catch (err) {
          setAuthLoading(false);
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        } finally {
          setAuthLoading(false);
          setWalletPrompted(false); // Reset to prevent re-trigger
        }
      }
    } else {
      try {
        await open(); // Trigger wallet connection
        setWalletPrompted(true);
      } catch (err) {
        console.error("Wallet connect error:", err);
        setAuthLoading(false);
        return;
      }
    }
  };

  const IsUserExist = useStore((state) => state.IsUserExist);

  useEffect(() => {
    const checkUserAfterConnect = async () => {
      if (walletPrompted && isConnected && address) {
        try {
          const user = await IsUserExist(address);
          console.log("this is User=========>", user);
          if (user) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                userAddress: address,
                data: {},
              })
            );

            // Storing to the local storage end
            setAuthLoading(false);
            navigate("/champ-trade-dashboard");
          }
          else{
            navigate("/RegisterNewUser");
          }
        } catch (err) {
          setAuthLoading(false);
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        } finally {
          setAuthLoading(false);
          setWalletPrompted(false); // Reset to prevent re-trigger
        }
      }
    };

    checkUserAfterConnect();
  }, [walletPrompted, isConnected, address]);



  return (
    <div className="min-h-screen bg-black text-white font-sans pb-12 flex flex-col items-center justify-center px-4">
      {/* Header & Branding */}
      <header className="text-center max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-center sm:text-left">
          {/* Logo */}
          <img src={trade} alt="trade-logo" className="h-16 w-16 sm:h-20 sm:w-20" />

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-yellow-500">CHAMP</span> TRADE
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-300 font-medium mb-1">Powered by TCC 2.0</p>
        <p className="text-yellow-500 italic text-md sm:text-lg">Earn Like a Champion</p>
      </header>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Connect Wallet (non-functional placeholder for now) */}
        <button onClick={handleClick}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <Wallet className="w-5 h-5" />
          Connect Your Wallet
        </button>

        {/* Go to Dashboard */}
        <Link
          to="/view-user"
          className="flex items-center justify-center gap-2 inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors "
        >
          <RxDashboard />
          View
        </Link>
      </div>

      {/* Back to Home Link */}
      <div className="mt-8">
        <Link to="/" className="text-gray-400 hover:text-white text-sm underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
