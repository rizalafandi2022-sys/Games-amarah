import React from 'react';
import { RageAnalysisResult } from '../types';
import { RefreshCw, DollarSign, Flame, HeartHandshake } from 'lucide-react';
import { BubbleGame } from './BubbleGame';

interface ResultCardProps {
  result: RageAnalysisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  // Determine color based on rage score
  const getScoreColor = (score: number) => {
    if (score < 50) return 'text-green-500';
    if (score < 100) return 'text-yellow-500';
    if (score < 150) return 'text-orange-500';
    return 'text-red-600';
  };

  const getEmoji = (score: number) => {
    if (score < 50) return '😌';
    if (score < 100) return '😤';
    if (score < 150) return '😡';
    return '🤬';
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden animate-fade-in-up border-4 border-secondary/20 dark:border-secondary/40 transition-colors duration-300">
      <div className="bg-gradient-to-r from-secondary to-blue-400 dark:from-secondary/80 dark:to-blue-600/80 p-4 text-center">
        <h2 className="text-white font-display text-xl font-bold">Hasil Konversi Emosi</h2>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* Rage Score Section */}
        <div className="flex flex-col items-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Saldo Amarah</span>
          <div className="flex items-center space-x-2">
            <Flame className={`w-8 h-8 ${getScoreColor(result.rageScore)}`} />
            <span className={`text-5xl font-display font-black ${getScoreColor(result.rageScore)}`}>
              {result.rageScore}
            </span>
            <span className="text-4xl">{getEmoji(result.rageScore)}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min((result.rageScore / 200) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Money Section */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border-2 border-green-100 dark:border-green-900/50 flex flex-col items-center transform transition hover:scale-105 duration-300">
           <span className="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Cair Jadi Saldo Dana (Fiktif)</span>
           <div className="flex items-center text-green-700 dark:text-green-400">
              <DollarSign className="w-6 h-6 mr-1" />
              <span className="text-3xl font-display font-bold">{result.moneyValue}</span>
           </div>
           <p className="text-xs text-green-500/70 dark:text-green-400/60 italic mt-1">*Jangan dipake buat beli seblak beneran</p>
        </div>

        {/* Punchline Section */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-l-4 border-yellow-400 dark:border-yellow-600">
          <p className="text-center text-gray-700 dark:text-gray-200 italic font-medium">
            "{result.punchline}"
          </p>
        </div>

        {/* Calming Quote Section (New) */}
        <div className="flex items-start space-x-3 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
          <HeartHandshake className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-1">Zona Adem</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {result.calmingQuote}
            </p>
          </div>
        </div>

        {/* Bubble Game (New) */}
        <BubbleGame />

        <button
          onClick={onReset}
          className="w-full bg-dark dark:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black dark:hover:bg-slate-950 transition-all flex items-center justify-center space-x-2 group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Konversi Emosi Lainnya</span>
        </button>
      </div>
    </div>
  );
};