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


function getWeekNumberFromStartDay(startDay) {
    const startDayNumber = Number(startDay);
    if (isNaN(startDayNumber) || startDayNumber <= 0) return 1;

    const currentDay = Math.floor(Date.now() / 1000 / 86400); // today's day count since epoch

    // Find the Monday after or on the start day
    const startWeekday = new Date(startDayNumber * 86400 * 1000).getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilNextMonday = (8 - startWeekday) % 7;
    const firstMonday = startDayNumber + daysUntilNextMonday;

    // If today is before the first Monday after investment, it's week 1
    if (currentDay < firstMonday) return 1;

    // Every Monday after that is a new week
    const weeksPassed = Math.floor((currentDay - firstMonday) / 7);
    return weeksPassed + 2; // +1 for 0-indexed, +1 to include week of first Monday
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
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // console.log("🔗 TCC_STAKING Contract:", TCC_STAKING);

            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            // Parallel fetching
            const [userInvestments, levelWiseTeam] = await Promise.all([
                contract.methods.getUserInvestmentsWithDetails(userAddress).call(),
                contract.methods.getLevelWiseTeam(userAddress).call()
            ]);

            // Get current timestamp (today)
            const timestampInSeconds = Math.floor(Date.now() / 1000);

            console.log(timestampInSeconds)

            // let getWeekLevelIncome = { totalRoiUsd: 0 };
            // try {
            //     getWeekLevelIncome = await contract.methods
            //         .getWeekLevelIncome(userAddress, timestampInSeconds)
            //         .call();
            // } catch (err) {
            //     console.warn("⚠️ getWeekLevelIncome call failed:", err.message);
            // }

            // Safely calculate totals using BigInt
            let totalInvestedTCC = 0n;
            let totalEarningsTCC = 0n;
            let dailyIncomeUSD = 0n;
            let Reinvest_Reserve = 0n;


            for (const inv of userInvestments) {
                totalInvestedTCC += BigInt(inv.investedAmountInTCC || 0);
                totalEarningsTCC += BigInt(inv.totalROIReceived || 0);
                Reinvest_Reserve += BigInt(inv.dailyReinvestmentReserve || 0);
                dailyIncomeUSD += BigInt(inv.dailyROIUsd || 0);
            }

            const referralCount = levelWiseTeam.reduce((acc, levelArray) => acc + levelArray.length, 0);

            const CardInfo = {
                My_PortFolio: (Number(totalInvestedTCC) / 1e8).toFixed(2),
                Total_Earnings: (Number(totalEarningsTCC) / 1e18).toFixed(2),
                Reinvest_Reserve: (Number(Reinvest_Reserve) / 1e8).toFixed(2),
                Daily_Income: (Number(dailyIncomeUSD) / 1e8).toFixed(2),
                Active_Referrals: referralCount,
                // getWeekLevelIncome: (Number(getWeekLevelIncome.totalRoiUsd || 0) / 1e8).toFixed(2)
            };

            console.log("📊 DashboardCardInfo:", CardInfo);
            return CardInfo;

        } catch (error) {
            console.error("❌ Error in dashboardCardInfo:", error.message || error);
            return null;
        }
    },


    // getMyEarningsData: async (userAddress) => {
    //     const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
    //     const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //     // 1️⃣ Get user investments
    //     const userInvestments = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

    //     // Direct earnings from level 1 (index 0)
    //     const totalDirectEarningUsd = Number(userInvestments[0][1]);

    //     // Accumulate referral earnings from level 2 onward
    //     let referralEarning = 0;
    //     for (let i = 1; i < userInvestments.length; i++) {
    //         referralEarning += Number(userInvestments[i][1]);
    //     }

    //     const timestampInSeconds = Math.floor(Date.now() / 1000);
    //     const getWeekLevel = await contract.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

    //     let unclaimedUsdCount = 0;
    //     let unclaimedTCCCount = 0;


    //     if (Array.isArray(getWeekLevel.dailyIncomes) && getWeekLevel.dailyIncomes.length > 0) {
    //         for (let i = 0; i < getWeekLevel.dailyIncomes.length; i++) {
    //             // Adjust based on the structure returned by the smart contract
    //             unclaimedUsdCount += Number(getWeekLevel.dailyIncomes[i].roiUsd || 0);
    //             unclaimedTCCCount += Number(getWeekLevel.dailyIncomes[i].roiTcc || 0);

    //         }
    //     }



    //     console.log("unclaimedUsdCount,unclaimedTCCCount", unclaimedUsdCount, unclaimedTCCCount, getWeekLevel)


    //     // 3️⃣ Return properly formatted object
    //     const earningsData = {
    //         directIncome: (totalDirectEarningUsd / 1e8).toFixed(5),
    //         referralIncome: (referralEarning / 1e8).toFixed(5),
    //         unclaimedAmt: parseFloat(unclaimedUsdCount / 1e18).toString(),
    //         unclaimedTCCCount: parseFloat(unclaimedTCCCount / 1e28).toFixed(5),
    //     };

    //     return earningsData;
    // },


    getMyEarningsData: async (userAddress) => {
        try {
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            // 📌 Fetch level-wise accumulated ROI
            const levelRoiData = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

            console.log("📊 Level ROI:", levelRoiData);

            // 📌 Direct income (level 1 ROI) in USD (8 decimals)
            const totalDirectEarningUsd = Number(levelRoiData?.[0]?.[1] || 0);

            // 📌 Referral income from levels 2–6
            const totalReferralEarningUsd = levelRoiData.slice(1).reduce((acc, level) => {
                return acc + Number(level?.[1] || 0);
            }, 0);

            // 📦 Final formatted object
            return {
                directIncome: (totalDirectEarningUsd / 1e8).toFixed(5),
                referralIncome: (totalReferralEarningUsd / 1e8).toFixed(2),
                unclaimedAmt: "Coming Soon",
                unclaimedTCCCount: "",
            };

        } catch (error) {
            console.error("❌ Error in getMyEarningsData:", error.message || error);
            return {
                directIncome: "0.00000",
                referralIncome: "0.00",
                unclaimedAmt: "Coming Soon",
                unclaimedTCCCount: "",
            };
        }
    },



    getUserAllowance: async (userAddress) => {


        // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        // console.log("==================> TCC_STAKING", TCC_STAKING)


        // console.log(Contract["TCC_TEST"], TCC_TEST_ABI)
        const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);


        // const contract1 = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);
        const contract1 = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);


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

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

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
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const TCC_STAKING = {
                contractAddress: Contract["TCC_STAKING"]
            }

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
                    to: Contract["TCC_STAKING"], // ✅ Corrected here
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
                to: Contract["TCC_STAKING"],  // ✅ Corrected here
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
        // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
        // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

        const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);
        const directSponsor = await contract.methods.getDirectSponsor(userAddress).call();

        return {
            userAddress,
            directSponsor
        }

    },


    getTeamDashboardData: async (userAddress) => {
        try {
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

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



    // getWihDrawDetails: async (userAddress) => {
    //     const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
    //     console.log("==================> TCC_STAKING", TCC_STAKING)

    //     // console.log(Contract["TCC_TEST"], TCC_TEST_ABI)
    //     const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);
    //     const contract1 = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //     // Approved amount come in wei
    //     const userBalance = await contract.methods.balanceOf(userAddress).call();
    //     const TccPriceUsd = await contract1.methods.getTccPriceInUsd().call();

    //     const timestampInSeconds = Math.floor(Date.now() / 1000);
    //     const getWeekLevelIncome = await contract1.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

    //     console.log(getWeekLevelIncome)



    //     const data = {
    //         userBalance: parseInt(web3.utils.fromWei(userBalance, "ether")).toString(),
    //         TccPriceUsd: parseFloat(parseFloat(TccPriceUsd) / parseFloat(1e8)).toFixed(4),
    //         ReferralTcc: (parseFloat(getWeekLevelIncome.totalRoiTcc) / 1e28).toFixed(5),
    //         ReferralUsd: (parseFloat(getWeekLevelIncome.totalRoiUsd) / 1e18).toFixed(5),
    //         dailyIncomes: getWeekLevelIncome.dailyIncomes,
    //     };

    //     console.log(data)

    //     return data
    // },


    getWihDrawDetails: async (userAddress) => {
        try {
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract1 = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);
            const contract1 = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const contract = new web3.eth.Contract(TCC_TEST_ABI, Contract["TCC_TEST"]);

            // Get LevelWiseRefferal
            const levelWiseTeam = await contract1.methods.getLevelWiseTeam(userAddress).call();
            const referralCount = levelWiseTeam.reduce((acc, levelArray) => acc + levelArray.length, 0);


            // Get user token balance
            const userBalance = await contract.methods.balanceOf(userAddress).call();

            // Get current TCC price (returned in 8 decimals)
            const rawTccPriceUsd = await contract1.methods.getTccPriceInUsd().call();
            const tccPriceUsd = Number(rawTccPriceUsd) / 1e8;


            // 📌 4. Get start day (for optional display)
            const investments = await contract1.methods.getUserInvestmentsWithDetails(userAddress).call();
            let startDay = investments?.[0]?.startDay || 0;

            const startTimestamp = parseFloat(startDay) * 86400 * 1000;

            console.log("startTimestamp", startTimestamp);


            let startDate = startDay ? new Date(Number(startDay) * 86400 * 1000).toLocaleString() : "N/A";

            // 📌 5. Calculate current week number (0-based, +1 for 1-indexed)
            const currentDay = Math.floor(Date.now() / 1000 / 86400);
            // const weekNumber = Math.floor(currentDay / 7) + 1;

            const daysSinceStart = currentDay - Number(startDay);
            // const weekNumber = daysSinceStart > 0 ? Math.floor(daysSinceStart / 7) + 1 : 1;

            const weekNumber = getWeekNumberFromStartDay(startDay)

            console.log("weekNumber", weekNumber)

            // 📌 6. Get this week's level income
            // 📌 6. Get this week's level income with pagination
            const pageSize = 50;
            let pageNumber = 1;
            let totalPages = 1;
            let allWeekIncomeData = [];

            try {
                const firstPage = await contract1.methods.getWeekLevelIncome(userAddress, weekNumber, pageSize, pageNumber).call();
                totalPages = Number(firstPage.totalPages);

                // Ensure summary is array-like before pushing
                if (Array.isArray(firstPage.summary)) {
                    allWeekIncomeData = allWeekIncomeData.concat(firstPage.summary);
                } else {
                    allWeekIncomeData.push(firstPage.summary); // push the single tuple object
                }

                for (let i = 2; i <= totalPages; i++) {
                    const page = await contract1.methods.getWeekLevelIncome(userAddress, weekNumber, pageSize, i).call();

                    if (Array.isArray(page.summary)) {
                        allWeekIncomeData = allWeekIncomeData.concat(page.summary);
                    } else {
                        allWeekIncomeData.push(page.summary);
                    }
                }

                console.log("✅ All week income data:", allWeekIncomeData);
            } catch (error) {
                console.error("❌ Error fetching paginated week income:", error.message || error);
            }


            const referredUsd = allWeekIncomeData[0].dailyIncomes.reduce(
                (acc, item) => acc + Number(item.roiUsd),
                0
            );

            const referredTcc = allWeekIncomeData[0].dailyIncomes.reduce(
                (acc, item) => acc + Number(item.roiTcc),
                0
            );


            console.log("referredUsd, referredTcc", referredUsd, referredTcc)
            // levelWiseTeam.reduce((acc, levelArray) => acc + levelArray.length, 0);


            const referredUsd1 = allWeekIncomeData.reduce(
                (acc, item) => acc + Number(item.totalRoiUsd),
                0
            );

            const referredTcc2 = allWeekIncomeData.reduce(
                (acc, item) => acc + Number(item.totalRoiTcc),
                0
            );

            console.log("referredUsd1, referredTcc2", referredUsd1 / 1e18, referredTcc2 / 1e28)

            const data = {
                userBalance: parseFloat(web3.utils.fromWei(userBalance, "ether")).toFixed(4),
                TccPriceUsd: tccPriceUsd.toFixed(4),
                ReferralUsd: parseFloat(Number(referredUsd1) / 1e18).toFixed(4),
                ReferralTcc: parseFloat(Number(referredTcc2) / 1e28).toFixed(4),
                referralCount,
            };

            console.log("✅ getWihDrawDetails result:", data);
            return data;

        } catch (error) {
            console.error("❌ getWihDrawDetails error:", error.message || error);
            return {
                userBalance: "0",
                TccPriceUsd: "0.0000",
                ReferralTcc: "0.00000",
                ReferralUsd: "0.00000",
                referralCount: 0,
            };
        }
    },

    getUserIndWdrDetails: async (userAddress) => {
        try {
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // console.log("==================> TCC_STAKING", TCC_STAKING)

            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);
            // come in Array format
            const investmentId = await contract.methods.getUserInvestmentIDs(userAddress).call();



            const investments = await contract.methods.getUserInvestmentsWithDetails(userAddress).call();
            // let startDay = investments?.[0]?.startDay || 0;
            // const startTimestamp = parseFloat(startDay) * 86400 * 1000;

            const startDay = Number(investments[0]?.startDay); // UNIX day (not ms)
            const currentWeek = getWeekNumberFromStartDay(startDay);

            console.log("currentWeek", currentWeek, startDay)


            const invetmentData = [];
            const claimInvestment = [];

            for (let i = 0; i < investmentId.length; i++) {

                const [response, claimHistory, weeklyRoi] = await Promise.all([
                    contract.methods.getNextClaimInfo(userAddress, investmentId[i]).call(),
                    contract.methods.getClaimHistory(userAddress, investmentId[i]).call(),
                    contract.methods.getInvestmentWeekROI(userAddress, investmentId[i], currentWeek).call()
                ]);
                console.log("weeklyRoi", weeklyRoi)


                claimInvestment.push(claimHistory)

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
                    claimHistory: claimHistory,
                    UnClaimedWeekRoi: {
                        totalClaimedAmount: weeklyRoi.totalClaimedAmount,
                        totalUnclaimedAmount: weeklyRoi.totalUnclaimedAmount,
                        unclaimedDays: weeklyRoi.unclaimedDays
                    }
                })

            }

            console.log(invetmentData,
                claimInvestment)

            return {
                invetmentData: invetmentData,
                claimInvestment: claimInvestment
            }

        } catch (error) {
            console.log(error)
        }
    },


    claimRoiIndividual: async (userAddress, investmentId) => {
        try {

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);


            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

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
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);


            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const levelWiseTeam = await contract.methods.getLevelWiseTeam(userAddress).call();
            const levelWiseROIRes = await contract.methods.getLevelWiseAccumulatedRoi(userAddress).call();

            const result = [];

            // Use MAX_LEVELS = 6; assumed from contract context
            const MAX_LEVELS = 6;

            for (let i = 0; i < MAX_LEVELS; i++) {
                const team = levelWiseTeam[i] || [];
                const roiData = levelWiseROIRes.find(lvl => parseInt(lvl.level) === i + 1 || parseInt(lvl[0]) === i + 1);

                const contributionRaw = roiData ? roiData[1] : "0"; // fallback to 0 if missing
                const contributionUSD = Number(contributionRaw) / 1e8;

                result.push({
                    level: i + 1,
                    totalReferrals: team.length,
                    dailyContribution: contributionUSD.toFixed(4),
                    levelWiseTeam: team,
                });
            }

            console.log("✅ Referral Stats:", result);
            return result;

        } catch (err) {
            console.error("❌ Referral fetch error:", err);
            return [];
        }
    },


    // myReferral: async (userAddress) => {
    //     try {
    //         const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
    //         const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //         // 1️⃣ Get the level-wise team (2D array: [level1[], level2[], ..., level6[]])
    //         const levelWiseTeam = await contract.methods.getLevelWiseTeam(userAddress).call();

    //         // 2️⃣ Get current week's income
    //         const timestampInSeconds = Math.floor(Date.now() / 1000);
    //         const getWeekLevel = await contract.methods.getWeekLevelIncome(userAddress, timestampInSeconds).call();

    //         // 3️⃣ Prepare referral counts per level
    //         const referralCount = levelWiseTeam.map(levelArray => levelArray.length);

    //         // 4️⃣ Sum roiUsd per level (1 to 6)
    //         const roiByLevel = {
    //             1: 0,
    //             2: 0,
    //             3: 0,
    //             4: 0,
    //             5: 0,
    //             6: 0
    //         };

    //         if (Array.isArray(getWeekLevel.dailyIncomes)) {
    //             getWeekLevel.dailyIncomes.forEach((entry) => {
    //                 const level = Number(entry.level);
    //                 const roiUsd = Number(entry.roiUsd || 0);
    //                 if (roiByLevel[level] !== undefined) {
    //                     roiByLevel[level] += roiUsd;
    //                 }
    //             });
    //         }

    //         // 5️⃣ Build final result
    //         const result = [];

    //         for (let level = 1; level <= 6; level++) {
    //             result.push({
    //                 level: level,
    //                 totalReferrals: referralCount[level - 1] || 0,
    //                 dailyContribution: (roiByLevel[level] / 1e18).toFixed(4),
    //                 levelWiseTeam: levelWiseTeam[level - 1] || []
    //             });
    //         }

    //         console.log("✅ Referral Stats:", result);
    //         return result;

    //     } catch (err) {
    //         console.error("❌ Referral fetch error:", err);
    //         return [];
    //     }
    // },




    userInvestmentWithDetails: async (userAddress) => {
        try {
            if (!userAddress) throw new Error("User address is required.");

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);


            // if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
            //     console.warn("TCC_STAKING ABI or address missing.");
            //     return [];
            // }



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
            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const trxData = contract.methods.claimLevelROI().encodeABI();
            const gasPrice = await web3.eth.getGasPrice();

           
            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: Contract["TCC_STAKING"],
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
                            <p style="margin-top: 12px;">SomeThingWent Wrong .</p>
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
                to: Contract["TCC_STAKING"],
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice
            };

            return tx;

        } catch (error) {
            console.error("❌ ClaimAllReward error:", error);
            return null;
        }
    },


    getUserById: async (userId) => {
        try {
            if (!userId) throw new Error("User ID is required.");

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");s

            // if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
            //     throw new Error("TCC_STAKING ABI or contract address missing.");
            // }

            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

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

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");



            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

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


    LevelClaiWithrawHistory: async (userAddress) => {
        try {


            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");



            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const claimHist = await contract.methods.getLevelClaimHistory(userAddress).call();

            return claimHist


        } catch (error) {
            console.error("Error in getUserInfo:", error);
            return [];
        }
    },



    // getUserAllWeek: async (userAddress) => {
    //     try {
    //         if (!userAddress) throw new Error("No userAddress provided");

    //         const TCC_STAKING = await fetchContractAbi("TCC_STAKING");

    //         if (!TCC_STAKING?.abi || !TCC_STAKING?.contractAddress) {
    //             throw new Error("Contract ABI or address missing");
    //         }

    //         const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

    //         const investments = await contract.methods.getUserInvestmentsWithDetails(userAddress).call();
    //         const startDay = Number(investments?.[0]?.startDay || 0);

    //         if (startDay <= 0) return [];

    //         const weekNumber = getWeekNumberFromStartDay(startDay);
    //         const weekArray = [];

    //         for (let i = 0; i < weekNumber; i++) {
    //             const startDate = new Date((startDay + i * 7) * 86400 * 1000);
    //             const endDate = new Date((startDay + (i + 1) * 7 - 1) * 86400 * 1000); // inclusive 7th day

    //             const formatDate = (date) =>
    //                 `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;

    //             const year = startDate.getFullYear();
    //             const dateRange = `${formatDate(startDate)}–${formatDate(endDate)}, ${year}`;

    //             weekArray.push({
    //                 week: i + 1,
    //                 date: dateRange,
    //             });
    //         }

    //         console.log("📅 All Weeks:", weekArray);
    //         return weekArray;
    //     } catch (error) {
    //         console.error("❌ Error in getUserAllWeek:", error.message || error);
    //         return [];
    //     }
    // },

    getUserAllWeek: async (userAddress) => {
        try {
            if (!userAddress) throw new Error("No userAddress provided");

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);


            const investments = await contract.methods.getUserInvestmentsWithDetails(userAddress).call();
            const rawStartDay = Number(investments?.[0]?.startDay || 0); // UNIX day count

            if (rawStartDay <= 0) return [];

            // Registration date and weekday
            const regDate = new Date(rawStartDay * 86400 * 1000);
            const regWeekday = regDate.getUTCDay(); // 0 = Sunday ... 6 = Saturday

            const daysUntilNextMonday = (8 - regWeekday) % 7;
            const firstMondayDay = rawStartDay + daysUntilNextMonday;

            const todayUnixDay = Math.floor(Date.now() / 86400 / 1000);

            // ⛳ Use ceil to include partial ongoing week
            const totalFullWeeks = Math.ceil((todayUnixDay - firstMondayDay + 1) / 7);

            const formatDate = (date) =>
                `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;

            const weekArray = [];

            // Week 1 — from registration to the Sunday before first Monday
            const endOfFirstWeek = new Date((firstMondayDay - 1) * 86400 * 1000);
            const firstRange = `${formatDate(regDate)}–${formatDate(endOfFirstWeek)}, ${regDate.getFullYear()}`;
            weekArray.push({ week: 1, date: firstRange });

            // Weeks 2+ — full weeks from each Monday
            for (let i = 0; i < totalFullWeeks; i++) {
                const startDate = new Date((firstMondayDay + i * 7) * 86400 * 1000);
                const endDate = new Date((firstMondayDay + i * 7 + 6) * 86400 * 1000);

                const range = `${formatDate(startDate)}–${formatDate(endDate)}, ${startDate.getFullYear()}`;
                weekArray.push({
                    week: i + 2, // Week 2 onward
                    date: range
                });
            }

            console.log("📅 All Weeks:", weekArray);
            return weekArray;
        } catch (error) {
            console.error("❌ Error in getUserAllWeek:", error.message || error);
            return [];
        }
    },

    WeekWiseEarn: async (userAddress, weekNumber) => {

        console.log(userAddress, weekNumber)
        const pageSize = 50;
        let pageNumber = 1;
        let totalPages = 1;
        let allWeekIncomeData = [];

        try {
            if (!userAddress || !weekNumber) throw new Error("Missing userAddress or weekNumber");

            // const TCC_STAKING = await fetchContractAbi("TCC_STAKING");
            // const contract = new web3.eth.Contract(TCC_STAKING.abi, TCC_STAKING.contractAddress);

            const contract = new web3.eth.Contract(CONTRACT_ABI, Contract["TCC_STAKING"]);

            const firstPage = await contract.methods
                .getWeekLevelIncome(userAddress, weekNumber, pageSize, pageNumber)
                .call();

            console.log("first Pages", firstPage)

            totalPages = Number(firstPage.totalPages || 1);

            if (Array.isArray(firstPage.summary)) {
                allWeekIncomeData.push(...firstPage.summary);
            } else if (firstPage.summary) {
                allWeekIncomeData.push(firstPage.summary);
            }

            for (let i = 2; i <= totalPages; i++) {
                const page = await contract.methods
                    .getWeekLevelIncome(userAddress, weekNumber, pageSize, i)
                    .call();

                if (Array.isArray(page.summary)) {
                    allWeekIncomeData.push(...page.summary);
                } else if (page.summary) {
                    allWeekIncomeData.push(page.summary);
                }
            }

            console.log("✅ All week income data:", allWeekIncomeData);
        } catch (error) {
            console.error("❌ Error fetching paginated week income:", error.message || error);
            return {
                referredUsd: "0.0000",
                referredTcc: "0.00000",
                referredUsdTotal: "0.0000",
                referredTccTotal: "0.00000",
                raw: []
            };
        }

        let referredUsd = 0;
        let referredTcc = 0;

        if (allWeekIncomeData.length > 0 && Array.isArray(allWeekIncomeData[0]?.dailyIncomes)) {
            referredUsd = allWeekIncomeData[0].dailyIncomes.reduce(
                (acc, item) => acc + Number(item.roiUsd || 0),
                0
            );
            referredTcc = allWeekIncomeData[0].dailyIncomes.reduce(
                (acc, item) => acc + Number(item.roiTcc || 0),
                0
            );
        }

        const referredUsdTotal = allWeekIncomeData.reduce(
            (acc, item) => acc + Number(item.totalRoiUsd || 0),
            0
        );
        const referredTccTotal = allWeekIncomeData.reduce(
            (acc, item) => acc + Number(item.totalRoiTcc || 0),
            0
        );

        console.log("🧮 referredUsd, referredTcc", referredUsd, referredTcc);
        console.log("🧮 referredUsdTotal, referredTccTotal", referredUsdTotal, referredTccTotal);

        return {
            referredUsd: (referredUsd / 1e18).toFixed(4),
            referredTcc: (referredTcc / 1e28).toFixed(5),
            referredUsdTotal: (referredUsdTotal / 1e18).toFixed(4),
            referredTccTotal: (referredTccTotal / 1e28).toFixed(5),
            raw: allWeekIncomeData
        };
    }












}));
