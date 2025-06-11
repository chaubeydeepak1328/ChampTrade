import React from 'react';
import { useInView } from 'react-intersection-observer';
import { History, Users, Rocket } from 'lucide-react';

const OurStory: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    // <section id="story" className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
    //   <div 
    //     ref={ref}
    //     className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
    //       inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    //     }`}
    //   >
    //     <div className="text-center max-w-3xl mx-auto mb-16">
    //       <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
    //         Our Story: From ChampCash to TCC 2.0
    //       </h2>
    //       <p className="text-xl text-neutral-300">
    //         A journey of transformation, innovation, and community empowerment
    //       </p>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
    //         <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
    //           <History className="w-8 h-8 text-yellow-500" />
    //         </div>
    //         <h3 className="text-xl font-bold mb-4 text-white">The Beginning</h3>
    //         <p className="text-neutral-300 leading-relaxed">
    //           In 2015, ChampCash took the world by storm, revolutionizing how people earned through 
    //           simple actions and powerful team networks.
    //         </p>
    //       </div>

    //       <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
    //         <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
    //           <Users className="w-8 h-8 text-yellow-500" />
    //         </div>
    //         <h3 className="text-xl font-bold mb-4 text-white">Global Impact</h3>
    //         <p className="text-neutral-300 leading-relaxed">
    //           Over 20 million people joined the mission, creating a worldwide community of earners 
    //           and leaders united by a common goal.
    //         </p>
    //       </div>

    //       <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
    //         <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
    //           <Rocket className="w-8 h-8 text-yellow-500" />
    //         </div>
    //         <h3 className="text-xl font-bold mb-4 text-white">The Evolution</h3>
    //         <p className="text-neutral-300 leading-relaxed">
    //           Now, we evolve into TCC 2.0—a decentralized powerhouse where blockchain technology 
    //           meets community power, creating unprecedented opportunities.
    //         </p>
    //       </div>
    //     </div>

    //     <div className="mt-16 text-center">
    //       <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
    //         With the passing of our founder, the torch has been passed to the core team. The mission 
    //         continues stronger than ever, now powered by blockchain, transparency, and DeFi.
    //       </p>
    //     </div>
    //   </div>
    // </section>

    <section id="story" className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
  <div 
    ref={ref}
    className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${
      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
        Our Story: From ChampCash to TCC 2.0
      </h2>
      <p className="text-xl text-neutral-300">
        A journey of transformation, innovation, and community empowerment
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-black/40 backdrop-blur-sm border border-yellow-500 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-yellow-500/40 hover:shadow-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
          <History className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">The Beginning</h3>
        <p className="text-neutral-300 leading-relaxed">
          In 2015, ChampCash took the world by storm, revolutionizing how people earned through 
          simple actions and powerful team networks.
        </p>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-yellow-500 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-yellow-500/40 hover:shadow-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
          <Users className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">Global Impact</h3>
        <p className="text-neutral-300 leading-relaxed">
          Over 20 million people joined the mission, creating a worldwide community of earners 
          and leaders united by a common goal.
        </p>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-yellow-500 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-yellow-500/40 hover:shadow-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
          <Rocket className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">The Evolution</h3>
        <p className="text-neutral-300 leading-relaxed">
          Now, we evolve into TCC 2.0—a decentralized powerhouse where blockchain technology 
          meets community power, creating unprecedented opportunities.
        </p>
      </div>
    </div>

    <div className="mt-16 text-center">
      <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
        With the passing of our founder, the torch has been passed to the core team. The mission 
        continues stronger than ever, now powered by blockchain, transparency, and DeFi.
      </p>
    </div>
  </div>
</section>

  );
};

export default OurStory;