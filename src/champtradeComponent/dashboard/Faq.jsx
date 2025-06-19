import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is TCC2.0?',
    answer: 'TCC2.0 is a BEP-20 utility token powering the Champ Trade platform. It is used for purchasing investment packages, earning daily ROI, referral rewards, and participating in ecosystem utilities like staking, trading, and trip rewards.'
  },
  {
    question: 'How do I buy tokens?',
    answer: 'Connect your BSC wallet (e.g., MetaMask), go to the "Buy TCC 2.0" section, enter the amount, and confirm the transaction. Tokens are purchased using BNB via PancakeSwap.'
  },
  {
    question: 'Is my referral permanent?',
    answer: 'Yes, your referral is recorded permanently on-chain. All valid referrals you generate will continuously earn you daily income up to 6 levels deep.'
  },
  {
    question: 'When does the presale end?',
    answer: 'There was no presale or private sale for TCC2.0. The token was directly launched through the ChampStake staking system and the ChampTrade investment platform.'
  },
  {
    question: 'Can I withdraw my TCC tokens?',
    answer: 'TCC tokens purchased for Champ Trade are locked into the system and used for earning daily ROI. However, users can claim their accumulated rewards every Sunday, which will be credited directly to their wallet.'
  },
];


export default function Faq() {
  return (
    <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-500/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-yellow-500">
        <HelpCircle className="mr-2" />
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border-b border-gray-700 last:border-b-0"
          >
            <summary className="flex justify-between items-center cursor-pointer py-4">
              <span className="font-medium text-white/70">{faq.question}</span>
              <span className="transition group-open:rotate-180 text-yellow-500">⌄</span>
            </summary>
            <p className="text-gray-300 pb-4">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}