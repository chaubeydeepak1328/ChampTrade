import React from 'react';
import { Coins, TrendingUp, ExternalLink } from 'lucide-react';

const BuyTccPanel = () => {
  return (
    <div className="space-y-6 bg-[rgb(20,20,20)] rounded-xl p-6 shadow-lg border border-yellow-500/20">
      {/* Current Price */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <div className="flex items-center gap-3 mb-4">
          <Coins className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Current Price</h3>
        </div>
        <div className="text-3xl font-bold text-yellow-500 mb-2">$0.01</div>
        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span>+5.2% (24h)</span>
        </div>
      </div>

      {/* Quick Buy */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Buy</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
              <p className="text-sm text-gray-400 mb-1">You Pay</p>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="text-lg font-bold w-full focus:outline-none bg-transparent text-white"
                  placeholder="0.00"
                />
                <span className="text-gray-400">TCC</span>
              </div>
            </div>
            <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
              <p className="text-sm text-gray-400 mb-1">You Receive</p>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="text-lg font-bold w-full focus:outline-none bg-transparent text-white"
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

      {/* Buy Options */}
      <div className="space-y-3">
        <a target='_blank' href='https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xAd771bac597eFac136929195985577Da0C40e557' className="w-full bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors border border-yellow-500 flex items-center justify-center gap-2">
          Buy on PancakeSwap
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Market Info */}
      {/* <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Market Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="font-medium text-white">$1,234,567</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24h Volume</span>
            <span className="font-medium text-white">$123,456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Circulating Supply</span>
            <span className="font-medium text-white">123.4M TCC</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BuyTccPanel;