import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface RageInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const RageInput: React.FC<RageInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border-2 border-white/50 dark:border-slate-700 backdrop-blur-sm transition-colors duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-dark dark:text-gray-100 mb-2">Lagi Kesel Apa Hari Ini?</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Ceritain aja, jangan dipendem. Nanti jadi jerawat lho.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Contoh: Kesel banget tetangga karaokean dangdut jam 2 pagi..."
            className="w-full h-40 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-700 focus:border-secondary dark:focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={isLoading}
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
            {text.length}/500
          </div>
        </div>

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform flex items-center justify-center space-x-2 group
            ${!text.trim() || isLoading 
              ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-red-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-95'
            }`}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Sedang Menghitung Karma...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              <span>Ubah Jadi Cuan!</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};