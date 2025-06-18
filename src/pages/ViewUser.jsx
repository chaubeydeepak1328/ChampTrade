import React, { useState } from 'react';
import { Search, TrendingUp, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store/UserStore';



const UserSearch = () => {
    const [userId, setUserId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const IsUserExist = useStore((state) => state.IsUserExist)

    const handleSearch = async () => {

        setIsSearching(true);
        setError('');

        if (!userId.trim()) {
            setError('Please enter a User ID');
            return;
        }


        const response = await IsUserExist(userId);

        if (response) {
            localStorage.setItem("userData", JSON.stringify({ userAddress: userId, data: {} }));

            setIsSearching(false);
            navigate("/champ-trade-dashboard");
        } else {
            setIsSearching(false);
            setError('User not found. Please check the User ID and try again.');
        }
        setIsSearching(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrendingUp className="text-black" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-yellow-500">CHAMP</span>{' '}
                        <span className="text-white">TRADE</span>
                    </h1>
                    <p className="text-gray-400 mb-2">Powered by TCC 2.0</p>
                    <p className="text-yellow-500 italic">Earn Like a Champion</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
                        Search User Details
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Enter User Address
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                        setError('');
                                    }}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter User Address"
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                                />
                            </div>
                            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                        </div>

                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSearching ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search size={20} />
                                    View
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate("/go-dashboard")}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSearch;