import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';
import Swal from 'sweetalert2';
import CONTRACT_ABI from './CONTRACT_ABI.json';
import TCC_TEST_ABI from './TEST_CONTRACT.json';






// const INFURA_URL = "https://bsc-testnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
// const web3 = new Web3(INFURA_URL);


const INFURA_URL = "https://bsc-mainnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf";
const web3 = new Web3(INFURA_URL);

// const Contract = {
//     "TCC_STAKING": "0x342e8CAcdaC1d4fC6b8d646aF0D23fAc4F16a69c",
//     "TCC_TEST": "0xb1480314d22d172E1f77a73fE3a14F307CD088c6",
// }


const Contract = {
    "TCC_STAKING": "0xEFBFcf8fEc86f68B6a1625734dD1E94421316901",
    "TCC_TEST": "0xAd771bac597eFac136929195985577Da0C40e557",
}






const API_KEY = "3KMDJQENA1C2NXCVWZAU2DB4MAKT1AYCPJ"



// const response = await fetch(`https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${Contract[contractName]}&apikey=${API_KEY}`);


const fetchContractAbi = async (contractName) => {
    try {
        const response = await fetch(`https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${Contract[contractName]}&apikey=${API_KEY}`);
        const data = await response.json();
        // console.log("proxy Address, contract Address", Contract[contractName], data?.implementations[0].address);

        const contractAdress = data?.result[0]?.Implementation;

        if (contractAdress) {
            const res = await fetch(`https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAdress}&apikey=${API_KEY}`);
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



    dashboardCardInfo: async (userAddress) => {

        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        console.log("==================> TCC_STAKING", TCC_STAKING)

        const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

        // ✅ Await all calls properly
        const userInvestments = await contract.methods.getUserInvestmentsWithDetails(userAddress).call();
        const directReferral = await contract.methods.getAllDirectReferralsWithCounts(userAddress).call();
        const userCompStats = await contract.methods.getUserComprehensiveStats(userAddress).call();


        const timestampInSeconds = Math.floor(Date.now() / 1000);

        const getWeekLevelIncome = await contract.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();


        // ✅ Since userInvestments is an array, you need to sum investedAmountInTCC
        let totalInvestedTCC = 0;
        let totalEarningsTCC = 0;
        let dailyIncomeUSD = 0;

        for (let i = 0; i < userInvestments.length; i++) {
            totalInvestedTCC += parseInt(userInvestments[i].investedAmountInTCC);
            totalEarningsTCC += parseInt(userInvestments[i].totalROIReceived);
            dailyIncomeUSD += parseInt(userInvestments[i].dailyROIUsd);
        }

        // const currentDay = Math.floor(Date.now() / 1000 / 60);  // Since contract uses SECONDS_IN_DAY = 60
        // const dayOfWeek = currentDay % 7;

        // if (dayOfWeek !== 3) { // 3 is Sunday index
        //     for (let i = 0; i < levelROIRecords.length; i++) {
        //         const record = levelROIRecords[i];
        //         if (!record.isCompleted) {
        //             teamIncomeUsd += parseInt(record.roiAmount);
        //         }
        //     }
        // }

        // ✅ Finally create CardInfo correctly
        const CardInfo = {
            My_PortFolio: (parseFloat(totalInvestedTCC) / 1e8).toFixed(2),
            Total_Earnings: (parseFloat(totalEarningsTCC) / 1e18).toFixed(2),
            Reinvest_Reserve: (parseFloat(userCompStats.totalReinvestmentReserve) / 1e8).toFixed(2),
            Daily_Income: (parseFloat(dailyIncomeUSD) / 1e8).toFixed(2),
            Active_Referrals: directReferral.totalReferrals.toString(),
            getWeekLevelIncome: getWeekLevelIncome// if you're not calculating team income yet
        };

        console.log(CardInfo)

        return CardInfo;
    },


    getMyEarningsData: async (userAddress) => {

        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

        // 1️⃣ Get user investments
        const userInvestments = await contract.methods.getUserInvestmentsWithDetails(userAddress).call();

        let totalDirectEarningUsd = 0;

        for (let i = 0; i < userInvestments.length; i++) {
            const roiReceived = parseInt(userInvestments[i].totalROIReceived);
            totalDirectEarningUsd += roiReceived;
        }

        // Convert from 1e8 to normal USD
        totalDirectEarningUsd = totalDirectEarningUsd / 1e8;

        // 2️⃣ Get referral earnings
        // const levelROIRecords = await contract.methods.levelROIReceived(userAddress).call();

        let totalReferralEarningUsd = 0;

        // for (let i = 0; i < levelROIRecords.length; i++) {
        //     const record = levelROIRecords[i];
        //     const totalUsdReceived = parseInt(record.totalReceivedAmountInUSD);
        //     totalReferralEarningUsd += totalUsdReceived;
        // }

        // totalReferralEarningUsd = totalReferralEarningUsd / 1e8;

        // 3️⃣ Return properly formatted object
        const earningsData = {
            directIncome: parseFloat(totalDirectEarningUsd / 1e10).toFixed(5),
            referralIncome: totalReferralEarningUsd.toFixed(2),
        }

        return earningsData;
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
            TccPriceUsd: parseFloat(parseFloat(TccPriceUsd) / parseFloat(1e8)).toFixed(4),


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

    },


    getTeamDashboardData: async (userAddress) => {

        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Get all referrals
            const { referrals, totalReferrals } = await contract.methods.getAllDirectReferralsWithCounts(userAddress).call();

            let activeMembers = 0;

            for (let i = 0; i < referrals.length; i++) {
                const isActive = await contract.methods.isUserRegistered(referrals[i].addr).call();
                if (isActive) {
                    activeMembers++;
                }
            }

            const inactiveMembers = Number(totalReferrals) - Number(activeMembers);

            // Calculate today's team earning
            let teamEarningTodayUsd = 0;

            // const levelROIRecords = await contract.methods.getLevelROIReceivedSummary(userAddress).call();  // ← Note: you need to add this function as discussed earlier

            // Get today's date (in your contract's SECONDS_IN_DAY scale)
            // const currentDay = Math.floor(Date.now() / 1000 / 60);  // Because your contract: SECONDS_IN_DAY = 60
            // const dayOfWeek = currentDay % 7;

            // if (dayOfWeek !== 3) { // not Sunday
            //     for (let i = 0; i < levelROIRecords.length; i++) {
            //         const record = levelROIRecords[i];
            //         if (!record.isCompleted) {
            //             teamEarningTodayUsd += parseInt(record.roiAmount);
            //         }
            //     }
            // }

            const teamDashboard = {
                totalMembers: Number(totalReferrals),
                activeMembers: Number(activeMembers),
                inactiveMembers: Number(inactiveMembers),
                dailyTeamEarnings: (teamEarningTodayUsd / 1e8).toFixed(2),
            };

            console.log(teamDashboard)

            return teamDashboard;
        } catch (error) {
            console.log(error)
        }
    },


    getWihDrawDetails: async (userAddress) => {
        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        console.log("==================> TCC_STAKING", TCC_STAKING)

        // console.log(Contract["TCC_TEST"], TCC_TEST_ABI)
        const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);
        const contract1 = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

        // Approved amount come in wei
        const userBalance = await contract.methods.balanceOf(userAddress).call();
        const TccPriceUsd = await contract1.methods.getTccPriceInUsd().call();


        const data = {
            userBalance: parseInt(web3.utils.fromWei(userBalance, "ether")).toString(),
            TccPriceUsd: parseFloat(parseFloat(TccPriceUsd) / parseFloat(1e8)).toFixed(4),



        };

        console.log(data)

        return data
    },

    getUserIndWdrDetails: async (userAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            console.log("==================> TCC_STAKING", TCC_STAKING)

            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);
            // come in Array format
            const investmentId = await contract.methods.getUserInvestmentIDs(userAddress).call();

            const invetmentData = [];

            for (let i = 0; i < investmentId.length; i++) {

                const response = await contract.methods.getNextClaimInfo(userAddress, investmentId[i]).call();
                invetmentData.push({
                    nextClaimTimestamp: response.nextClaimTimestamp,
                    secondsUntilClaim: response.secondsUntilClaim,
                    timeUntilClaim: response.timeUntilClaim,
                    currentDay: response.currentDay,
                    currentDayOfWeek: response.currentDayOfWeek.toString(),
                    canClaimNow: response.canClaimNow,
                    daysClaimed: response.daysClaimed,
                    daysRemainingInCycle: response.daysRemainingInCycle,
                    investmentId: investmentId[i],
                })

            }

            console.log(invetmentData)

            return invetmentData

        } catch (error) {
            console.log(response)
        }
    },


    claimRoiIndividual: async (userAddress, investmentId) => {
        try {

            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            console.log(investmentId)

            // Prepare transaction data
            const trxData = await contract.methods.claimRoi(investmentId).encodeABI();

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
            console.log(error)
        }
    },


    myReferral: async (userAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Get all direct referrals with level data
            const directReferralRes = await contract.methods.getAllDirectReferralsWithCounts(userAddress).call();

            // Get level wise ROI contribution
            const levelWiseROIRes = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

            // Prepare referral count for each level
            let referralCount = []; // { level: count }

            for (let i = 0; i < directReferralRes.referrals.length; i++) {
                const referralAddress = directReferralRes.referrals[i][0];
                const level = directReferralRes.referrals[i][1];
                const levelNum = parseInt(level);

                console.log(referralAddress, levelNum)

                // ✅ Initialize count if not exists
                if (!referralCount[levelNum - 1]) {
                    referralCount[levelNum - 1] = 1;
                } else {
                    referralCount[levelNum - 1]++;
                }
            }

            // Prepare final data combining both referral count and level-wise ROI
            const result = [];

            for (let i = 0; i < levelWiseROIRes.length; i++) {
                const level = levelWiseROIRes[i][0].toString();
                const contributionRaw = levelWiseROIRes[i][1].toString();

                // console.log(level, contributionRaw)


                const levelNum = parseInt(level);
                const contributionUSD = parseInt(contributionRaw) / 1e8;

                result.push({
                    level: levelNum,
                    totalReferrals: referralCount[levelNum] || 0,  // default 0 if not exist
                    dailyContribution: contributionUSD.toFixed(2)
                });
            }

            console.log("Referral Stats:", result);
            return result;

        } catch (err) {
            console.log("Referral fetch error", err);
            return [];
        }
    },



}));
