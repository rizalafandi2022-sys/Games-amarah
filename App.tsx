import React, { useState, useEffect } from 'react';
import { RageInput } from './components/RageInput';
import { ResultCard } from './components/ResultCard';
import { ThemeToggle } from './components/ThemeToggle';
import { analyzeRage } from './services/geminiService';
import { AppState, RageAnalysisResult } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<RageAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply theme class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleRageSubmit = async (text: string) => {
    setAppState(AppState.ANALYZING);
    setErrorMessage(null);
    try {
      const data = await analyzeRage(text);
      setResult(data);
      setAppState(AppState.RESULT);
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan pada server komedi.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setResult(null);
    setAppState(AppState.IDLE);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-slate-900 font-sans text-dark dark:text-gray-100 overflow-x-hidden relative flex flex-col items-center transition-colors duration-500">
      {/* Background Blobs */}
      <div className="blob bg-purple-300 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="blob bg-yellow-300 w-96 h-96 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      <div className="blob bg-pink-300 w-96 h-96 rounded-full bottom-0 left-20 translate-y-1/2 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      {/* Top Right Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      </div>

      {/* Header */}
      <header className="w-full p-6 flex flex-col items-center justify-center z-10 mt-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-white/50 dark:border-slate-700 mb-4 transition-colors duration-300">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">AI Comedy Generator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-center text-dark dark:text-white leading-tight">
          Bank Emosi <span className="text-primary">Cuan</span>
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400 max-w-md">
          Ubah amarahmu menjadi aset (khayalan) masa depan!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start p-4 md:p-8 z-10 max-w-2xl">
        
        {appState === AppState.ERROR && errorMessage && (
           <div className="w-full max-w-md bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded-r shadow-md flex items-start">
             <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
             <div>
               <h3 className="text-red-800 dark:text-red-300 font-bold">Waduh Error!</h3>
               <p className="text-red-700 dark:text-red-200 text-sm">{errorMessage}</p>
               <button 
                 onClick={() => setAppState(AppState.IDLE)}
                 className="mt-2 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
               >
                 Coba lagi dong
               </button>
             </div>
           </div>
        )}

        {appState === AppState.IDLE || appState === AppState.ANALYZING || appState === AppState.ERROR ? (
          <RageInput 
            onSubmit={handleRageSubmit} 
            isLoading={appState === AppState.ANALYZING} 
          />
        ) : (
          result && <ResultCard result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-gray-400 dark:text-gray-500 text-sm z-10">
        <p>© {new Date().getFullYear()} Bank Emosi Cuan. <br/>Hanya hiburan, bukan saran finansial sungguhan.</p>
      </footer>
    </div>
  );
};

export default App;