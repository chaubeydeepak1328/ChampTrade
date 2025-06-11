import React, { useRef, useEffect } from 'react';
import { DollarSign, Play, RefreshCw, Users, Target } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  action: string;
  outcome: string;
  delay: number;
}

const steps: Step[] = [
  {
    icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    action: "Join with $110 worth TCC",
    outcome: "Activate daily income contract",
    delay: 100
  },
  {
    icon: <Play className="w-6 h-6 text-yellow-500" />,
    action: "Start earning $0.50/day",
    outcome: "Up to 3 years, paused on Sundays",
    delay: 300
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-yellow-500" />,
    action: "Reach $100 worth TCC",
    outcome: "Cycle resets and continues",
    delay: 500
  },
  {
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    action: "Refer your network",
    outcome: "Get up to $0.20/day/member (L1–L6)",
    delay: 700
  },
  {
    icon: <Target className="w-6 h-6 text-yellow-500" />,
    action: "Hit daily cap of $1800",
    outcome: "Reinvest or hold for market value, you can by unlimited package.",
    delay: 900
  }
];

const StepCard: React.FC<Step & { index: number }> = ({ icon, action, outcome, delay, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              cardRef.current?.classList.add('opacity-100', 'translate-y-0');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative flex items-start opacity-0 translate-y-8 transition-all duration-700"
    >
      {/* Step Number */}
      <div className="absolute -left-4 -top-4 w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-400 rounded-full flex items-center justify-center text-black font-bold z-10">
        {index + 1}
      </div>
      
      {/* Card Content */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-6">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{action}</h3>
        <p className="text-neutral-300">{outcome}</p>
      </div>
      
      {/* Connector Line (except for last item) */}
      {index < steps.length - 1 && (
        <div className="absolute left-1/2 bottom-0 w-px h-8 bg-yellow-500/20 -mb-8 hidden md:block"></div>
      )}
    </div>
  );
};

const HowItWorks: React.FC = () => {
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
            How It Works
          </h2>
          <p className="text-xl text-neutral-300">
            Start your journey to financial freedom with our simple 5-step process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/go-dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
          >
            Start Your Journey Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;