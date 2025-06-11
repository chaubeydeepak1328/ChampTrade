// import React from 'react';
// import {
//   Shield,
//   Coins,
//   DollarSign,
//   Users,
//   ShoppingCart,
//   Zap,
//   Globe,
// } from 'lucide-react';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import tcc2 from '../images/tcc2.png'
// import { Navigate } from 'react-router-dom';
// const ServicesPage: React.FC = () => {
  
//   const services = [
//     {
//       icon: <Coins className="w-8 h-8 text-yellow-400" />,
//       title: "Token Presale & Tiered Investment",
//       description: "Get early access to TCC tokens at preferential rates through our tiered investment system.",
//       features: [
//         "Join the presale and get early access at discounted rates",
//         "Three pricing tiers ensure fair opportunity and incentive",
//       ],
//     },
//     {
//       icon: <Shield className="w-8 h-8 text-yellow-400" />,
//       title: "Smart Staking Contracts",
//       description: "Secure and transparent staking solutions for long-term value creation.",
//       features: [
//         "Stake TCC tokens and earn daily rewards based on lock duration",
//         "Transparent smart contracts audited and viewable by the public",
//       ],
//     },
//     {
//       icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
//       title: "Daily Income Program",
//       description: "Consistent daily rewards through our innovative $110 Plan.",
//       features: [
//         "Fixed reward of $0.50/day up to 3 years",
//         "Loop-based reward system for continuous passive income",
//         "Fully autonomous payout model (excluding Sundays)",
//       ],
//     },
//     {
//       icon: <Users className="w-8 h-8 text-yellow-400" />,
//       title: "Referral Income Engine",
//       description: "Build and grow your network while earning substantial rewards.",
//       features: [
//         "Earn $0.20/day per team member from Level 1 to Level 6",
//         "Up to $1750/day reward cap",
//         "Real-time dashboard tracking and ranking",
//       ],
//     },
//     {
//       icon: <ShoppingCart className="w-8 h-8 text-yellow-400" />,
//       title: "Real-World Use Cases",
//       description: "Utilize TCC tokens across various platforms and services.",
//       features: [
//         "Shop using TCC on e-commerce platforms",
//         "Swap TCC on PancakeSwap and other DEXs",
//         "Future merchant and in-game utility integrations",
//       ],
//     },
//     {
//       icon: <Zap className="w-8 h-8 text-yellow-400" />,
//       title: "Token Utility Expansion",
//       description: "Growing ecosystem of token utilities and governance features.",
//       features: [
//         "Platform features, access rights, content unlocking, and more",
//         "NFT badges and voting rights for governance in later phases",
//       ],
//     },
//     {
//       icon: <Globe className="w-8 h-8 text-yellow-400" />,
//       title: "Community & Learning",
//       description: "Comprehensive support and education for all members.",
//       features: [
//         "Telegram channels, webinars, and mentorship for every user",
//         "Tutorials, guides, and weekly updates for complete transparency",
//       ],
//     },
//   ];

//   const testimonials = [
//     {
//       name: "John Doe",
//       position: "CEO, XYZ Corp",
//       image: "https://randomuser.me/api/portraits/men/1.jpg",
//       feedback:
//         "This platform has transformed the way we manage and grow our digital assets. I highly recommend it for anyone looking to secure their financial future.",
//     },
//     {
//       name: "Jane Smith",
//       position: "Founder, ABC Ltd",
//       image: "https://randomuser.me/api/portraits/women/1.jpg",
//       feedback:
//         "An incredible service with fantastic support. The rewards and opportunities are unmatched. The community has been amazing in helping us grow.",
//     },
//     {
//       name: "Michael Brown",
//       position: "Marketing Director, GlobalTech",
//       image: "https://randomuser.me/api/portraits/men/2.jpg",
//       feedback:
//         "We’ve seen great results with this platform’s innovative staking programs. Our passive income has been growing every day. The transparency of the platform is what we appreciate the most.",
//     },
//     {
//       name: "Emily Davis",
//       position: "Product Manager, TechInc",
//       image: "https://randomuser.me/api/portraits/women/2.jpg",
//       feedback:
//         "From day one, this platform has delivered more than expected. Easy-to-use, transparent, and offers excellent long-term growth opportunities.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Hero Section */}
//       <section className="py-24 text-center">
//         <div className="container mx-auto px-4 md:px-6">
//           <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-6">
//             Empower Your Digital Journey
//           </h1>
//           <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto">
//             Explore a dynamic suite of blockchain-powered services that reward, support, and grow with you.
//           </p>
//         </div>
//       </section>

