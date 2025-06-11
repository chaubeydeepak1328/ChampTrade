import React, { useRef, useEffect } from 'react';
import { DollarSign, Users, RefreshCw, Timer } from 'lucide-react';

const IncomePlan: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
      <div
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 transition-opacity duration-1000 opacity-0"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            TCC Income Plan
          </h2>
          <p className="text-xl text-neutral-300">
            A sustainable earning model designed for long-term growth and community rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Daily Passive Rewards */}
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Daily Passive Rewards</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Timer className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  Invest $110 in BNB and receive $0.50 worth of TCC daily
                </p>
              </li>
              <li className="flex items-start">
                <RefreshCw className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  Rewards run for 3 years (excluding Sundays) with 33.33% annual decrease
                </p>
              </li>
              <li className="flex items-start">
                <DollarSign className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  System restarts after collecting $100 worth of TCC
                </p>
              </li>
            </ul>
          </div>

          {/* Referral Income */}
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Referral Income (L1-L6)</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <DollarSign className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  Earn $0.20 worth of TCC daily per active referral across 6 levels
                </p>
              </li>
              <li className="flex items-start">
                <Timer className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  Daily cap of $1750 worth of TCC per user
                </p>
              </li>
              <li className="flex items-start">
                <RefreshCw className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-neutral-300">
                  1 TCC = $0.0445 fixed for reward distribution
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Info Box */}
        <div className="bg-yellow-500/10 rounded-xl p-6 max-w-3xl mx-auto">
          <h4 className="text-lg font-semibold text-white mb-3">
            Sustainable Growth Model
          </h4>
          <p className="text-neutral-300">
            Our income plan is designed to promote active user participation and long-term sustainability,
            rewarding both solo users and team builders. The decreasing reward structure and cycle system
            ensures platform longevity while maintaining attractive earning potential.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IncomePlan;