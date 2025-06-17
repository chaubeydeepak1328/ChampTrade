// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTransaction } from '../config/register';
// import { useStore } from '../Store/UserStore';
// import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
// import Swal from 'sweetalert2';

// const RegisterNewUser = () => {
//     const [sponsorAddress, setSponsorAddress] = useState('');
//     const navigate = useNavigate();

//     const { open } = useAppKit();
//     const { address, isConnected } = useAppKitAccount();
//     const { handleSendTx, hash } = useTransaction();

//     const [isRegistering, setIsRegistering] = useState(false);
//     const [currentAction, setCurrentAction] = useState();

//     const RegisterUser = useStore((state) => state.RegisterUser);
//     const approveStakeAmount = useStore((state) => state.approveStakeAmount)


//     // Handle form submission
//     const handleRegister = async () => {
//         if (!sponsorAddress.trim()) {
//             Swal.fire("Error", "Please enter sponsor wallet address", "error");
//             return;
//         }

//         try {
//             if (!isConnected) {
//                 await open();  // Connect wallet
//             }

//             setIsRegistering(true);  // Start registration after wallet connected
//         } catch (error) {
//             console.error(error);
//             Swal.fire("Error", "Failed to connect wallet", "error");
//         }
//     };

//     useEffect(() => {
//         const registerUserToContract = async () => {
//             try {
//                 if (!address || !isConnected || !isRegistering) return;

//                 const response = await approveStakeAmount(address);
//                 console.log(response)

//                 if (response?.status) {
//                     try {
//                         const res = await RegisterUser(address, sponsorAddress);
//                         console.log(currentAction, res)
//                         setCurrentAction("registration");
//                         await handleSendTx(res);
//                     } catch (error) {
//                         Swal.fire("Error", "Something went wrong during transaction", "error");
//                     }
//                 } else {
//                     // For approval, wait for user confirmation
//                     try {
//                         console.log(currentAction, response?.trxData)
//                         setCurrentAction("approve");
//                         await handleSendTx(response?.trxData);
//                     } catch (error) {
//                         Swal.fire("Error", "Something went wrong during transaction", "error");
//                     }

//                 }
//             } catch (error) {
//                 console.error("Register error", error);
//                 Swal.fire("Error", "Registration failed", "error");
//             } finally {
//                 setIsRegistering(false);
//             }
//         };

//         registerUserToContract();
//     }, [isRegistering, address, isConnected]);

//     useEffect(() => {
//         if (hash) {
//             localStorage.setItem("userData", JSON.stringify({ userAddress: address, data: {} }));
//             const title = currentAction === "approve" ? "Approval Successful!" : "Registration Successful!";

//             if (currentAction === "approve") {
//                 Swal.fire({
//                     title: title,
//                     html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
//                     icon: 'success',
//                     timer: 5000,  // ✅ 5 seconds countdown
//                     timerProgressBar: true,
//                     allowOutsideClick: false,
//                     didOpen: () => {
//                         Swal.showLoading();
//                     }
//                 }).then(() => {
//                     window.location.reload();
//                 });
//             } else {
//                 Swal.fire({
//                     title: title,
//                     html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
//                     icon: 'success',
//                     confirmButtonText: 'Close'
//                 }).then(() => {
//                     navigate("/champ-trade-dashboard");
//                 });
//             }
//         }
//     }, [hash, address, navigate, currentAction]);
















//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
//                     Register New User
//                 </h2>
//                 <div className="mb-4">
//                     <label className="block text-sm mb-2">Sponsor Wallet Address</label>
//                     <input
//                         type="text"
//                         value={sponsorAddress}
//                         onChange={(e) => setSponsorAddress(e.target.value)}
//                         placeholder="Enter sponsor wallet address"
//                         className="w-full p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
//                     />
//                 </div>
//                 <button
//                     onClick={handleRegister}
//                     className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all"
//                 >
//                     Register
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default RegisterNewUser;



