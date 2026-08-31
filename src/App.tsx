import { useState } from 'react';
import FoodSearch from './components/FoodSearch';
import DidacticMatrix from './components/DidacticMatrix';
import EnzymeAnimation from './components/EnzymeAnimation';
import DigestiveTimeline from './components/DigestiveTimeline';
import { FoodItem } from './types';
import { ArrowDown, Beaker, Apple, Activity, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  return (
    <div className="min-h-screen bg-[#05070a] font-sans text-slate-300 selection:bg-blue-500/30">
      
      {/* Hero Section */}
      <header className="flex justify-between items-center bg-[#0d1117] border border-blue-500/30 rounded-2xl px-6 py-4 mx-6 mt-6 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-white tracking-tight uppercase">
              Digestive.OS <span className="text-blue-500 text-xs ml-2 font-mono opacity-70">v1.0.4 - Bio-Tech Project</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Interface de Simulação Fisiológica & Nutricional</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 uppercase mb-1">API Integration</div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              IFRN_DB_CONNECTED
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10 relative z-20">
        
        {/* Seção 1: API Integration */}
        <section id="simulator">
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-blue-500 rounded-full"></span> 1. Input Nutricional
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Consultamos a API Interna do IFRN. Pesquise um item servido (ex: "Cuscuz", "Frango").
            </p>
          </div>
          <FoodSearch onSelect={setSelectedFood} />
        </section>

        {/* Seção 2: Scrollytelling / Timeline */}
        <section>
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-500 rounded-full"></span> 2. O Trato Gastrointestinal
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Acompanhe o caminho percorrido pelo bolo alimentar. 
              {selectedFood ? <span className="text-emerald-400 font-bold ml-1">[{selectedFood.name} INTEGRADO]</span> : ''}
            </p>
          </div>
          <DigestiveTimeline food={selectedFood} />
        </section>

        {/* Seção 3: Animação Web */}
        <section>
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-red-500 rounded-full"></span> 3. Biologia Celular em Ação
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Clivagem de ligações peptídicas pela Pepsina.
            </p>
          </div>
          <EnzymeAnimation />
        </section>

        {/* Seção 4: Matriz Didática */}
        <section>
          <div className="text-left mb-6">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full"></span> 4. Matriz Bioquímica
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Tabela resumo relacionando órgão, pH e enzimas.
            </p>
          </div>
          <DidacticMatrix />
        </section>

      </main>

      <footer className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-800/50 pt-6 mt-12 pb-6 px-6 mx-6">
        <div>IFRN INTEGRATOR PROJECT // BIOLOGY + WEB DEV</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="text-blue-500">REACT_TS: ENABLED</span>
          <span>DATA_STREAM_ENCRYPTION: AES-256</span>
          <span className="text-emerald-500">CORE_TEMP: 36.5°C</span>
        </div>
      </footer>
    </div>
  );
}
