import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';
// import { useTCC20Contract } from '../PrivateSaleHooks/useTCC20Contract';

export function BuyTokens() {
  const navigate = useNavigate();
  const [bnbAmount, setBnbAmount] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState('0');
  const [referralCode, setReferralCode] = useState('');
  // const { estimateTokens, buyTokens, isConnecting, error } = useTCC20Contract();

  const handleEstimate = async () => {
    if (!bnbAmount) return;
    // const tokens = await estimateTokens(bnbAmount);
    // setEstimatedTokens(tokens);
  };

  const handleBuy = async () => {
    if (!bnbAmount) return;
    // await buyTokens(bnbAmount, referralCode);
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-yellow-500/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-yellow-500">
        <Coins className="mr-2" />
        Buy TCC2.0 Tokens
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-yellow-500 mb-1">
            BNB Amount
          </label>
          <input
            type="number"
            value={bnbAmount}
            onChange={(e) => setBnbAmount(e.target.value)}
            placeholder="0.0"
            className="w-full p-3 bg-black border border-yellow-500/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-500 mb-1">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="0x..."
            className="w-full p-3 bg-black border border-yellow-500/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white"
          />
        </div>

        <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
          <p className="text-sm text-yellow-500">Estimated TCC2.0 Tokens:</p>
          <p className="text-xl font-semibold text-white">{estimatedTokens}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleEstimate}
            // disabled={isConnecting || !bnbAmount}
            className="w-full sm:flex-1 px-6 py-3 bg-black  text-yellow-500 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-500/50"
          >
            Calculate
          </button>
          <button
            onClick={handleBuy}
            // disabled={isConnecting || !bnbAmount}
            className="w-full sm:flex-1 px-6 py-3 bg-yellow-500 hover:bg-amber-600 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>

        {/* {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )} */}
      </div>
    </div>
  );
}