//       {/* Services Carousel Section */}
//       <section className="py-16 bg-black">
//         <div className="container mx-auto px-4 md:px-6">
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             pagination={{ clickable: true }}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             loop={true}
//             breakpoints={{
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="pb-12 pt-12 px-5"
//           >
//             {services.map((service, index) => (
//               <SwiperSlide key={index}>
//                 <div className="h-full flex items-stretch">
//                   <div className="group relative w-full h-[420px] bg-black/60 backdrop-blur-md border border-yellow-500/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(255,255,255,0.05)] transition-transform duration-500 transform-gpu hover:scale-[1.03] hover:-rotate-x-[2deg] hover:rotate-y-[2deg] hover:shadow-[0_0_40px_rgba(252,211,77,0.3)]">
//                     <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-400 transition duration-500 pointer-events-none" />
//                     <div className="flex flex-col justify-between h-full">
//                       {/* Icon and Title */}
//                       <div>
//                         <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-yellow-400/20">
//                           {service.icon}
//                         </div>
//                         <h3 className="text-xl font-bold text-yellow-400 mb-1">
//                           {service.title}
//                         </h3>
//                         <p className="text-sm text-neutral-300 mb-4 leading-relaxed line-clamp-3">
//                           {service.description}
//                         </p>
//                       </div>

//                       {/* Features */}
//                       <ul className="space-y-2 text-sm text-neutral-200">
//                         {service.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start">
//                             <span className="text-yellow-400 mr-2 mt-1">•</span>
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>

//             ))}
//           </Swiper>
//         </div>
//       </section>



//       {/* Left and Right Split Layout Section */}
//       <section className="relative py-24 bg-black overflow-hidden">
//         {/* Background glow */}
//         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-400/20 blur-3xl rounded-full z-0 animate-pulse" />
//         <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">

//           {/* Text Content */}
//           <div className="md:w-1/2">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight mb-4">
//               Transform Your Digital Assets
//             </h2>
//             <h3 className="text-2xl text-neutral-300 font-medium mb-4">
//               Secure, Transparent, and Rewarding
//             </h3>
//             <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
//               Our platform offers a range of services to grow your digital assets in a secure,
//               transparent, and rewarding environment. From staking to daily rewards, join us and
//               become part of a thriving community.
//             </p>
//             <div>
//               <button onClick={() => navigate('/go-dashboard')} className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition">
//                 Get Started
//               </button>
//             </div>
//           </div>

//           {/* Image with Glow Border */}
//           <div className="md:w-1/2 relative group perspective-[1200px]">
//             <div className="w-full ">
//               <img
//                 src={tcc2}
//                 alt="Digital Assets"
//                 className="rounded-2xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
//               />
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* Testimonials Section */}
//       <section className="py-24 bg-black relative overflow-hidden">
//   <div className="container mx-auto px-4 text-center mb-12">
//     <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-4">
//       What Our Clients Say
//     </h2>
//     <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
//       Hear from some of the incredible people who have transformed their digital journeys with us.
//     </p>
//   </div>

//   <div className="container mx-auto px-4">
//     <Swiper
//       modules={[Pagination, Autoplay]}
//       spaceBetween={30}
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 3500, disableOnInteraction: false }}
//       loop={true}
//       breakpoints={{
//         768: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//       }}
//       className='py-10 px-2'
//     >
//       {testimonials.map((testimonial, index) => (
//         <SwiperSlide key={index} className="flex">
//           <div className="group w-full h-[320px] perspective-[1200px]">
//             <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:rotate-y-6 group-hover:scale-[1.03] group-hover:shadow-2xl rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 animate-gradient-x">
//               <div className="bg-black/80 backdrop-blur-md rounded-xl h-full p-6 flex flex-col justify-start">
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-14 h-14 rounded-full object-cover mr-3 border-2 border-yellow-400"
//                   />
//                   <div>
//                     <h3 className="text-lg font-bold text-yellow-400 leading-snug">{testimonial.name}</h3>
//                     <p className="text-sm text-neutral-300 leading-tight">{testimonial.position}</p>
//                   </div>
//                 </div>
//                 <p className="text-neutral-300 text-base italic mt-auto leading-relaxed">
//                   "{testimonial.feedback}"
//                 </p>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>

// </section>





//     </div>
//   );
// };

// export default ServicesPage;