import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StepIndicator from '../auth/StepIndicator';
import PaymentApproval from '../auth/PaymentApproval';
import SponsorValidation from '../auth/SponsorValidation';
import RegistrationForm from '../auth/RegistrationForm';
import RegistrationSuccess from '../auth/RegistrationSuccess';
import { useStore } from '../Store/UserStore';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Swal from 'sweetalert2';
import { useTransaction } from '../config/register';

const RegisterPage = () => {
    const [searchParams] = useSearchParams();
    const referralId = searchParams.get('ref');

    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [sponsorId, setSponsorId] = useState('');
    const [userData, setUserData] = useState(null);
    const [currentAction, setCurrentAction] = useState();

    const stepLabels = ['Payment', 'Sponsor', 'Register', 'Complete'];
    const packageDetails = {
        name: 'Starter Package',
        amount: 100
    };



    const { address, isConnected } = useAppKitAccount();
    const { handleSendTx, hash } = useTransaction();


    const approveStakeAmount = useStore((state) => state.approveStakeAmount)

    const [loadPaymentApproval, setLoadPaymentApprove] = useState(false);
    const [registerLoading, setRegLoading] = useState(false)

    const handlePaymentApproval = async () => {
        try {
            setLoadPaymentApprove(true)
            const response = await approveStakeAmount(address);

            if (response?.status) {
                try {
                    // const res = await RegisterUser(address, sponsorAddress);
                    // console.log(currentAction, res)
                    // setCurrentAction("registration");
                    // await handleSendTx(res);

                    setCurrentStep(2);

                } catch (error) {
                    setLoadPaymentApprove(false)
                    Swal.fire("Error", "Something went wrong during transaction", "error");
                    console.log(error)
                }
            } else {
                // For approval, wait for user confirmation
                try {
                    setCurrentAction("approve");
                    console.log(response?.trxData)
                    await handleSendTx(response?.trxData);
                } catch (error) {
                    setLoadPaymentApprove(false)
                    Swal.fire("Error", "Something went wrong during transaction", "error");
                    console.log(error)
                }

            }

            setLoadPaymentApprove(false)

        } catch (error) {
            console.error("Register error", error);
            Swal.fire("Error", "Registration failed", "error");
        }


    };

    const handleSponsorValidation = (validatedSponsorId) => {
        setSponsorId(validatedSponsorId);
        setCurrentStep(3);
    };


    const RegisterUser = useStore((state) => state.RegisterUser);
    const handleRegistrationComplete = async () => {

        try {
            setRegLoading(true);
            console.log(address, sponsorId)
            const res = await RegisterUser(address, sponsorId);
            console.log(currentAction, res)
            setCurrentAction("registration");
            await handleSendTx(res);
        } catch (error) {
            setRegLoading(false);
            Swal.fire("Error", error.message || "Something went wrong", "error");
            console.log(error)
        }
        setRegLoading(false);
    };



    useEffect(() => {
        if (hash) {

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
                    setCurrentStep(2);
                });
            } else {
                localStorage.setItem("userData", JSON.stringify({ userAddress: address, data: {} }));

                Swal.fire({
                    title: title,
                    html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    setCurrentStep(4);
                });
            }
        }
    }, [hash, address, navigate, currentAction]);



    return (
        <div className="min-h-screen bg-gray-900">


            <div className="max-w-4xl mx-auto px-6 py-8">
                <StepIndicator
                    currentStep={currentStep}
                    totalSteps={4}
                    stepLabels={stepLabels}
                />

                {currentStep === 1 && (
                    <PaymentApproval
                        onApprove={handlePaymentApproval}
                        packageAmount={packageDetails.amount}
                        packageName={packageDetails.name}
                        loading={loadPaymentApproval}
                    />
                )}

                {currentStep === 2 && (
                    <SponsorValidation
                        onValidate={handleSponsorValidation}
                        sponsorId={referralId || ''}
                    />
                )}

                {currentStep === 3 && (
                    <RegistrationForm
                        onComplete={handleRegistrationComplete}
                        sponsorId={sponsorId}
                        loading={registerLoading}
                    />
                )}

                {currentStep === 4 && (
                    <RegistrationSuccess
                        userAddress={address}
                        sponsorId={sponsorId} />
                )}
            </div>
        </div>
    );
};

export default RegisterPage;