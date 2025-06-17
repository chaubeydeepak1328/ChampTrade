import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

const RegistrationForm = ({ onComplete, sponsorId, loading }) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsSubmitting(loading);
    }, [loading]);

    const validateForm = () => {
        const newErrors = {};
        // Add actual validations here if needed
        if (!sponsorId) {
            newErrors.sponsorId = "Sponsor ID is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate a delay or perform async actions
        setTimeout(() => {
            onComplete({ sponsorId });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-black" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Complete Registration</h2>
                <p className="text-gray-400">Create your TCC 2.0 account</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sponsor Address
                        </label>
                        <input
                            type="text"
                            name="sponsorId"
                            value={sponsorId}
                            disabled
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${errors.sponsorId
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-600 focus:border-yellow-500 focus:ring-yellow-500'
                                }`}
                            placeholder="Sponsor wallet address"
                        />
                        {errors.sponsorId && (
                            <p className="mt-1 text-sm text-red-400">{errors.sponsorId}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;
