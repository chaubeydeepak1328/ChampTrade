import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';
import Swal from 'sweetalert2';
import CONTRACT_ABI from './CONTRACT_ABI.json';
import TCC_TEST_ABI from './TEST_CONTRACT.json';






const INFURA_URL = "https://bsc-testnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
const web3 = new Web3(INFURA_URL);



const Contract = {
    "TCC_STAKING": "0xc9c8cce0e1c080834bd0d9af5ccce1204059365c",
    "TCC_TEST": "0xb1480314d22d172E1f77a73fE3a14F307CD088c6",
}




const API_KEY = "3KMDJQENA1C2NXCVWZAU2DB4MAKT1AYCPJ"


const fetchContractAbi = async (contractName) => {
    try {
        const response = await fetch(`https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${Contract[contractName]}&apikey=${API_KEY}`);
        const data = await response.json();
        // console.log("proxy Address, contract Address", Contract[contractName], data?.implementations[0].address);

        const contractAdress = data?.result[0]?.Implementation;

        if (contractAdress) {
            const res = await fetch(`https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAdress}&apikey=${API_KEY}`);
            const data1 = await res.json();

            const parsedAbi = JSON.parse(data1?.result[0]?.ABI);

            return {
                abi: parsedAbi,
                contractAddress: Contract[contractName]
            };
        }

    } catch (error) {
        console.error("Error fetching contract ABI:", error);
        throw error;
    }
}




