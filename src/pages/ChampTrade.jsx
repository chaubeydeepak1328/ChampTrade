
import {
  Trophy,
  Lightbulb,
  Link,
  Wallet,
  Repeat,
  Lock,
  Target,
  RefreshCw,
  ShoppingBag,
  Gamepad,
  Smartphone,
  CheckCircle,
  Leaf,
  Scale,
  Shield,
  History,
  Play,
  DollarSign,
} from 'lucide-react';

import '../css/ChampTrade.css'
import trade from '../images/trade.png'
import { FaRegHandPointRight } from "react-icons/fa6";


function App() {
  const levels = [
    { level: 'L1', referrals: 5, dailyEarning: 1.00 },
    { level: 'L2', referrals: 25, dailyEarning: 5.00 },
    { level: 'L3', referrals: 125, dailyEarning: 25.00 },
    { level: 'L4', referrals: 625, dailyEarning: 125.00 },
    { level: 'L5', referrals: 3125, dailyEarning: 625.00 },
    { level: 'L6', referrals: 15625, dailyEarning: 3125.00 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-12">
      {/* Hero Section */}
      <header className="text-center py-20 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-center sm:text-left">
          {/* Logo */}
          <img src={trade} alt="trade-logo" className="h-16 w-16 sm:h-20 sm:w-20" />

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-yellow-500">CHAMP</span> TRADE
          </h1>
        </div>

        <p className="text-2xl text-gray-300 font-semibold">Powered by TCC 2.0</p>
        <p className="text-xl text-yellow-500 mt-2 italic ">Earn like  Champion</p>
      </header>

      {/* Welcome Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-indigo-500/10 rounded-2xl pointer-events-none" />

          <h2 className="text-4xl font-extrabold text-white mb-6 flex items-center gap-4">
            <Lock className="w-10 h-10 text-yellow-400 drop-shadow" />
            Welcome to the New Era of Decentralized Wealth
          </h2>

          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            From the heart of <strong className="text-white">ChampCash</strong>, a platform that empowered <strong className="text-white">millions of earners</strong>,
            rises <strong className="text-white">ChampTrade</strong> — a decentralized earning opportunity, built on blockchain and engineered
            to reward every individual with <strong className="text-white">fairness, transparency, and freedom</strong>.
          </p>

          <div className="text-xl text-center font-semibold text-gray-200 space-y-2 tracking-wide">
            <p>This is not just a program.</p>
            <p>It's a movement.</p>
            <p>A revolution.</p>
            <p>
              A <span className="text-yellow-400 font-bold drop-shadow">champion's journey</span> into the future of finance.
            </p>
          </div>
        </div>
      </section>


      {/* Why Choose Section */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="relative rounded-2xl bg-gray-800/60 backdrop-blur-xl shadow-2xl border border-gray-700 p-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            Why Choose ChampTrade?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Link className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                text: "No MLM gimmicks. No centralized authority.",
              },
              {
                icon: <Link className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                text: "Fully on-chain. Fully transparent.",
              },
              {
                icon: <Wallet className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                text: "Daily earnings straight to your wallet.",
              },
              {
                icon: <Repeat className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                text: "Auto-reinvestment logic — no need to rejoin.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 transition-transform hover:scale-[1.02]"
              >
                {item.icon}
                <p className="text-lg text-gray-200">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-6 rounded-xl text-center border border-yellow-500/20">
            <p className="text-2xl font-semibold text-yellow-300">
              ChampTrade = Passive Income + Network Growth + Web3 Utility
            </p>
          </div>
        </div>
      </section>


      {/* Core Plan Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="relative rounded-2xl p-[2px] border border-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-[inherit] p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-yellow-500" />
              The Core Plan: How You Earn Like a Champion
            </h2>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl font-bold text-yellow-500">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Join with $110 worth of TCC</h3>
                  <p className="text-lg text-gray-300">
                    Activate your plan by contributing $110 in TCC tokens (from private sale or PancakeSwap).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl font-bold text-yellow-500">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Earn $0.50/day for 3 Years</h3>
                  <p className="text-lg text-gray-300">
                    You earn 6 days per week (excluding Sundays), for a total of ~$1.50/week × 52 weeks × 3 years ≈ $469.50.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl font-bold text-yellow-500">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Auto-Reinvest Forever</h3>
                  <p className="text-lg text-gray-300">
                    $33.33/year is held from your earnings, totaling ~$100 after 3 years. This automatically restarts your plan — no repurchase needed. Cycle repeats every 3 years from your held balance. Forever.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a href="/go-dashboard" className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-black text-center py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-blue-600 transition-all">
                Start Your Journey
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Team Power Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl shadow-3xl border border-gray-700/60 p-8 md:p-12 lg:p-16 overflow-hidden transform transition-all duration-500 hover:shadow-4xl">
          {/* Subtle background pattern or glow effect */}
          {/* You can create a subtle SVG pattern and use it here. Example: bg-[url('/path-to-subtle-pattern.svg')] */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl opacity-30 animate-pulse-slow z-0"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-20 z-0"></div>

          <div className="relative z-10">
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Users Icon - Example using inline SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-400 drop-shadow-lg">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" clipRule="evenodd" />
              </svg>
              <span>Team Power: <span className="text-yellow-400">6-Level Passive Growth</span></span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
              Unlock exponential earnings! Earn <span className="text-yellow-300 font-semibold text-xl md:text-2xl">$0.20/day</span> per active user in your team from <strong className="text-white">Level 1</strong> through <strong className="text-white">Level 6</strong>.
            </p>
            <p className='text-3xl font-bold pb-4 flex items-center gap-4'><FaRegHandPointRight className='text-yellow-500'/> <div>For Example</div></p>

            {/* Level Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {levels.map((level, index) => (
                <div
                  key={level.level}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-yellow-600/30 transform transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400 hover:bg-gray-700/80 shadow-lg hover:shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 text-2xl font-bold tracking-wide">{level.level}</span>
                    {/* ChevronRight Icon - Example using inline SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-yellow-500 group-hover:translate-x-1 transition-transform duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Total Referrals</p>
                      <p className="text-3xl text-white font-extrabold">{level.referrals.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Daily Earning</p>
                      <p className="text-3xl text-yellow-300 font-extrabold flex items-baseline">
                        ${level.dailyEarning.toLocaleString()}
                        {index === levels.length - 1 && (
                          <span className="text-sm ml-2 text-gray-400/80 font-normal">(Capped)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: 'Max Daily Cap', value: '$1,800' },
                { label: 'Weekly Potential', value: '$10,800' },
                { label: 'Yearly Potential', value: '$547,800' },
                { label: '3-Year Potential', value: '$1.6 Million' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-yellow-600/30 transform transition-all duration-300 hover:bg-gray-700/80 hover:border-yellow-400 shadow-md hover:shadow-xl"
                >
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-3xl font-extrabold text-yellow-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative Glow Effect */}
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition duration-500 pointer-events-none z-0"></div>
        </div>
      </section>


      {/* TCC Utility Section */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
          <div className="bg-black rounded-[inherit] p-8 sm:p-10 lg:p-12 border border-black">
            <h2 className="text-4xl font-extrabold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-transparent bg-clip-text">
                The Power of TCC Utility
              </span>
            </h2>

            <p className="text-lg text-neutral-300 mb-8">
              TCC isn't just another token — it's a utility-first asset built for real-world use. Whether you're shopping, swapping, gaming, or investing — TCC puts utility at your fingertips.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <ShoppingBag className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                  text: "Use it to shop on our upcoming e-commerce platform.",
                },
                {
                  icon: <RefreshCw className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                  text: "Swap on PancakeSwap for BNB or any other major token.",
                },
                {
                  icon: <Gamepad className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                  text: "Future-ready: integrate with games, merchant tools, and more.",
                },
                {
                  icon: <Smartphone className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />,
                  text: "Stake, spend, or trade — full freedom with your TCC.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {item.icon}
                  <p className="text-base sm:text-lg text-neutral-300">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
              <div className="bg-gray-900 rounded-[inherit] text-center p-6 sm:p-8 border border-yellow-500/20">
                <p className="text-xl font-semibold text-white">
                  TCC is your all-in-one digital utility asset for the real world.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* Differences Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
          <div className="bg-black rounded-[inherit] shadow-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-yellow-500" />
              What Makes ChampTrade Different?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Lock className="w-6 h-6 text-yellow-500 mt-1" />,
                  title: "Decentralized",
                  desc: "No one controls your money. You control your wallet.",
                },
                {
                  icon: <Leaf className="w-6 h-6 text-yellow-500 mt-1" />,
                  title: "Sustainable",
                  desc: "Smart contract logic limits overspending and inflow risks.",
                },
                {
                  icon: <Scale className="w-6 h-6 text-yellow-500 mt-1" />,
                  title: "Scalable",
                  desc: "Invite → Grow team → Earn more → Reinvest → Repeat.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-yellow-500 mt-1" />,
                  title: "Secure",
                  desc: "BNB/USD price feed via Chainlink Oracle. Fully audited.",
                },
                {
                  icon: <History className="w-6 h-6 text-yellow-500 mt-1" />,
                  title: "Legacy-Proven",
                  desc: "From the creators of ChampCash, trusted by 20M+ users.",
                },
              ].map(({ icon, title, desc }, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {icon}
                  <div>
                    <h3 className="font-semibold text-lg text-white">{title}</h3>
                    <p className="text-gray-300">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
              <div className="bg-gray-800 rounded-[inherit] text-center p-6">
                <p className="text-xl font-semibold text-white">
                  ChampTrade is not a promise. It's a protocol.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Real Champions Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
          <div className="bg-gray-900/70 backdrop-blur-xl rounded-[inherit] p-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-gradient bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
                Real Champions. Real Income. Real Future.
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Whether you're a student, housewife, crypto beginner, or influencer —
              <br />
              <strong className="text-white">ChampTrade gives you a decentralized path to wealth.</strong>
            </p>
            <div className="text-2xl font-bold text-yellow-500 mb-8">
              "Earn Like a Champion"
            </div>
            <div className="space-y-2 text-lg text-center text-gray-300">
              <p>The journey is open.</p>
              <p>The plan is ready.</p>
              <p>The time is now.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Start Now Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="relative rounded-2xl p-[2px] border-[4px] border-transparent bg-clip-border border-image border-image-source-gradient-to-r from-pink-500 via-yellow-400 to-blue-500">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-[inherit] p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Play className="w-8 h-8 text-yellow-500" />
              Start Now
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 text-lg text-gray-300">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
                <p>Buy TCC Tokens from PancakeSwap or Exchange</p>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-300">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
                <p>Activate Your $110 Package</p>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-300">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
                <p>Start Earning Daily</p>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-300">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
                <p>Build Your Team</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="#" className="bg-yellow-500 text-black text-center py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Join Private Sale Now
              </a>
              <a href="#" className="bg-gray-800 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-yellow-500/20">
                Read Full Whitepaper
              </a>
              <a href="#" className="bg-yellow-500 text-black text-center py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Join Our Telegram Group
              </a>
              <a href="#" className="bg-gray-800 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-yellow-500/20">
                Visit PancakeSwap Listing
              </a>
            </div>
          </div>
        </div>
      </section>




      {/* Final Words Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="relative p-[2px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 rounded-2xl">
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 text-center backdrop-blur-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
              Final Words
            </h2>
            <blockquote className="text-2xl italic text-gray-300 leading-relaxed mb-8">
              "The world rewards champions who take the first step. <br />
              With ChampTrade, the first step is simple — and the reward is lifelong."
            </blockquote>
            <div className="flex justify-center gap-6">
              <a href="/go-dashboard" className="bg-yellow-500 text-black text-lg py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Join Now
              </a>
              <a href="contact" className="bg-gray-800 text-white text-lg py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-yellow-500/20">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;