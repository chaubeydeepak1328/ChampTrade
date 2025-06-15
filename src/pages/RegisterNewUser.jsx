import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterNewUser = () => {
    const [sponsorAddress, setSponsorAddress] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (sponsorAddress.trim() === '') {
            alert('Please enter sponsor wallet address');
            return;
        }
        // You can navigate or handle registration logic here
        console.log('Registering with sponsor:', sponsorAddress);
        navigate(`/register/${sponsorAddress}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
                    Register New User
                </h2>
                <div className="mb-4">
                    <label className="block text-sm mb-2">Sponsor Wallet Address</label>
                    <input
                        type="text"
                        value={sponsorAddress}
                        onChange={(e) => setSponsorAddress(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter sponsor wallet address"
                        className="w-full p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegisterNewUser;
