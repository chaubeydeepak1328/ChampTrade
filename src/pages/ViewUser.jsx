import { Link, useNavigate } from 'react-router-dom';
import trade from '../images/trade.png';
import { useState } from 'react';

function ViewUser() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    const handleViewUser = () => {
        if (userId.trim() !== '') {
            navigate(`/user/${userId}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleViewUser();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans flex flex-col items-center justify-center px-4">
            {/* Header */}
            <header className="text-center max-w-2xl w-full mb-10">
                <div className="flex flex-col items-center gap-4 mb-4">
                    <img src={trade} alt="trade-logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-yellow-500" />
                    <h1 className="text-5xl font-bold leading-tight">
                        <span className="text-yellow-500">CHAMP</span> TRADE
                    </h1>
                </div>
                <p className="text-xl text-gray-300 font-medium mb-1">Powered by TCC 2.0</p>
                <p className="text-yellow-400 italic text-lg">Earn Like a Champion</p>
            </header>

            {/* View User Input Box */}
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-400">Search User Details</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                        onClick={handleViewUser}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-lg transition-all"
                    >
                        View
                    </button>
                </div>
            </div>

            {/* Back to Home */}
            <div className="mt-10">
                <Link to="/" className="text-gray-400 hover:text-white text-sm underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}

export default ViewUser;
