import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children }) => {
  return (
    <div className="bg-dark-green-light p-2 rounded-xl shadow-lg border border-golden/20">
      <h2 className="text-lg font-semibold text-golden mb-4">{title}</h2>
      <div className="text-golden-white">{children}</div>
    </div>
  );
};

export default Panel;