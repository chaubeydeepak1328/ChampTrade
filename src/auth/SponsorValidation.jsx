import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Search } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useStore } from '../Store/UserStore';
import Swal from 'sweetalert2';


const SponsorValidation = ({ onValidate, sponsorId: initialSponsorId }) => {
    const [sponsorId, setSponsorId] = useState(initialSponsorId || '');
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [hasValidated, setHasValidated] = useState(false);

    const { address, isConnected } = useAppKitAccount();

    const IsUserExist = useStore((state) => state.IsUserExist)

    const validateSponsor = async () => {
        if (!sponsorId.trim()) return;

        setIsValidating(true);
        setValidationResult(null);


        const response = await IsUserExist(sponsorId);
        if (response) {

            setValidationResult({
                isValid: response,
                message: response
                    ? 'Sponsor verified successfully!'
                    : 'Invalid sponsor ID. Please check and try again.',
                sponsorName: response ? address : undefined
            });

            setIsValidating(false);
            setHasValidated(true);


        } else {
            setIsValidating(false);
            Swal.fire({
                title: "Invalid Sponser",
                html: `InValid Sponser Address`,
                icon: 'warning',
                confirmButtonText: 'Close'
            })
        }

        // Simulate sponsor validation
        // await new Promise(resolve => setTimeout(resolve, 1500));




    };

    const handleContinue = () => {
        if (validationResult?.isValid) {
            onValidate(sponsorId);
        }
    };

    useEffect(() => {
        if (initialSponsorId) {
            validateSponsor();
        }
    }, []);

    return (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-black" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sponsor Validation</h2>
                <p className="text-gray-400">Enter your sponsor's ID to validate your registration</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Sponsor ID
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={sponsorId}
                            onChange={(e) => setSponsorId(e.target.value)}
                            placeholder="Enter sponsor ID (e.g., TCC123456)"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                        <button
                            onClick={validateSponsor}
                            disabled={isValidating || !sponsorId.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isValidating ? (
                                <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                            ) : (
                                <Search size={16} />
                            )}
                        </button>
                    </div>
                </div>

                {validationResult && (
                    <div className={`p-4 rounded-lg border ${validationResult.isValid
                        ? 'bg-green-900/50 border-green-500 text-green-300'
                        : 'bg-red-900/50 border-red-500 text-red-300'
                        }`}>
                        <div className="flex items-center gap-2">
                            {validationResult.isValid ? (
                                <CheckCircle size={20} className="text-green-500" />
                            ) : (
                                <XCircle size={20} className="text-red-500" />
                            )}
                            <span className="font-medium">{validationResult.message}</span>
                        </div>
                        {validationResult.sponsorName && (
                            <div className="mt-2 text-sm">
                                Sponsor: <span className="font-semibold">{validationResult.sponsorName.slice(0, 5)+ "...."+validationResult.sponsorName.slice(-6)}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Sponsor Benefits</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            Direct commission from your activities
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            Team building rewards
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            Leadership bonuses
                        </li>
                    </ul>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!validationResult?.isValid}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue Registration
                </button>
            </div>
        </div>
    );
};

export default SponsorValidation;