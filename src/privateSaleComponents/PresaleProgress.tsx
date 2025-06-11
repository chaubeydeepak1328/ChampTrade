interface PresaleProgressProps {
  totalSold: number;
  remainingTokens: number;
  currentPrice: number;
  currentPhase: number;
}

export function PresaleProgress({ 
  totalSold, 
  remainingTokens, 
  currentPrice, 
  currentPhase 
}: PresaleProgressProps) {
  const phases = [
    { price: 0.02, range: '0-5M' },
    { price: 0.04, range: '5M-8M' },
    { price: 0.06, range: '8M-10M' }
  ];

  return (
    <div className="bg-[#161818] rounded-2xl shadow-xl p-4 sm:p-8 border border-yellow-500/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-500">Presale Progress</h2>
      
      <div className="mb-6">
        <div className="h-4 w-full bg-black border border-yellow-500/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: `${(totalSold / 10_000_000) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>0 TCC2.0</span>
          <span>10M TCC2.0</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 " >
        <div className="p-4 rounded-lg border border-yellow-500/50 bg-black backdrop-blur-md">
          <p className="text-yellow-500">Total Sold</p>
          <p className="text-xl font-semibold text-white">{totalSold.toLocaleString()} TCC2.0</p>
        </div>
        <div className="p-4 bg-black rounded-lg border border-yellow-500/50">
          <p className="text-yellow-500">Remaining</p>
          <p className="text-xl font-semibold text-white">{remainingTokens.toLocaleString()} TCC2.0</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-yellow-500">Pricing Tiers</h3>
        {phases.map((phase, index) => (
          <div 
            key={index}
            className={`flex justify-between p-3 rounded-lg mb-2 ${
              currentPhase === index 
                ? 'bg-amber-500/20 border-2 border-yellow-500' 
                : 'bg-black border  border-yellow-500/50'
            }`}
          >
            <span className="text-white">Tier {index + 1}</span>
            <span className="text-yellow-500">${phase.price} ({phase.range})</span>
          </div>
        ))}
      </div>
    </div>
  );
}