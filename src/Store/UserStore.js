import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';
import Swal from 'sweetalert2';
import CONTRACT_ABI from './CONTRACT_ABI.json';






const Contract = {
    "ChamStake": "0xb36DFf5b8bef8A2441C8a792e052898833c31D7e"
}

const INFURA_URL = "https://bsc-testnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
const web3 = new Web3(INFURA_URL);






export const useStore = create((set, get) => ({


    IsUserExist: async (userAddress) => {

        try {

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["ChamStake"]);

            // Call the contract method
            const res = await contract.methods.isUserRegistered(userAddress).call();
            console.log(res)

            return res
        } catch (error) {
            console.log(error)
        }
    },




    // approveStakeAmount: async (userAddress, Amt) => {
    //     try {
    //         if (!userAddress || !Amt) {
    //             throw new Error("Invalid Amount");
    //         }


    //         const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);


    //         const spenderAddress = Contract["TCC_STAKING"];

    //         // Convert amount to wei
    //         const amountInWei = web3.utils.toWei(Amt.toString(), "ether");

    //         // Approved amount come in wei
    //         const approvedAmt = await contract.methods.allowance(userAddress, spenderAddress).call();


    //         console.log("========approvedAmt:-", approvedAmt)

    //         console.log(BigInt(approvedAmt) > BigInt(amountInWei))

    //         if (BigInt(approvedAmt) >= BigInt(amountInWei)) {

    //             return {
    //                 status: true
    //             };

    //         }

    //         const requiredAmt = BigInt(amountInWei)

    //         const trxData = await contract.methods.approve(Contract["TCC_STAKING"], requiredAmt).encodeABI();


    //         const gasPrice = await web3.eth.getGasPrice();

    //         let gasLimit;
    //         try {
    //             gasLimit = await web3.eth.estimateGas({
    //                 from: userAddress,
    //                 to: Contract["TCC_TEST"],
    //                 data: trxData,
    //                 value: 0
    //             });
    //         } catch (error) {
    //             console.error("❌ Gas estimation failed:", error);
    //             alert("Gas estimation failed. Please check contract and inputs.");
    //             return;
    //         }

    //         console.log("Estimated Gas:", gasLimit);
    //         const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
    //         console.log("Estimated Gas Cost in ETH:", gasCost);

    //         const tx = {
    //             from: userAddress,
    //             to: Contract["TCC_TEST"],
    //             data: trxData,
    //             gas: gasLimit,
    //             gasPrice: gasPrice,
    //         };
    //         console.log("approveStakeAmount")
    //         return {
    //             status: false,
    //             trxData: tx
    //         };

    //     } catch (error) {
    //         console.error("approveStakeAmount error:", error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Approval Error',
    //             text: error.message,
    //             confirmButtonText: 'OK'
    //         });

    //         throw error;
    //     }
    // },


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
}));
