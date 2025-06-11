



import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import trade from '../images/trade.png'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { RxDashboard } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { useStore } from "../Store/UserStore";

function LandingPage() {
  const getAllusers = useStore((state) => state.getAllusers);
  const IsUserExist = useStore((state) => state.IsUserExist);

  const [authLoading, setAuthLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const { open } = useAppKit(); // This triggers wallet connection
  const { address, isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState("");

  const [walletPrompted, setWalletPrompted] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const localAddress = JSON.parse(
      localStorage.getItem("userData")
    )?.userAddress;

    // console.log("step1 ==========", localAddress);

    if (address && isConnected && localAddress) {
      setAuthLoading(false);
      navigate("/user-panel-home");
    } else if (address && isConnected && localAddress == "undefined") {
      if (walletPrompted && isConnected && address) {
        try {
          const user = await IsUserExist(address);
          // console.log("this is User=========>", user?.userId?.toString(), user);

          const safeUser = {
            ...user,
            regTime: user.regTime?.toString(), // convert BigInt to string
          };

          localStorage.setItem(
            "userData",
            JSON.stringify({
              userId: safeUser?.userId || null,
              userAddress: safeUser?.walletAdd,
              data: safeUser,
            })
          );

          // Storing to the local storage end
          setAuthLoading(false);
          navigate("/user-panel-home", {
            state: {
              userId: user?.userId?.toString() || null,
              userAddress: user?.walletAdd,
              data: user || null,
            },
          });
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

  useEffect(() => {
    const checkUserAfterConnect = async () => {
      if (walletPrompted && isConnected && address) {
        try {
          const user = await IsUserExist(address);
          // console.log("this is User=========>", user?.userId?.toString(), user);

          const safeUser = {
            ...user,
            regTime: user.regTime?.toString(), // convert BigInt to string
          };

          localStorage.setItem(
            "userData",
            JSON.stringify({
              userId: safeUser?.userId || null,
              userAddress: safeUser?.walletAdd,
              data: safeUser,
            })
          );

          // Storing to the local storage end
          setAuthLoading(false);
          navigate("/user-panel-home", {
            state: {
              userId: user?.userId?.toString() || null,
              userAddress: user?.walletAdd,
              data: user || null,
            },
          });
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

  const handleUserIdClick = async (e) => {
    e.preventDefault(); // Prevent navigation
    setViewLoading(true);

    if (inputData) {
      // Perform any action with the input data, like navigating to a user panel
      // console.log("User ID entered:", inputData);

      try {
        const UserInfo = await getAllusers(parseInt(inputData) - 1);
        // console.log("UserInfo:", UserInfo); // Log the fetched users to the console

        if (
          UserInfo &&
          UserInfo.userAddress &&
          UserInfo.userAddress.toString()
        ) {
          // Convert all relevant data fields to strings if they are BigInt
          const dataToStore = {
            userId: UserInfo.userId || inputData,
            userAddress: UserInfo.userAddress.toString(), // Ensure userAddress is a string
            data: {
              ...UserInfo,
              userAddress: UserInfo.userAddress.toString(), // Convert if any BigInt in UserInfo
              sponserAdd: UserInfo.sponserAdd.toString(),
              regTime: UserInfo.regTime.toString(),
              directReferral: UserInfo.directReferral.toString(),
            },
          };

          // Store user data in localStorage
          localStorage.setItem("userData", JSON.stringify(dataToStore));

          // Navigate to user panel home page
          navigate("/user-panel-home");
        } else {
          setViewLoading(false);
          toast("Please enter a valid user ID.");
        }
      } catch (error) {
        console.error("Error:", error);
        setViewLoading(false);
        toast("An error occurred while fetching user data.");
      }
    } else {
      setViewLoading(false);
      toast("Please enter a valid user ID.");
    }
  };

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
          to="/champ-trade-dashboard"
          className="flex items-center justify-center gap-2 inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors "
        >
          <RxDashboard />
          Go to Dashboard
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
