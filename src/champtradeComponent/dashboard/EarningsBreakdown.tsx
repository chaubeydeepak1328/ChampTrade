// import React from 'react';
// import { LineChart, BarChart } from 'lucide-react';

// const EarningsBreakdown: React.FC = () => {
//   return (
//     <div className="bg-[rgb(20,20,20)] p-3 px-2 rounded-xl border-2 border-yellow-500/30 hover:shadow-[0_0_20px_rgb(250,204,21,0.1)] transition-all duration-300">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-white">
//           <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
//             Earnings Breakdown
//           </span>
//         </h3>
//         <div className="flex gap-2">
//           <button className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30 transition-all">
//             <LineChart className="w-5 h-5 text-yellow-500" />
//           </button>
//           <button className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30 transition-all">
//             <BarChart className="w-5 h-5 text-yellow-500" />
//           </button>
//         </div>
//       </div>
      
//       <div className="space-y-4 px-1 sm:px-0">
//   {/* Chart Placeholder */}
//   <div className="h- sm:h-34 bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg border border-yellow-500/10 flex items-center justify-center">
//     <p className="text-gray-400 text-sm sm:text-base">Chart will be implemented here</p>
//   </div>
  
//   {/* Stats Cards - Stack on mobile */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//     <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-3 sm:p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
//       <p className="text-neutral-300 text-xs sm:text-sm mb-1">Direct Income</p>
//       <p className="text-xl sm:text-2xl font-bold text-yellow-500">$123.45</p>
//       <p className="text-xs text-yellow-500/70 mt-1">+2.5% from yesterday</p>
//     </div>
//     <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-3 sm:p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
//       <p className="text-neutral-300 text-xs sm:text-sm mb-1">Referral Income</p>
//       <p className="text-xl sm:text-2xl font-bold text-yellow-500">$678.90</p>
//       <p className="text-xs text-yellow-500/70 mt-1">+5.8% from yesterday</p>
//     </div>
//   </div>
  
//   {/* Time Period Buttons - Scrollable on mobile */}
//   <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
//     <button className="flex-shrink-0 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-xs sm:text-sm">
//       Last 7 Days
//     </button>
//     <button className="flex-shrink-0 px-3 py-1 rounded-full text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)] transition-colors text-xs sm:text-sm">
//       Last 30 Days
//     </button>
//     <button className="flex-shrink-0 px-3 py-1 rounded-full text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)] transition-colors text-xs sm:text-sm">
//       Last 90 Days
//     </button>
//     <button className="flex-shrink-0 px-3 py-1 rounded-full text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)] transition-colors text-xs sm:text-sm">
//       All Time
//     </button>
//   </div>
// </div>

// {/* Add this to your global CSS */}
// <style jsx>{`
//   .hide-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
//   .hide-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
// `}</style>
//     </div>
//   );
// };

// export default EarningsBreakdown;


import React, { useState, useEffect, useRef } from 'react';
import { LineChart, BarChart } from 'lucide-react';
import Chart from 'chart.js/auto';

