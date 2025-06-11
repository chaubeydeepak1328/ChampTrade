


// import React, { useRef, useEffect } from 'react';
// import { Users, Star, Building } from 'lucide-react';
// import { Navigate } from 'react-router-dom';

// interface UserTypeCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   benefits: string[];
//   delay: number;
//   className?: string; // Add className to props
// }
// import { useNavigate } from 'react-router-dom';

// const UserTypeCard: React.FC<UserTypeCardProps> = ({
//   icon,
//   title,
//   description,
//   benefits,
//   delay,
//   className = '',
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setTimeout(() => {
//               cardRef.current?.classList.add('opacity-100', 'translate-y-0');
//             }, delay);
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current);
//       }
//     };
//   }, [delay]);

//   return (
//     <div
//       ref={cardRef}
//       className={`bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 transition-all duration-700 opacity-0 translate-y-8 ${className}`}
//     >
//       <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
//         <div className="text-yellow-500">{icon}</div>
//       </div>
//       <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
//       <p className="text-neutral-300 mb-6">{description}</p>
//       <ul className="space-y-3">
//         {benefits.map((benefit, index) => (
//           <li key={index} className="flex items-start">
//             <span className="text-yellow-500 mr-2">•</span>
//             <span className="text-neutral-300">{benefit}</span>
//           </li>
//         ))}
//       </ul>
//       <a href='/go-dashboard' className="mt-8 w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 font-medium">
//         Join Now
//       </a>
//     </div>
//   );
// };

// const WhoCanJoin: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             sectionRef.current?.classList.add('opacity-100');
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black">
//       <div
//         ref={sectionRef}
//         className="container mx-auto px-4 md:px-6 transition-opacity duration-1000 opacity-0"
//       >
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
//             Who Can Join TCC 2.0?
//           </h2>
//           <p className="text-xl text-neutral-300">
//             Whether you're a veteran or newcomer, TCC 2.0 offers opportunities for everyone to grow and succeed.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <UserTypeCard
//             className="border-2 border-yellow-500"
//             icon={<Star size={32} />}
//             title="Legacy Users"
//             description="Continue your journey from ChampCash with exclusive benefits."
//             benefits={[
//               'Unlock your legacy bonus',
//               'Priority access to new features',
//               'Special reward multipliers',
//               'Veteran community status',
//             ]}
//             delay={100}
//           />
//           <UserTypeCard
//             icon={<Users size={32} />}
//             title="New Members"
//             description="Start your earning journey with our comprehensive platform."
//             benefits={[
//               'Easy onboarding process',
//               'Daily earning opportunities',
//               'Full access to all features',
//               'Community support',
//             ]}
//             delay={300}
//           />
//           <UserTypeCard
//             icon={<Building size={32} />}
//             title="Crypto Builders"
//             description="Scale your community with powerful tools and incentives."
//             benefits={[
//               'Advanced team building tools',
//               'Leadership development',
//               'Enhanced referral benefits',
//               'Strategic growth support',
//             ]}
//             delay={500}
//           />
//         </div>

//         <div className="mt-16 max-w-3xl mx-auto text-center">
//           <p className="text-neutral-300 mb-8">
//             Join the revolution and be part of the next generation of digital earning. TCC 2.0 welcomes everyone who's ready to embrace the future of decentralized finance and community-driven growth.
//           </p>
//           <button
//             onClick={() => navigate('/go-dashboard')}
//             className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
//           >
//             Start Your Journey Now
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhoCanJoin;

import React, { useRef, useEffect } from 'react';
import { Users, Star, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  delay: number;
  className?: string; // Add className to props
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  icon,
  title,
  description,
  benefits,
  delay,
  className = '',
}) => {
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
  const navigate = useNavigate();
  return (
    <div
      ref={cardRef}
      className={`bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8 transition-all duration-700 opacity-0 translate-y-8 ${className}`}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center mb-6">
        <div className="text-yellow-500">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-neutral-300 mb-6">{description}</p>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span className="text-neutral-300">{benefit}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/go-dashboard')} className="mt-8 w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 font-medium">
        Join Now
      </button>
    </div>
  );
};

const WhoCanJoin: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Added the useNavigate hook

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
            Who Can Join TCC 2.0?
          </h2>
          <p className="text-xl text-neutral-300">
            Whether you're a veteran or newcomer, TCC 2.0 offers opportunities for everyone to grow and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UserTypeCard
            className="border-2 border-yellow-500"
            icon={<Star size={32} />}
            title="Legacy Users"
            description="Continue your journey from ChampCash with exclusive benefits."
            benefits={[
              'Unlock your legacy bonus',
              'Priority access to new features',
              'Special reward multipliers',
              'Veteran community status',
            ]}
            delay={100}
          />
          <UserTypeCard
            icon={<Users size={32} />}
            title="New Members"
            description="Start your earning journey with our comprehensive platform."
            benefits={[
              'Easy onboarding process',
              'Daily earning opportunities',
              'Full access to all features',
              'Community support',
            ]}
            delay={300}
          />
          <UserTypeCard
            icon={<Building size={32} />}
            title="Crypto Builders"
            description="Scale your community with powerful tools and incentives."
            benefits={[
              'Advanced team building tools',
              'Leadership development',
              'Enhanced referral benefits',
              'Strategic growth support',
            ]}
            delay={500}
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-neutral-300 mb-8">
            Join the revolution and be part of the next generation of digital earning. TCC 2.0 welcomes everyone who's ready to embrace the future of decentralized finance and community-driven growth.
          </p>
          <button
            onClick={() => navigate('/go-dashboard')} // Fixed navigate issue
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
          >
            Start Your Journey Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoCanJoin;
