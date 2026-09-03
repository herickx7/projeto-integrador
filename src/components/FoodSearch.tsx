import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';
import { searchFood } from '../lib/api';
import { FoodItem } from '../types';

export default function FoodSearch({ onSelect }: { onSelect: (food: FoodItem) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setSelected(null); // Reseta seleção anterior

    try {
      const data = await searchFood(query);
      setResults(data);
      if (data.length === 0) {
        setError('Alimento não encontrado. Tente: Arroz, Feijão, Macaxeira, Cuscuz, Frango, etc.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao conectar com o banco de dados de alimentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (food: FoodItem) => {
    setSelected(food);
    onSelect(food);
  };

  return (
    <div className="bg-[#0d1117]/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 relative overflow-hidden w-full mx-auto shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      {/* Decorative corner markers */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-blue-600/10 rounded-full blur-3xl -ml-8 -mt-8 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none" />

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6 relative z-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Scan Alimento (ex: Cuscuz, Macaxeira)..."
            className="w-full pl-12 pr-4 py-3 bg-[#161b22] border border-slate-700 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white font-mono text-sm shadow-inner"
          />
        </div>
        <button 
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analisar'}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-900/20 text-red-400 rounded-xl border border-red-500/30 text-xs font-mono relative z-10"
          >
            {error}
          </motion.div>
        )}

        {/* Resultados da busca */}
        {results.length > 0 && !selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 gap-3 mt-4 relative z-10"
          >
            {results.map((food, idx) => (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={food.id}
                onClick={() => handleSelect(food)}
                className="group flex items-center gap-4 p-3 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-left bg-[#161b22] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
              >
                {food.image ? (
                  <img src={food.image} alt={food.name} className="w-16 h-16 object-cover rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-colors" />
                ) : (
                  <div className="w-16 h-16 bg-[#0d1117] border border-slate-700 rounded-xl flex items-center justify-center text-slate-500 text-[10px] font-mono group-hover:border-blue-500/50 transition-colors group-hover:text-blue-400">IMG_NULL</div>
                )}
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-mono text-sm text-white truncate group-hover:text-blue-400 glow-text">{food.name}</h4>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest group-hover:text-blue-300 transition-colors">Select to simulate</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Alimento Selecionado e Visão de Macronutrientes */}
        {selected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161b22] rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center border border-slate-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative z-10"
          >
            {selected.image ? (
              <img src={selected.image} alt={selected.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl border border-slate-600 shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
            ) : (
               <div className="w-32 h-32 md:w-40 md:h-40 bg-[#0d1117] rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-slate-600 font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                 <Search className="w-8 h-8 mb-2 opacity-50" />
                 <span className="text-[10px] tracking-widest">IMG_NULL</span>
               </div>
            )}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
                <h3 className="text-xl font-mono text-white truncate glow-text" title={selected.name}>
                  {selected.name}
                  <span className="ml-3 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase align-middle">Loaded</span>
                </h3>
                <button 
                  onClick={() => setSelected(null)} 
                  className="text-[10px] font-mono uppercase tracking-widest text-blue-400 hover:text-white transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                >
                  [ RESET_INPUT ]
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-[#0d1117] p-3 md:p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50" />
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Carboidratos</p>
                  <p className="text-lg md:text-xl font-mono text-blue-400">{selected.carbohydrates.toFixed(1)}g</p>
                </div>
                <div className="bg-[#0d1117] p-3 md:p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/50" />
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Proteínas</p>
                  <p className="text-lg md:text-xl font-mono text-emerald-400">{selected.proteins.toFixed(1)}g</p>
                </div>
                <div className="bg-[#0d1117] p-3 md:p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500/50" />
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Gorduras</p>
                  <p className="text-lg md:text-xl font-mono text-amber-400">{selected.fat.toFixed(1)}g</p>
                </div>
              </div>
              <p className="text-[9px] text-slate-500 mt-4 text-center sm:text-right font-mono tracking-widest uppercase">BASE: 100G PORTION // SOURCE: IFRN_DB</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
