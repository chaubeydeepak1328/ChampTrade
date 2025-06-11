import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Globe, BarChart } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
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
      className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl shadow-xl p-6 transition-all duration-700 opacity-0 translate-y-8 hover:shadow-2xl hover:-translate-y-2 hover:bg-black/50"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-400/20 flex items-center justify-center mb-6">
        <div className="text-yellow-500">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-neutral-300 leading-relaxed">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
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
    <section id="services" className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
      <div
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 transition-opacity duration-1000 opacity-0"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            Powerful Technology Solutions
          </h2>
          <p className="text-xl text-neutral-300">
            Explore our comprehensive suite of innovative services designed to transform your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<ShieldCheck size={32} />}
            title="Enterprise Security"
            description="State-of-the-art security protocols ensuring your data remains protected against evolving threats."
            delay={100}
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="High Performance"
            description="Lightning-fast systems optimized for speed and efficiency, delivering results when you need them."
            delay={300}
          />
          <FeatureCard
            icon={<Globe size={32} />}
            title="Global Scalability"
            description="Seamlessly scale your operations globally with our distributed infrastructure and support."
            delay={500}
          />
          <FeatureCard
            icon={<BarChart size={32} />}
            title="Advanced Analytics"
            description="Transform raw data into actionable insights with our powerful analytics and reporting tools."
            delay={700}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;