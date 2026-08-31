import { useState } from 'react';
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
    <div className="bg-[#0d1117]/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden w-full mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Scan Alimento (ex: Cuscuz, Macaxeira)..."
            className="w-full pl-12 pr-4 py-3 bg-[#161b22] border border-slate-700 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white font-mono text-sm"
          />
        </div>
        <button 
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analisar'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-900/20 text-red-400 rounded-xl border border-red-500/30 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Resultados da busca */}
      {results.length > 0 && !selected && (
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelect(food)}
              className="group flex items-center gap-4 p-3 rounded-xl border border-slate-800 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-left bg-[#161b22]"
            >
              {food.image ? (
                <img src={food.image} alt={food.name} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
              ) : (
                <div className="w-16 h-16 bg-[#0d1117] border border-slate-700 rounded-xl flex items-center justify-center text-slate-500 text-[10px] font-mono">No Image</div>
              )}
              <div className="flex-1 overflow-hidden">
                <h4 className="font-mono text-sm text-white truncate group-hover:text-blue-400">{food.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 uppercase">Select to simulate</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Alimento Selecionado e Visão de Macronutrientes */}
      {selected && (
        <div className="bg-[#161b22] rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center border border-slate-700">
          {selected.image ? (
            <img src={selected.image} alt={selected.name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl border border-slate-700" />
          ) : (
             <div className="w-32 h-32 md:w-40 md:h-40 bg-[#0d1117] rounded-2xl border border-slate-700 flex items-center justify-center text-slate-600 font-mono text-xs">No Image</div>
          )}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
              <h3 className="text-lg font-mono text-white truncate" title={selected.name}>{selected.name}</h3>
              <button 
                onClick={() => setSelected(null)} 
                className="text-[10px] font-mono uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/30"
              >
                [ RESET_INPUT ]
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-mono">Carboidratos</p>
                <p className="text-sm md:text-base font-mono text-blue-400">{selected.carbohydrates.toFixed(1)}g</p>
              </div>
              <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-mono">Proteínas</p>
                <p className="text-sm md:text-base font-mono text-emerald-400">{selected.proteins.toFixed(1)}g</p>
              </div>
              <div className="bg-[#0d1117] p-3 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-mono">Gorduras</p>
                <p className="text-sm md:text-base font-mono text-amber-400">{selected.fat.toFixed(1)}g</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 text-center sm:text-right font-mono">BASE: 100G PORTION</p>
          </div>
        </div>
      )}
    </div>
  );
}