export const useStore = create((set, get) => ({


    IsUserExist: async (userAddress) => {

        try {

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            // Call the contract method
            const res = await contract.methods.isUserRegistered(userAddress).call();
            console.log(res)

            return res
        } catch (error) {
            console.log(error)
        }
    },

    dashboardInfo: async (userAddress) => {

        const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);
        const userInvestment = contract.methods.getUserInvestmentStats(userAddress).call();
        const getUserRoi = contract.methods.getUserInvestmentStats(userAddress).call();


        const CardInfo = {
            My_PortFolio: userInvestment.toString(),
            Total_Earnings: userInvestment.toString(),
            Reinvest_Reserve: "",
            Daily_Income: userInvestment.toString(),
            Active_Referrals: "",
            Team_Income_Today: "",
        }

        const transaction = {
            ITEM: "",
            Amount: "",
            Wallet: "",
            Status: "",
            Time: "",
            type: "",
        }

        return { CardInfo, transaction }


    },



    getUserAllowance: async (userAddress) => {


        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        console.log("==================> TCC_STAKING", TCC_STAKING)


        // console.log(Contract["TCC_TEST"], TCC_TEST_ABI)
        const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);
        const contract1 = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);



        const spenderAddress = Contract["TCC_STAKING"];

        // Approved amount come in wei
        const approvedAmt = await contract.methods.allowance(userAddress, spenderAddress).call();
        const userBalance = await contract.methods.balanceOf(userAddress).call();
        const requiredTcc = await contract1.methods.getRequiredTccForInvestment().call();
        const TccPriceUsd = await contract1.methods.getTccPriceInUsd().call();


        console.log("requiredTcc approvedAmt userBalance TccPriceUsd", requiredTcc, approvedAmt, userBalance, TccPriceUsd)

        const data = {
            requiredTcc: parseInt(web3.utils.fromWei(requiredTcc, "ether")).toString(),
            approvedAmt: parseInt(web3.utils.fromWei(approvedAmt, "ether")).toString(),
            userBalance: parseInt(web3.utils.fromWei(userBalance, "ether")).toString(),
            TccPriceUsd: parseFloat(BigInt(TccPriceUsd) / BigInt(1000000)),


        };

        console.log(data)

        return data

    },





    stackAmount: async (userAddress) => {
        try {

            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Properly call contract functions
            const amountInWei = await contract.methods.getRequiredTccForInvestment().call();
            const directSponsor = await contract.methods.getDirectSponsor(userAddress).call();

            // Prepare transaction data
            const trxData = await contract.methods.reInvest(amountInWei).encodeABI();

            // Get current gas price
            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: Contract["TCC_STAKING"],
                    data: trxData,
                    value: 0  // no native coin transfer for staking ERC20
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            // Calculate gas cost (optional for logging only)
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);

            // Prepare final transaction object
            const tx = {
                from: userAddress,
                to: Contract["TCC_STAKING"],
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
            };

            console.log("✅ stackAmount transaction prepared", tx);

            return tx;

        } catch (error) {
            console.error("❌ stackAmount error:", error);
            alert(`Staking error: ${error.message}`);
            throw error;
        }
    },




    approveStakeAmount: async (userAddress) => {

        const Amt = 10000;
        try {
            if (!userAddress || !Amt) {
                throw new Error("Invalid Amount");
            }


            const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);


            const spenderAddress = Contract["TCC_STAKING"];

            // Convert amount to wei
            const amountInWei = web3.utils.toWei(Amt.toString(), "ether");

            // Approved amount come in wei
            const approvedAmt = await contract.methods.allowance(userAddress, spenderAddress).call();


            console.log("========approvedAmt:-", approvedAmt)

            console.log(BigInt(approvedAmt) > BigInt(amountInWei))

            if (BigInt(approvedAmt) >= BigInt(amountInWei)) {

                return {
                    status: true
                };

            }

            const requiredAmt = BigInt(amountInWei)

            const trxData = await contract.methods.approve(Contract["TCC_STAKING"], requiredAmt).encodeABI();


            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: Contract["TCC_TEST"],
                    data: trxData,
                    value: 0
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            console.log("Estimated Gas:", gasLimit);
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);

            const tx = {
                from: userAddress,
                to: Contract["TCC_TEST"],
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
            };
            console.log("approveStakeAmount")
            return {
                status: false,
                trxData: tx
            };

        } catch (error) {
            console.error("approveStakeAmount error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Approval Error',
                text: error.message,
                confirmButtonText: 'OK'
            });

            throw error;
        }
    },



    RegisterUser: async (userAddress, sponsorAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Fetch required investment amount
            const amountInWei = await contract.methods.getRequiredTccForInvestment().call();

            // Prepare transaction data for register
            const trxData = await contract.methods.register(amountInWei, sponsorAddress).encodeABI();

            // Get gas price
            const gasPrice = await web3.eth.getGasPrice();

            // Estimate gas
            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: TCC_STAKING.contractAddress, // ✅ Corrected here
                    data: trxData,
                    value: 0
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            console.log("Estimated Gas:", gasLimit);
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);

            // Prepare transaction object
            const tx = {
                from: userAddress,
                to: TCC_STAKING.contractAddress,  // ✅ Corrected here
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
            };

            return tx;

        } catch (error) {
            console.error("❌ RegisterUser error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Register Error',
                text: error.message,
                confirmButtonText: 'OK'
            });
            throw error;
        }
    },

    ClaimReward: async (userAddress, sponsorAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Fetch required investment amount
            const amountInWei = await contract.methods.getRequiredTccForInvestment().call();

            // Prepare transaction data for register
            const trxData = await contract.methods.register(amountInWei, sponsorAddress).encodeABI();

            // Get gas price
            const gasPrice = await web3.eth.getGasPrice();

            // Estimate gas
            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: TCC_STAKING.contractAddress, // ✅ Corrected here
                    data: trxData,
                    value: 0
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            console.log("Estimated Gas:", gasLimit);
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);

            // Prepare transaction object
            const tx = {
                from: userAddress,
                to: TCC_STAKING.contractAddress,  // ✅ Corrected here
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
            };

            return tx;

        } catch (error) {
            console.error("❌ RegisterUser error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Register Error',
                text: error.message,
                confirmButtonText: 'OK'
            });
            throw error;
        }
    },


    // UserCompletedStakes: async (userAddress) => {
    //     try {

    //         const contract = new web3.eth.Contract(TCC_STAKIN_ABI, Contract["TCC_STAKING"]);

    //         // Call the contract method
    //         const res = await contract.methods.getUserCompletedStakes(userAddress).call();
    //         console.log(res)

    //         const data = res.map((curElm) => {
    //             return {
    //                 stakeId: curElm.stakeId,
    //                 amount: web3.utils.fromWei(curElm.amount, "ether"),
    //                 startTime: parseInt(curElm.startTime),
    //                 lockPeriod: parseInt(curElm.lockPeriod),
    //                 unlockTime: parseInt(curElm.unlockTime),
    //                 totalInterest: web3.utils.fromWei(curElm.totalInterest, "ether"),
    //                 interestEarnedTillNow: web3.utils.fromWei(curElm.interestEarnedTillNow, "ether"),
    //                 isUnlocked: curElm.isUnlocked.toString(),
    //                 withdrawn: curElm.withdrawn,
    //             };
    //         });

    //         return data;

    //     } catch (error) {
    //         console.log(error);
    //         return [];
    //     }
    // },


    Profile: async (userAddress) => {
        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);
        const directSponsor = await contract.methods.getDirectSponsor(userAddress).call();

        return {
            userAddress,
            directSponsor
        }

    }

}));
