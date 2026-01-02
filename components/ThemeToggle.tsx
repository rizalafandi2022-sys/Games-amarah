import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700 shadow-sm backdrop-blur-sm hover:scale-110 transition-all duration-200 group"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
};