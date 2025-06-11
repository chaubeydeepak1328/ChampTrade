import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;

      if (opacity >= 0) {
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(255, 215, 0, ${Math.random() * 0.1 + 0.05})`,
                transform: `scale(${Math.random() * 0.8 + 0.2})`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 md:px-6 relative z-10 transition-transform duration-300 ease-out"
      >
        <div className="text-center max-w-5xl mx-auto pt-36 md:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block transform transition-transform bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300">
              Welcome to TCC 2.0
            </span>
            <span className="block mt-4 text-2xl md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200">
              The Evolution of a Legacy,
            </span>
            <span className="block mt-2 text-2xl md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-100">
              the Birth of a Revolution
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            TCC 2.0 isn't just a project—it's a movement. Reborn from the global success of ChampCash, 
            this new chapter brings blockchain technology, community power, and financial opportunity 
            into one seamless platform.
          </p>
          
          {/* Buttons with RGB gradient and animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/go-dashboard"
              style={{
                background: 'linear-gradient(90deg, rgb(255, 215, 0), rgb(255, 193, 7), rgb(255, 174, 0))',
                color: 'rgb(0, 0, 0)',
              }}
              className="px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-yellow-400/40 animate-pulse"
            >
              Join the Revolution
            </a>
            <a
              href="/about"
              style={{
                borderColor: 'rgb(255, 215, 0)',
                color: 'rgb(255, 215, 0)',
              }}
              className="px-8 py-4 border-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center hover:bg-[rgba(255,215,0,0.1)]"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-yellow-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

