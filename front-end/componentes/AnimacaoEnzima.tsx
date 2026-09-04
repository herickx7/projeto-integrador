import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';

export default function EnzymeAnimation() {
  const [digested, setDigested] = useState(false);

  return (
    <div className="relative p-8 md:p-12 bg-[#0d1117]/40 border border-slate-800/50 rounded-3xl overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 w-full max-w-xl text-center mb-12">
         <h3 className="text-lg font-mono text-white tracking-widest uppercase mb-2">Simulação de Clivagem Enzimática</h3>
         <p className="text-slate-500 text-xs font-mono uppercase">Ação da <strong className="text-blue-400">Pepsina</strong> rompendo ligações peptídicas de uma cadeia de Proteína.</p>
      </div>
      
      <div className="relative w-full max-w-lg h-40 flex items-center justify-center mb-10 z-10">
        
        {/* A Enzima (Pepsina) */}
        <motion.div 
          className="absolute z-20 w-20 h-20 bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] border-2 border-blue-400"
          initial={{ x: -200, y: -80, opacity: 0 }}
          animate={
            digested 
            ? { x: 0, y: 0, opacity: 1, scale: [1, 1.3, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } 
            : { x: -200, y: -80, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-white text-[10px] font-mono tracking-widest uppercase">Pepsina</span>
        </motion.div>

        {/* O Polímero (Cadeia de Proteína) */}
        <AnimatePresence>
          {!digested && (
            <motion.div 
              className="flex gap-1.5 items-center justify-center z-10"
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <motion.div 
                    className="w-10 h-10 bg-rose-500 rounded-full border-2 border-rose-300 shadow-inner flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  >
                     <span className="text-[10px] text-white/50 font-bold">AA</span>
                  </motion.div>
                  {i < 5 && <div className="w-2 h-1 bg-rose-300/50" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Os Monômeros / Peptídeos (Após a digestão) */}
        {digested && (
          <div className="flex gap-6 absolute z-10">
            {[...Array(3)].map((_, groupIdx) => (
              <motion.div 
                key={`group-${groupIdx}`} 
                className="flex gap-1"
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: (Math.random() - 0.5) * 120,
                  x: (Math.random() - 0.5) * 120,
                  rotate: Math.random() * 180 - 90
                }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-10 h-10 bg-rose-400 rounded-full border border-rose-300 flex items-center justify-center shadow-lg">
                        <span className="text-[10px] text-white/70 font-bold">Pep</span>
                    </div>
                    {i < 1 && <div className="w-1.5 h-1 bg-rose-300/50" />}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={() => setDigested(!digested)}
        className="relative z-20 flex items-center gap-2 px-6 py-3 bg-[#161b22] border border-slate-700 hover:border-blue-500 hover:text-blue-400 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
      >
        {digested ? (
          <><RotateCcw className="w-5 h-5" /> Restaurar Polímero</>
        ) : (
          <><Play className="w-5 h-5" /> Iniciar Ação Enzimática</>
        )}
      </button>
    </div>
  );
}
