import { Mail, FileText, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#161818] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact</h3>
            <a
              href="mailto:support@tcc20.com"
              className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              support@tcc20.com
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Documentation</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Github size={16} className="mr-2" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <FileText size={16} className="mr-2" />
                Whitepaper
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Built On</h3>
            <div className="space-y-2">
              <p className="text-gray-300">Ramestta Blockchain</p>
              <p className="text-gray-300">Powered by: Chainlink, OpenZeppelin</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TCC2.0. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}