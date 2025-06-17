import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTransaction } from '../config/register';
import { useStore } from '../Store/UserStore';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Swal from 'sweetalert2';

const RefferedUser = () => {

    const [sponsorAddress, setSponsorAddress] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let refParam = urlParams.get('ref');
        if (refParam) {
            // Remove TCC prefix
            if (refParam.startsWith("TCC")) {
                refParam = refParam.replace("TCC", "");
            }
            setSponsorAddress(refParam);
            console.log("Referral Address:", refParam);
        }
    }, []);


    const navigate = useNavigate();

    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { handleSendTx, hash } = useTransaction();

    const [isRegistering, setIsRegistering] = useState(false);
    const [currentAction, setCurrentAction] = useState();

    const RegisterUser = useStore((state) => state.RegisterUser);
    const approveStakeAmount = useStore((state) => state.approveStakeAmount)

    // ===================================================================
    // Validate User
    // ===================================================================

    const [handleValidate, sethandleValidateUser] = useState();

    const IsUserExist = useStore((state) => state.IsUserExist)
    useEffect(() => {
        const handleValidateUser = async () => {
            const response = await IsUserExist(sponsorAddress);
            if (response) {
                setIsRegistering(true)
            } else {
                Swal.fire({
                    title: "Invalid Sponser",
                    html: `InValid Sponser Address`,
                    icon: 'warning',
                    confirmButtonText: 'Close'
                })
            }
        }
        if (handleValidate) {
            handleValidateUser()
        }
    }, [handleValidate])

    // Handle form submission
    const handleRegister = async () => {
        if (!sponsorAddress.trim()) {
            Swal.fire("Error", "Please enter sponsor wallet address", "error");
            return;
        }

        try {
            if (!isConnected) {
                await open();  // Connect wallet
            }

            sethandleValidateUser(true)

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to connect wallet", "error");
        }
    };

    useEffect(() => {
        const registerUserToContract = async () => {
            try {
                if (!address || !isConnected || !isRegistering) return;

                const response = await approveStakeAmount(address);
                console.log(response)

                if (response?.status) {
                    try {
                        const res = await RegisterUser(address, sponsorAddress);
                        console.log(currentAction, res)
                        setCurrentAction("registration");
                        await handleSendTx(res);
                    } catch (error) {
                        Swal.fire("Error", "Something went wrong during transaction", "error");
                    }
                } else {
                    // For approval, wait for user confirmation
                    try {
                        console.log(currentAction, response?.trxData)
                        setCurrentAction("approve");
                        await handleSendTx(response?.trxData);
                    } catch (error) {
                        Swal.fire("Error", "Something went wrong during transaction", "error");
                    }

                }
            } catch (error) {
                console.error("Register error", error);
                Swal.fire("Error", "Registration failed", "error");
            } finally {
                setIsRegistering(false);
            }
        };

        registerUserToContract();
    }, [isRegistering, address, isConnected]);

    useEffect(() => {
        if (hash) {
            localStorage.setItem("userData", JSON.stringify({ userAddress: address, data: {} }));
            const title = currentAction === "approve" ? "Approval Successful!" : "Registration Successful!";

            if (currentAction === "approve") {
                Swal.fire({
                    title: title,
                    html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
                    icon: 'success',
                    timer: 5000,  // ✅ 5 seconds countdown
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    title: title,
                    html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    navigate("/champ-trade-dashboard");
                });
            }
        }
    }, [hash, address, navigate, currentAction]);

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
                        disabled={true}
                        onChange={(e) => setSponsorAddress(e.target.value)}
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

export default RefferedUser;
