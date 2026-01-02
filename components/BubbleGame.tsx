import React, { useState } from 'react';

export const BubbleGame: React.FC = () => {
  // Create array of 16 bubbles
  const [bubbles, setBubbles] = useState<boolean[]>(new Array(16).fill(false));
  const [poppedCount, setPoppedCount] = useState(0);

  const popBubble = (index: number) => {
    if (!bubbles[index]) {
      const newBubbles = [...bubbles];
      newBubbles[index] = true;
      setBubbles(newBubbles);
      setPoppedCount(prev => prev + 1);
      
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const resetBubbles = () => {
    setBubbles(new Array(16).fill(false));
    setPoppedCount(0);
  };

  const isAllPopped = poppedCount === bubbles.length;

  return (
    <div className="w-full bg-blue-50 dark:bg-slate-700/50 rounded-2xl p-4 border-2 border-blue-100 dark:border-slate-600">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-dark dark:text-gray-100">
            Penyalur Emosi Digital
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Pencet bubble-nya buat ngilangin setres!
          </p>
        </div>
        <div className="text-sm font-bold text-primary">
          {poppedCount}/{bubbles.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {bubbles.map((isPopped, index) => (
          <button
            key={index}
            onClick={() => popBubble(index)}
            disabled={isPopped}
            className={`
              aspect-square rounded-full shadow-sm transition-all duration-200 relative overflow-hidden group
              ${isPopped 
                ? 'bg-gray-200 dark:bg-slate-800 scale-95 shadow-inner cursor-default' 
                : 'bg-gradient-to-br from-secondary to-teal-400 hover:scale-105 active:scale-90 cursor-pointer shadow-md'
              }
            `}
            aria-label="Pop bubble"
          >
            {/* Highlight effect for unpopped */}
            {!isPopped && (
              <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white opacity-40 rounded-full blur-[1px]"></div>
            )}
            
            {/* Popped text */}
            {isPopped && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-400 select-none animate-bounce">
                PLOP!
              </span>
            )}
          </button>
        ))}
      </div>

      {isAllPopped && (
        <div className="text-center animate-fade-in-up">
          <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">
            Emosi sudah tersalurkan! ✨
          </p>
          <button 
            onClick={resetBubbles}
            className="text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Main Lagi
          </button>
        </div>
      )}
    </div>
  );
};