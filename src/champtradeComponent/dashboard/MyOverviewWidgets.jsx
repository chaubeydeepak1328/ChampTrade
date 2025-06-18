import { DollarSign, Calendar, Users, RefreshCw, TrendingUp } from 'lucide-react';
import { useStore } from '../../Store/UserStore';
import { useEffect, useState } from 'react';

function MyOverviewWidgets() {

  // Retrieve user address from local storage
  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const dashboardCardInfo = useStore((state) => state.dashboardCardInfo);

  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const response = await dashboardCardInfo(userAddress);
        setCardInfo(response);
      } catch (err) {
        console.error("Failed to fetch dashboard info", err);
      } finally {
        setLoading(false);
      }
    }
    if (userAddress) {
      fetchCardInfo();
    }
  }, [userAddress, dashboardCardInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-yellow-500">
        Loading...
      </div>
    );
  }

  if (!cardInfo) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Failed to load data
      </div>
    );
  }

  const metrics = [
    {
      icon: Calendar,
      label: 'My PortFolio',
      value: cardInfo?.My_PortFolio ?? 0,
      subtext: 'Number of Investment (Sum)'
    },
    {
      icon: Calendar,
      label: 'Total Earnings',
      value: (cardInfo?.Total_Earnings ?? 0),
      subtext: 'lifetime'
    },
    {
      icon: RefreshCw,
      label: 'Reinvest Reserve',
      value: '$' + (cardInfo?.Reinvest_Reserve ?? 0),
      subtext: 'of $100'
    },
    {
      icon: DollarSign,
      label: 'Daily Income',
      value: '$' + (cardInfo?.Daily_Income ?? 0),
      subtext: 'per day'
    },
    {
      icon: Users,
      label: 'Active Referrals',
      value: cardInfo?.Active_Referrals ?? 0,
      subtext: 'total (L1-L6)'
    },
    {
      icon: TrendingUp,
      label: 'Weekly Income',
      value: (cardInfo?.getWeekLevelIncome[1] ?? 0) + '  TCC',
      subtext: '$' + (cardInfo?.getWeekLevelIncome[2] ?? 0)
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0">
      {metrics.map(({ icon: Icon, label, value, subtext }) => (
        <div
          key={label}
          className="w-full max-w-full sm:w-full bg-[rgb(20,20,20)] backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgb(250,204,21)]"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-neutral-300 text-xs sm:text-sm truncate">{label}</p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1 truncate">{value}</p>
              <p className="text-yellow-500/80 text-xs sm:text-sm mt-1 truncate">{subtext}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOverviewWidgets;
