import React, { useEffect, useState } from 'react';
import { CreditCard, Shield, Zap } from 'lucide-react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';


const PaymentApproval = ({ onApprove, packageAmount, packageName, loading }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setIsProcessing(loading);
    }, [loading]);

    const [selectedPayment, setSelectedPayment] = useState('crypto');

    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();


    const handlePaymentApproval = async () => {
        setIsProcessing(true);
        try {
            if (!isConnected) {
                await open();  // Connect wallet
            }

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to connect wallet", "error");
        }

        // Simulate payment processing
        // await new Promise(resolve => setTimeout(resolve, 2000));



        setIsProcessing(false);
        onApprove();
    };

    return (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-black" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Payment Approval</h2>
                <p className="text-gray-400">Secure your {packageName} package to continue</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Package</span>
                    <span className="text-white font-semibold">{packageName}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-2xl font-bold text-yellow-500">${packageAmount}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-2xl font-bold text-yellow-500">${packageAmount}</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                    <label className="flex items-center p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-500 transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="crypto"
                            checked={selectedPayment === 'crypto'}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="mr-3"
                        />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Zap className="text-black" size={16} />
                            </div>
                            <div>
                                <div className="text-white font-medium">Cryptocurrency</div>
                                <div className="text-gray-400 text-sm">Bitcoin, Ethereum, USDT</div>
                            </div>
                        </div>
                    </label>

                    <label className="flex items-center p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-500 transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="bank"
                            checked={selectedPayment === 'bank'}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="mr-3"
                        />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Shield className="text-black" size={16} />
                            </div>
                            <div>
                                <div className="text-white font-medium">Bank Transfer</div>
                                <div className="text-gray-400 text-sm">Secure bank transfer</div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <button
                onClick={handlePaymentApproval}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing Payment...' : `Approve Payment - $${packageAmount}`}
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
                <Shield className="inline mr-1" size={16} />
                Your payment is secured with 256-bit SSL encryption
            </div>
        </div>
    );
};

export default PaymentApproval;