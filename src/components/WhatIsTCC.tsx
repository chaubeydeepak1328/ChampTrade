// import React from 'react';
// import { useInView } from 'react-intersection-observer';
// import { Shield, Zap, Users, Gift, Database, Link } from 'lucide-react';

// interface FeatureProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
//   <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2">
//     <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-4">
//       {icon}
//     </div>
//     <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
//     <p className="text-neutral-300">{description}</p>
//   </div>
// );

// const WhatIsTCC: React.FC = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: true
//   });

//   const features = [
//     {
//       icon: <Shield className="w-6 h-6 text-yellow-500" />,
//       title: "Smart Contract Staking",
//       description: "Transparent, secure staking powered by audited smart contracts"
//     },
//     {
//       icon: <Zap className="w-6 h-6 text-yellow-500" />,
//       title: "Daily Earnings",
//       description: "Rewarding daily tasks that provide consistent income opportunities"
//     },
//     {
//       icon: <Users className="w-6 h-6 text-yellow-500" />,
//       title: "7-Level Referral Network",
//       description: "Powerful multi-level referral system for maximum earning potential"
//     },
//     {
//       icon: <Gift className="w-6 h-6 text-yellow-500" />,
//       title: "Legacy Bonus System",
//       description: "Special rewards for ChampCash veterans joining the revolution"
//     },
//     {
//       icon: <Database className="w-6 h-6 text-yellow-500" />,
//       title: "DeFi Integration",
//       description: "Complete integration with DeFi protocols for enhanced flexibility"
//     },
//     {
//       icon: <Link className="w-6 h-6 text-yellow-500" />,
//       title: "On-Chain Referrals",
//       description: "Chainlink-powered price feeds and transparent referral tracking"
//     }
//   ];

//   return (
//     <section id="what-is-tcc" className="py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
//       <div 
//         ref={ref}
//         className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
//           inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//       >
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
//             What is TCC 2.0?
//           </h2>
//           <p className="text-xl text-neutral-300">
//             A BEP-20 token project created for the people—by the people. Built on the Binance Smart Chain,
//             combining the best of blockchain technology with community-driven growth.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <Feature
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//             />
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <p className="text-lg text-yellow-500 font-medium">
//             Your new home for secure digital income
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatIsTCC;


import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, Users, Gift, Database, Link } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="bg-[rgb(20,20,20)] backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgb(250,204,21)]">
    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-neutral-300">{description}</p>
  </div>
);

const WhatIsTCC: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      title: "Smart Contract Staking",
      description: "Transparent, secure staking powered by audited smart contracts"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Daily Earnings",
      description: "Rewarding daily tasks that provide consistent income opportunities"
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "6-Level Referral Network",
      description: "Powerful multi-level referral system for maximum earning potential"
    },
    {
      icon: <Gift className="w-6 h-6 text-yellow-500" />,
      title: "Legacy Bonus System",
      description: "Special rewards for ChampCash veterans joining the revolution"
    },
    {
      icon: <Database className="w-6 h-6 text-yellow-500" />,
      title: "DeFi Integration",
      description: "Complete integration with DeFi protocols for enhanced flexibility"
    },
    {
      icon: <Link className="w-6 h-6 text-yellow-500" />,
      title: "On-Chain Referrals",
      description: "Chainlink-powered price feeds and transparent referral tracking"
    }
  ];

  return (
    <section id="what-is-tcc" className="py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            What is TCC 2.0?
          </h2>
          <p className="text-xl text-neutral-300">
            A BEP-20 token project created for the people—by the people. Built on the Binance Smart Chain,
            combining the best of blockchain technology with community-driven growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-yellow-500 font-medium">
            Your new home for secure digital income
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTCC;
