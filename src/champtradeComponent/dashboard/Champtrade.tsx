import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';

const Champtrade: React.FC = () => {
  return (
    <div className="space-y-6 bg-[rgb(20,20,20)] rounded-xl p-6 shadow-lg border border-yellow-500/20">
      {/* Current Price */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Coins className="h-6 w-6 text-yellow-500"/>
          <h3 className="text-lg font-semibold text-white">Current Price(TCC)</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">$0.01</div>
        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span>+5.2% (24h)</span>
        </div>
          </div>
          <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Coins className="h-6 w-6 text-yellow-500"/>
          <h3 className="text-lg font-semibold text-white">Available TCC</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">$0.01</div>
        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span>+5.2% (24h)</span>
        </div>
      </div>

      {/* Quick Buy */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Trade</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
              <p className="text-sm text-gray-400 mb-1">You Pay</p>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="text-lg font-bold w-10 focus:outline-none bg-transparent text-white"
                  placeholder="0.00"
                />
                <span className="text-gray-400">BNB</span>
              </div>
            </div>
            <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
              <p className="text-sm text-gray-400 mb-1">You Receive</p>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="text-lg font-bold w-10 focus:outline-none bg-transparent text-white"
                  placeholder="0.00"
                />
                <span className="text-gray-400">TCC</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          <button className="w-md bg-yellow-500/50  border border-yellow-500/50 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors ">
         swap now
        </button>
          </div>
        </div>
      </div>

  
         
          <div className="flex justify-center items-center min-h-[200px]">
  <div 
    className="bg-yellow-500/20 border border-yellow-500/50 p-6 rounded-lg 
              hover:bg-yellow-500/10 hover:border-yellow-500/80 transition-all duration-300 
              cursor-pointer w-full max-w-md"
  >
    <h2 className="text-xl font-bold text-white mb-4">Market Info</h2>
    <div className="space-y-3">
      <div className="justify-between items-center">
        <span className="text-gray-400">$110 worth TCC</span>
       
                      </div>
    <button className="font-medium  p-3 hover:text-yellow-500 transition-colors bg-black text-white rounded-lg">
          Start Champ trade
        </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Champtrade;