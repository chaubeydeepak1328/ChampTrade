import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is TCC2.0?',
    answer: 'An ERC20 token with utility across the Ramestta ecosystem.'
  },
  {
    question: 'How do I buy tokens?',
    answer: 'Connect your wallet → enter TCC → buy tokens → done.'
  },
  {
    question: 'Is my referral permanent?',
    answer: 'Yes, it\'s recorded on-chain. You get credit for all valid purchases.'
  },
  {
    question: 'When does presale end?',
    answer: 'Either after 10M tokens sold or manually ended by the owner.'
  },
  {
    question: 'Can I withdraw TCC?',
    answer: 'No, once you buy tokens, TCC is locked into the system. Owner can only withdraw for project use.'
  }
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