const EarningsBreakdown: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [timePeriod, setTimePeriod] = useState<string>('7days');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Sample data based on time period
  const getChartData = () => {
    switch (timePeriod) {
      case '30days':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          directIncome: [320, 450, 510, 480],
          referralIncome: [280, 310, 420, 390]
        };
      case '90days':
        return {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          directIncome: [1200, 1500, 1800],
          referralIncome: [900, 1100, 1300]
        };
      case 'alltime':
        return {
          labels: ['2021', '2022', '2023', '2024'],
          directIncome: [4800, 5200, 6500, 4200],
          referralIncome: [3200, 3800, 4500, 2900]
        };
      default: // 7 days
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          directIncome: [45, 60, 75, 90, 110, 95, 80],
          referralIncome: [30, 45, 60, 75, 90, 85, 70]
        };
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const { labels, directIncome, referralIncome } = getChartData();

      chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Direct Income',
              data: directIncome,
              borderColor: 'rgba(234, 179, 8, 0.8)', // yellow-500
              backgroundColor: 'rgba(234, 179, 8, 0.2)',
              tension: 0.4,
              borderWidth: 2,
              fill: chartType === 'line'
            },
            {
              label: 'Referral Income',
              data: referralIncome,
              borderColor: 'rgba(245, 158, 11, 0.8)', // amber-500
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              tension: 0.4,
              borderWidth: 2,
              fill: chartType === 'line'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#d1d5db', // gray-300
                font: {
                  size: 12
                },
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              titleColor: '#f59e0b', // amber-500
              bodyColor: '#e5e7eb', // gray-200
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderWidth: 1,
              padding: 12,
              usePointStyle: true
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(75, 85, 99, 0.1)' // gray-600
              },
              ticks: {
                color: '#9ca3af' // gray-400
              }
            },
            y: {
              grid: {
                color: 'rgba(75, 85, 99, 0.1)' // gray-600
              },
              ticks: {
                color: '#9ca3af', // gray-400
                callback: function(value) {
                  return '$' + value;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartType, timePeriod]);

  const handleTimePeriodChange = (period: string) => {
    setTimePeriod(period);
  };

  return (
    <div className="bg-[rgb(20,20,20)] p-3 px-2 rounded-xl border-2 border-yellow-500/30 hover:shadow-[0_0_20px_rgb(250,204,21,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Earnings Breakdown
          </span>
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg transition-all ${chartType === 'line' ? 'bg-gradient-to-br from-yellow-500/30 to-amber-400/30' : 'bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30'}`}
          >
            <LineChart className="w-5 h-5 text-yellow-500" />
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-all ${chartType === 'bar' ? 'bg-gradient-to-br from-yellow-500/30 to-amber-400/30' : 'bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30'}`}
          >
            <BarChart className="w-5 h-5 text-yellow-500" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4 px-1 sm:px-0">
        {/* Chart Container */}
        <div className="h-64 sm:h-80 bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg border border-yellow-500/10 p-2">
          <canvas ref={chartRef} className="w-full h-full" />
        </div>
        
        {/* Stats Cards - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-3 sm:p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
            <p className="text-neutral-300 text-xs sm:text-sm mb-1">Direct Income</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-500">$123.45</p>
            <p className="text-xs text-yellow-500/70 mt-1">+2.5% from yesterday</p>
          </div>
          <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] p-3 sm:p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
            <p className="text-neutral-300 text-xs sm:text-sm mb-1">Referral Income</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-500">$678.90</p>
            <p className="text-xs text-yellow-500/70 mt-1">+5.8% from yesterday</p>
          </div>
        </div>
        
        {/* Time Period Buttons - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
          <button 
            onClick={() => handleTimePeriodChange('7days')}
            className={`flex-shrink-0 px-3 py-1 rounded-full transition-colors text-xs sm:text-sm ${timePeriod === '7days' ? 'bg-yellow-500/10 text-yellow-500' : 'text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)]'}`}
          >
            Last 7 Days
          </button>
          <button 
            onClick={() => handleTimePeriodChange('30days')}
            className={`flex-shrink-0 px-3 py-1 rounded-full transition-colors text-xs sm:text-sm ${timePeriod === '30days' ? 'bg-yellow-500/10 text-yellow-500' : 'text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)]'}`}
          >
            Last 30 Days
          </button>
          <button 
            onClick={() => handleTimePeriodChange('90days')}
            className={`flex-shrink-0 px-3 py-1 rounded-full transition-colors text-xs sm:text-sm ${timePeriod === '90days' ? 'bg-yellow-500/10 text-yellow-500' : 'text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)]'}`}
          >
            Last 90 Days
          </button>
          <button 
            onClick={() => handleTimePeriodChange('alltime')}
            className={`flex-shrink-0 px-3 py-1 rounded-full transition-colors text-xs sm:text-sm ${timePeriod === 'alltime' ? 'bg-yellow-500/10 text-yellow-500' : 'text-neutral-300 hover:text-white hover:bg-[rgb(30,30,30)]'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Add this to your global CSS */}
      {/* <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
      <style>{`
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>

    </div>
  );
};

export default EarningsBreakdown;