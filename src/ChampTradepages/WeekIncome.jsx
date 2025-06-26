import React, { useEffect, useState } from 'react';
import { ChevronDown, TrendingUp, DollarSign, Calendar, User, Hash, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useStore } from '../Store/UserStore';

// Mock data for different weeks


function WeekIncome() {
    const [selectedWeek, setSelectedWeek] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const formatWalletAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatTCC = (tccBigInt) => {
        // Convert BigInt-like string to readable format
        const num = parseFloat(tccBigInt) / Math.pow(10, 28);
        return num.toFixed(2);
    };

    const formatUSD = (usdBigInt) => {
        // Convert BigInt-like string to readable USD format
        const num = parseFloat(usdBigInt) / Math.pow(10, 18);
        return num.toFixed(2);
    };

    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };


    // =============================================================================
    // Get User All Week to current Week 
    // =============================================================================
    const userData = JSON.parse(localStorage.getItem("userData") || "null");
    const userAddress = userData?.userAddress || null;

    const [selectedWeekInfo, setSelectedWeekInfo] = useState(null);

    const [AllWeek, setWeek] = useState();


    const getUserAllWeek = useStore((state) => state.getUserAllWeek)

    useEffect(() => {
        const fetchAllInvestmentId = async () => {
            console.log(userAddress)
            const response = await getUserAllWeek(userAddress);
            setWeek(response)

            console.log(response)
        }

        if (userAddress)
            fetchAllInvestmentId();
    }, [userAddress])



    // =============================================================================
    // Get User Level Ean Week Wise
    // =============================================================================

    const [WeekEarn, SetWeekEarn] = useState([]);


    const WeekWiseEarn = useStore((state) => state.WeekWiseEarn)

    useEffect(() => {
        const fetchWeekEarnign = async () => {
            console.log(selectedWeek)
            const response = await WeekWiseEarn(userAddress, selectedWeek);

            // Flatten all dailyIncomes across all summaries
            const allPayments = response.raw
                .flatMap(summary => summary.dailyIncomes || []);

            // Sort globally by date (descending)
            const sortedPayments = allPayments.sort((a, b) => Number(b.date) - Number(a.date));

            // Replace raw with one single summary for easier rendering
            SetWeekEarn({
                ...response,
                raw: [{
                    dailyIncomes: sortedPayments
                }]
            });


            console.log(response)
        }

        if (selectedWeek)
            fetchWeekEarnign();
    }, [selectedWeek])





    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                        <Trophy className="w-6 h-6 text-gray-900" />
                    </div>
                    <h1 className="text-2xl font-bold text-yellow-500">CHAMP TRADE</h1>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Weekly Income Dashboard</h2>

                    {/* Week Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600 transition-colors"
                        >
                            <Calendar className="w-4 h-4" />
                            {/* {selectedWeek} */}


                            {selectedWeekInfo && (
                                <>
                                    <p className="block md:hidden text-sm">{`Week ${selectedWeekInfo.week}`}</p>
                                    <p className="hidden md:block">{`Week ${selectedWeekInfo.week}, ${selectedWeekInfo.date}`}</p>
                                </>
                            )}

                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 min-w-64">
                                {AllWeek?.map((week) => (
                                    <button
                                        key={`${week.week}- ${week.date}`}
                                        onClick={() => {
                                            setSelectedWeek(week.week);
                                            setSelectedWeekInfo(week);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                    >
                                        {`Week ${week.week}, ${week.date}`}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-500 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="text-lg font-semibold">Total TCC Earned</h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-400">{WeekEarn.referredTccTotal}</p>
                        <p className="text-gray-400 mt-1">TCC Tokens</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-500 p-2 rounded-lg">
                                <DollarSign className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="text-lg font-semibold">Total USD Value</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">${WeekEarn?.referredUsdTotal}</p>
                        <p className="text-gray-400 mt-1">US Dollars</p>
                    </div>
                </div>

                {/* Payment Details Table */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-semibold">Payment Details</h3>
                        <p className="text-gray-400 mt-1">Detailed breakdown of all payments for Week {selectedWeek}</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-750">
                                <tr className="text-left">
                                    <th className="px-6 py-4 font-semibold text-gray-300">Sno</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Date</th>
                                    {/* <th className="px-6 py-4 font-semibold text-gray-300">Day</th> */}
                                    <th className="px-6 py-4 font-semibold text-gray-300">Investment ID</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">From User</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Level</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">ROI TCC</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">ROI USD</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">TCC Price</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Claimed Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {WeekEarn?.raw?.length > 0 &&
                                    WeekEarn.raw.flatMap((summary, i) =>
                                        [...(summary.dailyIncomes || [])]
                                            .sort((a, b) => Number(a.date) - Number(b.date)) // 🔁 Sort by UNIX timestamp (descending)
                                            .map((payment, j) => (
                                                <tr
                                                    key={`${i}-${j}`}
                                                    className="border-t border-gray-700 hover:bg-gray-750/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {j + 1}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            {formatDate(payment.date)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Hash className="w-4 h-4 text-gray-400" />
                                                            {payment.fromInvestmentID.toString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4 text-gray-400" />
                                                            <code className="text-blue-400 text-sm">{formatWalletAddress(payment.fromUser)}</code>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm font-medium">
                                                            Level {payment.level.toString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-yellow-400 font-mono">
                                                        {formatTCC(payment.roiTcc)}
                                                    </td>
                                                    <td className="px-6 py-4 text-green-400 font-mono">
                                                        ${formatUSD(payment.roiUsd)}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                                                        {(parseFloat(payment.tccPrice) / 1e8).toFixed(4)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {payment.isClaimed ? (

                                                                <>
                                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                                    <span className="text-green-400 text-sm font-medium">Claimed</span>
                                                                </>

                                                            ) : (
                                                                <>
                                                                    <XCircle className="w-4 h-4 text-orange-400" />
                                                                    <span className="text-orange-400 text-sm font-medium">Pending</span>
                                                                </>

                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Summary Footer */}
                <div className="mt-6 text-center text-gray-400">
                    <p>
                        Showing {WeekEarn?.raw?.reduce((acc, item) => acc + (item.dailyIncomes?.length || 0), 0)} payment record{(WeekEarn?.raw?.length > 1 ? 's' : '')} for Week {selectedWeek}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeekIncome;