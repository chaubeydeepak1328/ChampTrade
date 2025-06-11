
import { BookOpen, FileQuestion, MessageSquare, Phone } from 'lucide-react';
import Panel from '../champtradeComponent/dashboard/Panel';

function HelpCenterPage() {
  const helpResources = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Read our comprehensive guides and documentation',
      link: '#'
    },
    {
      icon: FileQuestion,
      title: 'FAQs',
      description: 'Find answers to commonly asked questions',
      link: '#'
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Join discussions with other ChampTrade members',
      link: '#'
    },
    {
      icon: Phone,
      title: 'Contact Support',
      description: '24/7 support for urgent assistance',
      link: '#'
    }
  ];

  return (
    <Panel title="Help Center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpResources.map(({ icon: Icon, title, description, link }) => (
          <a
            key={title}
            href={link}
            className="p-6 bg-[rgb(20,20,20)] border border-yellow-500/50 rounded-xl hover:bg-dark-green-dark transition-colors "
          >
            <Icon className="w-8 h-8 text-golden mb-4" />
            <h3 className="text-lg font-semibold text-golden-white mb-2">{title}</h3>
            <p className="text-golden-white/80">{description}</p>
          </a>
        ))}
      </div>
    </Panel>
  );
}

export default HelpCenterPage;