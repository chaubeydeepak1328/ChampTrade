// import React from 'react';
// import { DollarSign, Calendar, Users, Wallet, RefreshCw, TrendingUp } from 'lucide-react';

// function MyOverviewWidgets() {
//   const metrics = [
//     {
//       icon: DollarSign,
//       label: 'Daily Income',
//       value: '$0.50',
//       subtext: 'per day'
//     },
//     {
//       icon: Calendar,
//       label: 'Total Earnings',
//       value: '$123.17',
//       subtext: 'lifetime'
//     },
//     {
//       icon: RefreshCw,
//       label: 'Reinvest Reserve',
//       value: '$66.66',
//       subtext: 'of $100'
//     },
//     {
//       icon: Calendar,
//       label: 'Days Remaining',
//       value: '163',
//       subtext: 'in cycle'
//     },
//     {
//       icon: Users,
//       label: 'Active Referrals',
//       value: '96',
//       subtext: 'total (L1-L6)'
//     },
//     {
//       icon: TrendingUp,
//       label: 'Team Income Today',
//       value: '$1,250',
//       subtext: 'of $1,800 cap'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {metrics.map(({ icon: Icon, label, value, subtext }) => (
//         <div
//           key={label}
//           className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
//         >
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">{label}</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//               <p className="text-gray-400 text-sm mt-1">{subtext}</p>
//             </div>
//             <Icon className="h-6 w-6 text-royal-blue" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyOverviewWidgets;

// import React from 'react';
// import { DollarSign, Calendar, Users, Wallet, RefreshCw, TrendingUp } from 'lucide-react';

// function MyOverviewWidgets() {
//   const metrics = [
//     {
//       icon: DollarSign,
//       label: 'Daily Income',
//       value: '$0.50',
//       subtext: 'per day'
//     },
//     {
//       icon: Calendar,
//       label: 'Total Earnings',
//       value: '$123.17',
//       subtext: 'lifetime'
//     },
//     {
//       icon: RefreshCw,
//       label: 'Reinvest Reserve',
//       value: '$66.66',
//       subtext: 'of $100'
//     },
//     {
//       icon: Calendar,
//       label: 'Days Remaining',
//       value: '163',
//       subtext: 'in cycle'
//     },
//     {
//       icon: Users,
//       label: 'Active Referrals',
//       value: '96',
//       subtext: 'total (L1-L6)'
//     },
//     {
//       icon: TrendingUp,
//       label: 'Team Income Today',
//       value: '$1,250',
//       subtext: 'of $1,800 cap'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6  sm:px-0">
//     {metrics.map(({ icon: Icon, label, value, subtext }) => (
//       <div
//         key={label}
//         className="w-full max-w-full sm:w-full bg-[rgb(20,20,20)] backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgb(250,204,21)]"
//       >
//         <div className="flex items-start justify-between">
//           <div className="flex-1 min-w-0">
//             <p className="text-neutral-300 text-xs sm:text-sm truncate">{label}</p>
//             <p className="text-xl sm:text-2xl font-bold text-white mt-1 truncate">{value}</p>
//             <p className="text-yellow-500/80 text-xs sm:text-sm mt-1 truncate">{subtext}</p>
//           </div>
//           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
//             <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
//   );
// }

// export default MyOverviewWidgets;




import { DollarSign, Calendar, Users, RefreshCw, TrendingUp } from 'lucide-react';

function MyOverviewWidgets() {
  const metrics = [
    {
      icon: DollarSign,
      label: 'Daily Income',
      value: '$0.50',
      subtext: 'per day'
    },
    {
      icon: Calendar,
      label: 'Total Earnings',
      value: '$123.17',
      subtext: 'lifetime'
    },
    {
      icon: RefreshCw,
      label: 'Reinvest Reserve',
      value: '$66.66',
      subtext: 'of $100'
    },
    {
      icon: Calendar,
      label: 'Days Remaining',
      value: '163',
      subtext: 'in cycle'
    },
    {
      icon: Users,
      label: 'Active Referrals',
      value: '96',
      subtext: 'total (L1-L6)'
    },
    {
      icon: TrendingUp,
      label: 'Team Income Today',
      value: '$1,250',
      subtext: 'of $1,800 cap'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6  sm:px-0">
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