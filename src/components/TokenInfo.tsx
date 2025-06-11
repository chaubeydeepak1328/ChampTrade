import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Coins, Layers, DollarSign, Share2 } from 'lucide-react';

const TokenInfo: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="token" className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            TCC2 Token: Powering the Ecosystem
          </h2>
          <p className="text-xl text-neutral-300">
            The foundation of our decentralized economy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Coins className="w-8 h-8 text-yellow-500 mr-4" />
              <h3 className="text-2xl font-bold text-white">Token Details</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-yellow-500/10 pb-2">
                <span className="text-neutral-300">Token Name</span>
                <span className="text-white font-medium">TCC 2.0</span>
              </div>
              <div className="flex justify-between items-center border-b border-yellow-500/10 pb-2">
                <span className="text-neutral-300">Symbol</span>
                <span className="text-white font-medium">TCC2</span>
              </div>
              <div className="flex justify-between items-center border-b border-yellow-500/10 pb-2">
                <span className="text-neutral-300">Network</span>
                <span className="text-white font-medium">Binance Smart Chain (BEP-20)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-300">Total Supply</span>
                <span className="text-white font-medium">210,000,000 TCC</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Layers className="w-8 h-8 text-yellow-500 mr-4" />
              <h3 className="text-2xl font-bold text-white">Private Sale (Live Now)</h3>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-white font-medium">Tier 1</span>
                  </div>
                  <p className="text-neutral-300">$0.020 per token (5M tokens)</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-white font-medium">Tier 2</span>
                  </div>
                  <p className="text-neutral-300">$0.040 per token (8M tokens)</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-white font-medium">Tier 3</span>
                  </div>
                  <p className="text-neutral-300">$0.060 per token (10M tokens)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-center mb-4">
            <Share2 className="w-6 h-6 text-yellow-500 mr-3" />
            <h4 className="text-lg font-semibold text-white">Referral Bonuses</h4>
          </div>
          <p className="text-neutral-300">
            Earn 8% direct referral bonus and 2% upline bonus, automatically distributed through our
            smart contract system. All pricing is based on BNB/USD Chainlink feed for real-time accuracy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;