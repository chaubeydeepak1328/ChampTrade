import React from 'react';
import { Code2 } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Code2 className="h-8 w-8 text-yellow-500" />
      <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
        TCC20
      </span>
    </div>
  );
};

export default Logo;