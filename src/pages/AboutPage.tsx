
import React from 'react';
import { Shield, Target, Zap, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400 text-center">
            About TCC 2.0
          </h1>

          {/* Vision Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              TCC 2.0 envisions a world where digital income is accessible to all—whether you're in a metro city or a rural village. 
              We are committed to decentralizing wealth opportunities and making financial freedom achievable through technology and community.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <div className="grid gap-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-lg text-neutral-300">
                  Empower users with daily earning models powered by blockchain
                </p>
              </div>
              <div className="flex items-start">
                <Target className="w-6 h-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-lg text-neutral-300">
                  Deliver real-world utility through a trusted and growing token
                </p>
              </div>
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-lg text-neutral-300">
                  Continue the legacy of ChampCash with transparency, innovation, and scale
                </p>
              </div>
            </div>
          </section>

          {/* Unique Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">What Makes Us Unique?</h2>
            <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 w-5 h-5 mt-1" />
                  <span className="text-neutral-300">Legacy credibility with 20M+ past users</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 w-5 h-5 mt-1" />
                  <span className="text-neutral-300">Fully on-chain referral structure with multi-level rewards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 w-5 h-5 mt-1" />
                  <span className="text-neutral-300">Chainlink-powered real-time pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 w-5 h-5 mt-1" />
                  <span className="text-neutral-300">Planned expansion to e-commerce, gaming, and merchant services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 w-5 h-5 mt-1" />
                  <span className="text-neutral-300">A continuous earning loop with real-world value</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <p className="text-xl text-white font-semibold">
                  With TCC 2.0, everyone becomes a champion.
                </p>
              </div>
            </div>
          </section>

          {/* Ecosystem Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Our Expanding Ecosystem</h2>
            <p className="text-lg text-neutral-300 mb-4">
              TCC 2.0 is more than just earnings — it’s a full ecosystem:
            </p>
            <ul className="space-y-3 text-neutral-300 list-disc list-inside">
              <li>Marketplace integration for digital and physical products</li>
              <li>Future-ready gaming partnerships using TCC tokens</li>
              <li>Merchant gateway for real-world payments and rewards</li>
              <li>Community governance through a DAO model</li>
            </ul>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-white text-center">What Our Community Says</h2>
  <div className="grid md:grid-cols-2 gap-8">
    {[
      {
        name: "Aarav Patel",
        quote: "TCC 2.0 changed how I think about income. It’s reliable, tech-driven, and transparent.",
      },
      {
        name: "Nisha Verma",
        quote: "With just my phone, I’ve created a passive income stream that actually works.",
      },
      {
        name: "Rahul Mehra",
        quote: "The referral model is powerful — I introduced a few friends and the rewards haven’t stopped.",
      },
      {
        name: "Fatima Khan",
        quote: "This is the future of income. Easy to use and empowering!",
      },
    ].map((t, idx) => (
      <div
        key={idx}
        className="p-6 rounded-xl border shadow-lg transition-all duration-300 group
                   bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827]
                   border-[2px] border-transparent group-hover:border-rgb-glow
                   hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]"
        style={{
          borderImage: "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00) 1",
        }}
      >
        <Star className="text-yellow-400 w-6 h-6 mb-3" />
        <p className="text-lg text-white italic">“{t.quote}”</p>
        <p className="mt-4 text-sm font-medium text-white tracking-wide">
          — <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">{t.name}</span>
        </p>
      </div>
    ))}
  </div>
</section>


          {/* Final Call-to-Action */}
          <section className="text-center mt-20">
            <h3 className="text-3xl font-bold text-white mb-4">Join the Digital Revolution</h3>
            <p className="text-neutral-300 text-lg max-w-xl mx-auto mb-6">
              Be a part of TCC 2.0 — where your effort meets innovation. Start your journey today.
            </p>
            <button onClick={() => navigate('/go-dashboard')} className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg transition">
              Get Started Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

