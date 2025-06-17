import React from 'react';
import { CheckCircle, Copy, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';



const RegistrationSuccess = ({ userAddress, sponsorId }) => {
    const referralLink = `${window.location.origin}/referral?ref=TCC${userAddress}`;

    const { address, isConnected } = useAppKitAccount();

    const copyToClipboard = (texts) => {
        navigator.clipboard.writeText(texts);
    };

    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome to TCC 2.0!</h2>
                <p className="text-gray-400">Your registration has been completed successfully</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Your Address:</span>
                        <span className="text-white font-medium">{address.slice(0, 6) + "...." + address.slice(-7)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Sponsor Address:</span>
                        <span className="text-white font-medium">{sponsorId && (sponsorId.slice(0, 6) + "...." + sponsorId.slice(-7))}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Share2 size={20} className="text-yellow-500" />
                    Your Referral Link
                </h3>
                <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-3">
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 bg-transparent text-white text-sm outline-none"
                    />
                    <button
                        onClick={() => copyToClipboard(referralLink)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-1"
                    >
                        <Copy size={16} />
                        Copy
                    </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                    Share this link to earn commissions from your referrals
                </p>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">0%</div>
                    <div className="text-gray-400 text-sm">Commission Earned</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">0</div>
                    <div className="text-gray-400 text-sm">Direct Referrals</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">Starter</div>
                    <div className="text-gray-400 text-sm">Current Rank</div>
                </div>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate("/champ-trade-dashboard")} className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
                    Go to Dashboard
                </button>

            </div>
        </div>
    );
};

export default RegistrationSuccess;