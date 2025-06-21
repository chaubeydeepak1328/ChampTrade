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
        const address = Contract[contractName];
        if (!address) throw new Error(`No address found for contract: ${contractName}`);

        const response = await fetch(
            `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`
        );
        const data = await response.json();
        const result = data?.result?.[0];

        if (!result) throw new Error("No result from BscScan");

        // If it's a proxy, get implementation ABI
        let abiJson;
        if (result.Implementation) {
            const resImpl = await fetch(
                `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${result.Implementation}&apikey=${API_KEY}`
            );
            const implData = await resImpl.json();
            abiJson = implData?.result?.[0]?.ABI;
        } else {
            abiJson = result.ABI;
        }

        // 🚨 Guard clause for undefined or empty ABI
        if (!abiJson || abiJson === "undefined") {
            throw new Error("ABI not available or returned as 'undefined'");
        }

        const parsedAbi = JSON.parse(abiJson);

        return {
            abi: parsedAbi,
            contractAddress: address,
        };
    } catch (error) {
        console.error(`❌ Error fetching ABI for ${contractName}:`, error.message || error);
        return null; // Return null so your Zustand methods can handle it safely
    }
};




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
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            console.log("🔗 TCC_STAKING Contract:", TCC_STAKING);

            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // Parallel fetching
            const [userInvestments, userCompStats, levelWiseTeam] = await Promise.all([
                contract.methods.getUserInvestmentsWithDetails(userAddress).call(),
                contract.methods.getUserComprehensiveStats(userAddress).call(),
                contract.methods.getLevelWiseTeam(userAddress).call()
            ]);

            // Get current timestamp (today)
            const timestampInSeconds = Math.floor(Date.now() / 1000);

            console.log(timestampInSeconds)

            let getWeekLevelIncome = { totalRoiUsd: 0 };
            try {
                getWeekLevelIncome = await contract.methods
                    .getWeekLevelIncome(userAddress, timestampInSeconds)
                    .call();
            } catch (err) {
                console.warn("⚠️ getWeekLevelIncome call failed:", err.message);
            }

            // Safely calculate totals using BigInt
            let totalInvestedTCC = 0n;
            let totalEarningsTCC = 0n;
            let dailyIncomeUSD = 0n;

            for (const inv of userInvestments) {
                totalInvestedTCC += BigInt(inv.investedAmountInTCC || 0);
                totalEarningsTCC += BigInt(inv.totalROIReceived || 0);
                dailyIncomeUSD += BigInt(inv.dailyROIUsd || 0);
            }

            const referralCount = levelWiseTeam.reduce((acc, levelArray) => acc + levelArray.length, 0);

            const CardInfo = {
                My_PortFolio: (Number(totalInvestedTCC) / 1e8).toFixed(2),
                Total_Earnings: (Number(totalEarningsTCC) / 1e18).toFixed(2),
                Reinvest_Reserve: (Number(userCompStats.totalReinvestmentReserve || 0) / 1e8).toFixed(2),
                Daily_Income: (Number(dailyIncomeUSD) / 1e8).toFixed(2),
                Active_Referrals: referralCount,
                getWeekLevelIncome: (Number(getWeekLevelIncome.totalRoiUsd || 0) / 1e8).toFixed(2)
            };

            console.log("📊 DashboardCardInfo:", CardInfo);
            return CardInfo;

        } catch (error) {
            console.error("❌ Error in dashboardCardInfo:", error.message || error);
            return null;
        }
    },


    getMyEarningsData: async (userAddress) => {
        const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

        // 1️⃣ Get user investments
        const userInvestments = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

        // Direct earnings from level 1 (index 0)
        const totalDirectEarningUsd = Number(userInvestments[0][1]);

        // Accumulate referral earnings from level 2 onward
        let referralEarning = 0;
        for (let i = 1; i < userInvestments.length; i++) {
            referralEarning += Number(userInvestments[i][1]);
        }

        const timestampInSeconds = Math.floor(Date.now() / 1000);
        const getWeekLevel = await contract.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

        let unclaimedUsdCount = 0;
        let unclaimedTCCCount = 0;


        if (Array.isArray(getWeekLevel.dailyIncomes) && getWeekLevel.dailyIncomes.length > 0) {
            for (let i = 0; i < getWeekLevel.dailyIncomes.length; i++) {
                // Adjust based on the structure returned by the smart contract
                unclaimedUsdCount += Number(getWeekLevel.dailyIncomes[i].roiUsd || 0);
                unclaimedTCCCount += Number(getWeekLevel.dailyIncomes[i].roiTcc || 0);

            }
        }



        console.log("unclaimedUsdCount,unclaimedTCCCount", unclaimedUsdCount, unclaimedTCCCount, getWeekLevel)


        // 3️⃣ Return properly formatted object
        const earningsData = {
            directIncome: (totalDirectEarningUsd / 1e8).toFixed(5),
            referralIncome: (referralEarning / 1e8).toFixed(5),
            unclaimedAmt: parseFloat(unclaimedUsdCount / 1e18).toString(),
            unclaimedTCCCount: parseFloat(unclaimedTCCCount / 1e28).toFixed(5),
        };

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

            // Get full team levels: [[level1Refs], [level2Refs], ...]
            const levelWiseTeam = await contract.methods.getLevelWiseTeam(userAddress).call();

            // Flatten all referrals into one array
            const allTeamMembers = levelWiseTeam.flat();

            // Count active members
            let activeMembers = 0;
            for (const ref of allTeamMembers) {
                const isActive = await contract.methods.isUserRegistered(ref).call();
                if (isActive) activeMembers++;
            }

            const totalMembers = allTeamMembers.length;
            const inactiveMembers = totalMembers - activeMembers;

            // Optional: Calculate team earnings for today (placeholder logic)
            const currentDay = Math.floor(Date.now() / 86400); // 86400 = 24*60*60
            const isSunday = currentDay % 7 === 3; // Based on your contract's SUNDAY_INDEX = 3

            let teamEarningTodayUsd = 0;

            if (!isSunday) {
                // You could improve this by implementing a `getLevelROIReceivedSummary` or similar batched getter
                // Placeholder: no real earnings fetched here
                teamEarningTodayUsd = 0;
            }

            const teamDashboard = {
                totalMembers,
                activeMembers,
                inactiveMembers,
                dailyTeamEarnings: (teamEarningTodayUsd / 1e8).toFixed(2),
            };

            console.log("📊 Team Dashboard:", teamDashboard);
            return teamDashboard;
        } catch (error) {
            console.error("❌ getTeamDashboardData error:", error);
            return null;
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

        const timestampInSeconds = Math.floor(Date.now() / 1000);
        const getWeekLevelIncome = await contract1.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

        console.log(getWeekLevelIncome)



        const data = {
            userBalance: parseInt(web3.utils.fromWei(userBalance, "ether")).toString(),
            TccPriceUsd: parseFloat(parseFloat(TccPriceUsd) / parseFloat(1e8)).toFixed(4),
            ReferralTcc: (parseFloat(getWeekLevelIncome.totalRoiTcc) / 1e28).toFixed(5),
            ReferralUsd: (parseFloat(getWeekLevelIncome.totalRoiUsd) / 1e18).toFixed(5),
            dailyIncomes: getWeekLevelIncome.dailyIncomes,
        };

        console.log(data)

        return data
    },

    getUserIndWdrDetails: async (userAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // console.log("==================> TCC_STAKING", TCC_STAKING)

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
            console.log(error)
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


    // myReferral: async (userAddress) => {
    //     try {
    //         const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
    //         const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //         // Get level-wise team (2D array: [level1[], level2[], ..., level6[]])
    //         const levelWiseTeam = await contract.methods.getLevelWiseTeam(userAddress).call();

    //         // Get level-wise accumulated ROI data
    //         const levelWiseROIRes = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

    //         // Prepare referral counts for each level (index 0 = level 1)
    //         const referralCount = levelWiseTeam.map(levelArray => levelArray.length);

    //         // Build final result using ROI data
    //         const result = [];

    //         for (let i = 0; i < levelWiseROIRes.length; i++) {
    //             const levelNum = parseInt(levelWiseROIRes[i][0]); // Already from struct
    //             const contributionRaw = levelWiseROIRes[i][1];
    //             const contributionUSD = Number(contributionRaw) / 1e8;

    //             result.push({
    //                 level: levelNum,
    //                 totalReferrals: referralCount[levelNum - 1] || 0, // level 1 => index 0
    //                 dailyContribution: contributionUSD.toFixed(4),
    //                 levelWiseTeam: levelWiseTeam[i]
    //             });
    //         }

    //         console.log("✅ Referral Stats:", result);
    //         return result;

    //     } catch (err) {
    //         console.error("❌ Referral fetch error:", err);
    //         return [];
    //     }
    // },

    myReferral: async (userAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            // 1️⃣ Get the level-wise team (2D array: [level1[], level2[], ..., level6[]])
            const levelWiseTeam = await contract.methods.getLevelWiseTeam(userAddress).call();

            // 2️⃣ Get current week's income
            const timestampInSeconds = Math.floor(Date.now() / 1000);
            const getWeekLevel = await contract.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

            // 3️⃣ Prepare referral counts per level
            const referralCount = levelWiseTeam.map(levelArray => levelArray.length);

            // 4️⃣ Sum roiUsd per level (1 to 6)
            const roiByLevel = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0
            };

            if (Array.isArray(getWeekLevel.dailyIncomes)) {
                getWeekLevel.dailyIncomes.forEach((entry) => {
                    const level = Number(entry.level);
                    const roiUsd = Number(entry.roiUsd || 0);
                    if (roiByLevel[level] !== undefined) {
                        roiByLevel[level] += roiUsd;
                    }
                });
            }

            // 5️⃣ Build final result
            const result = [];

            for (let level = 1; level <= 6; level++) {
                result.push({
                    level: level,
                    totalReferrals: referralCount[level - 1] || 0,
                    dailyContribution: (roiByLevel[level] / 1e18).toFixed(4),
                    levelWiseTeam: levelWiseTeam[level - 1] || []
                });
            }

            console.log("✅ Referral Stats:", result);
            return result;

        } catch (err) {
            console.error("❌ Referral fetch error:", err);
            return [];
        }
    },




    userInvestmentWithDetails: async (userAddress) => {
        try {
            if (!userAddress) throw new Error("User address is required.");

            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);


            if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
                console.warn("TCC_STAKING ABI or address missing.");
                return [];
            }



            const investmentWithDetails = await contract.methods
                .getUserInvestmentsWithDetails(userAddress)
                .call();

            if (!Array.isArray(investmentWithDetails)) {
                console.warn("Expected array from getUserInvestmentsWithDetails, got:", investmentWithDetails);
                return [];
            }

            console.log("✅ Fetched investment details:", investmentWithDetails);
            return investmentWithDetails;
        } catch (error) {
            console.error("❌ Error in userInvestmentWithDetails:", error.message || error);
            return []; // Always return safe fallback
        }
    },


    ClaimAllReward: async (userAddress) => {
        try {
            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const trxData = contract.methods.claimLevelROI().encodeABI();
            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: TCC_STAKING.contractAddress,
                    data: trxData,
                    value: '0'
                });
            } catch (error) {
                if (
                    error?.message?.includes("No ROI records found") ||
                    error?.data?.message?.includes("No ROI records found")
                ) {
                    Swal.fire("Notice", "You have no ROI rewards to claim at this time.", "info");
                } else {
                    Swal.fire({
                        title: 'Claim Restricted!',
                        html: `
                          <div style="display: flex; flex-direction: column; align-items: center; color: #facc15;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                              <line x1="12" x2="12" y1="9" y2="13" />
                              <line x1="12" x2="12.01" y1="17" y2="17" />
                            </svg>
                            <p style="margin-top: 12px;">Claim is only available on <b>Sunday</b>.</p>
                          </div>
                        `,
                        background: '#1a1a1a',
                        confirmButtonText: 'Got it',
                        confirmButtonColor: '#facc15',
                        customClass: {
                            title: 'text-yellow-400',
                            popup: 'rounded-xl border border-yellow-500 shadow-lg',
                        }
                    });

                }
                console.error("❌ Gas estimation failed:", error);
                return null;
            }

            const tx = {
                from: userAddress,
                to: TCC_STAKING.contractAddress,
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice
            };

            return { trxData, tx };

        } catch (error) {
            console.error("❌ ClaimAllReward error:", error);
            return null;
        }
    },


    getUserById: async (userId) => {
        try {
            if (!userId) throw new Error("User ID is required.");

            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

            if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
                throw new Error("TCC_STAKING ABI or contract address missing.");
            }

            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const address = await contract.methods.getUserAddressByID(userId).call();

            return address;
        } catch (error) {
            console.error("Error in getUserById:", error);
            return null;
        }
    },



    // getUserInfo: async (userAddress) => {
    //     try {
    //         if (!userAddress) throw new Error("User userAddress is required.");

    //         const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

    //         if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
    //             throw new Error("TCC_STAKING ABI or contract address missing.");
    //         }

    //         const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //         const address = await contract.methods.users(userAddress).call();

    //         return address;
    //     } catch (error) {
    //         console.error("Error in getUserById:", error);
    //         return null;
    //     }
    // }

    getUserInfo: async (userAddresses) => {
        try {
            if (!Array.isArray(userAddresses)) {
                throw new Error("userAddresses must be an array.");
            }

            const TCC_STAKING = await fetchContractAbi("TCC_STAKING");



            const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const userDataArray = await Promise.all(
                userAddresses.map(async (address) => {
                    try {
                        const userInfo = await contract.methods.users(address).call();
                        return { address, ...userInfo };
                    } catch (err) {
                        console.error(`Failed to fetch data for address ${address}:`, err);
                        return null;
                    }
                })
            );

            // Filter out any null entries
            return userDataArray.filter(Boolean);
        } catch (error) {
            console.error("Error in getUserInfo:", error);
            return [];
        }
    },











}));
