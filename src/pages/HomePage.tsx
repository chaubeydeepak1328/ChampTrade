import React from 'react';
import Hero from '../components/Hero';
import OurStory from '../components/OurStory';
import WhatIsTCC from '../components/WhatIsTCC';
import TokenInfo from '../components/TokenInfo';
import RealWorldUtility from '../components/RealWorldUtility';
import IncomePlan from '../components/IncomePlan';
import HowItWorks from '../components/HowItWorks';
import WhoCanJoin from '../components/WhoCanJoin';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <OurStory />
      <WhatIsTCC />
      <TokenInfo />
      <RealWorldUtility />
      <IncomePlan />
      <HowItWorks />
      <WhoCanJoin />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;