import React from 'react';
import {
  Shield,
  Coins,
  DollarSign,
  Users,
  ShoppingCart,
  Zap,
  Globe,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import tcc2 from '../images/tcc2.png';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      title: 'Token Presale & Tiered Investment',
      description:
        'Get early access to TCC tokens at preferential rates through our tiered investment system.',
      features: [
        'Join the presale and get early access at discounted rates',
        'Three pricing tiers ensure fair opportunity and incentive',
      ],
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-400" />,
      title: 'Smart Staking Contracts',
      description: 'Secure and transparent staking solutions for long-term value creation.',
      features: [
        'Stake TCC tokens and earn daily rewards based on lock duration',
        'Transparent smart contracts audited and viewable by the public',
      ],
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
      title: 'Daily Income Program',
      description: 'Consistent daily rewards through our innovative $110 Plan.',
      features: [
        'Fixed reward of $0.50/day up to 3 years',
        'Loop-based reward system for continuous passive income',
        'Fully autonomous payout model (excluding Sundays)',
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-400" />,
      title: 'Referral Income Engine',
      description: 'Build and grow your network while earning substantial rewards.',
      features: [
        'Earn $0.20/day per team member from Level 1 to Level 6',
        'Up to $1750/day reward cap',
        'Real-time dashboard tracking and ranking',
      ],
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-yellow-400" />,
      title: 'Real-World Use Cases',
      description: 'Utilize TCC tokens across various platforms and services.',
      features: [
        'Shop using TCC on e-commerce platforms',
        'Swap TCC on PancakeSwap and other DEXs',
        'Future merchant and in-game utility integrations',
      ],
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Token Utility Expansion',
      description: 'Growing ecosystem of token utilities and governance features.',
      features: [
        'Platform features, access rights, content unlocking, and more',
        'NFT badges and voting rights for governance in later phases',
      ],
    },
    {
      icon: <Globe className="w-8 h-8 text-yellow-400" />,
      title: 'Community & Learning',
      description: 'Comprehensive support and education for all members.',
      features: [
        'Telegram channels, webinars, and mentorship for every user',
        'Tutorials, guides, and weekly updates for complete transparency',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      position: 'CEO, XYZ Corp',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      feedback:
        'This platform has transformed the way we manage and grow our digital assets. I highly recommend it for anyone looking to secure their financial future.',
    },
    {
      name: 'Jane Smith',
      position: 'Founder, ABC Ltd',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      feedback:
        'An incredible service with fantastic support. The rewards and opportunities are unmatched. The community has been amazing in helping us grow.',
    },
    {
      name: 'Michael Brown',
      position: 'Marketing Director, GlobalTech',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      feedback:
        'We’ve seen great results with this platform’s innovative staking programs. Our passive income has been growing every day. The transparency of the platform is what we appreciate the most.',
    },
    {
      name: 'Emily Davis',
      position: 'Product Manager, TechInc',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      feedback:
        'From day one, this platform has delivered more than expected. Easy-to-use, transparent, and offers excellent long-term growth opportunities.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-6">
            Empower Your Digital Journey
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto">
            Explore a dynamic suite of blockchain-powered services that reward, support, and grow with you.
          </p>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12 pt-12 px-5"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="h-full flex items-stretch">
                  <div className="group relative w-full h-[420px] bg-black/60 backdrop-blur-md border border-yellow-500/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(255,255,255,0.05)] transition-transform duration-500 transform-gpu hover:scale-[1.03] hover:-rotate-x-[2deg] hover:rotate-y-[2deg] hover:shadow-[0_0_40px_rgba(252,211,77,0.3)]">
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-400 transition duration-500 pointer-events-none" />
                    <div className="flex flex-col justify-between h-full">
                      {/* Icon and Title */}
                      <div>
                        <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-yellow-400/20">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-yellow-400 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 text-sm text-neutral-200">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-yellow-400 mr-2 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Left and Right Split Layout Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-400/20 blur-3xl rounded-full z-0 animate-pulse" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight mb-4">
              Transform Your Digital Assets
            </h2>
            <h3 className="text-2xl text-neutral-300 font-medium mb-4">
              Secure, Transparent, and Rewarding
            </h3>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
              Our platform offers a range of services to grow your digital assets in a secure, transparent, and rewarding environment. From staking to daily rewards, join us and become part of a thriving community.
            </p>
            <div>
              <button
                onClick={() => navigate('/go-dashboard')}
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Image with Glow Border */}
          <div className="md:w-1/2 relative group perspective-[1200px]">
            <div className="w-full">
              <img
                src={tcc2}
                alt="Digital Assets"
                className="rounded-2xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Hear from some of the incredible people who have transformed their digital journeys with us.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-10 px-2"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="flex">
                <div className="group w-full h-[320px] perspective-[1200px]">
                  <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:rotate-y-6 group-hover:scale-[1.03] group-hover:shadow-2xl rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 animate-gradient-x">
                    <div className="bg-black/80 backdrop-blur-md rounded-xl h-full p-6 flex flex-col justify-start">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover mr-3 border-2 border-yellow-400"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-yellow-400 leading-snug">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-neutral-300 leading-tight">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="text-neutral-300 text-base italic mt-auto leading-relaxed">
                        "{testimonial.feedback}"
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

