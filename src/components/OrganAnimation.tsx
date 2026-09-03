import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ActivitySquare, ShieldAlert, Zap } from 'lucide-react';

export default function OrganAnimation({ organId }: { organId: string }) {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (playing) {
      setStep(1);
      const timer1 = setTimeout(() => setStep(2), 600);
      const timer2 = setTimeout(() => setStep(3), 1800);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setStep(0);
    }
  }, [playing]);

  // Boca: Amido (Hexagonos) quebrando via feixe da Amilase
  const renderMouth = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="absolute top-2 w-10 h-10 bg-blue-500/10 border border-blue-400/50 rounded-lg flex flex-col items-center justify-center z-20 shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-sm"
        initial={{ y: -40, opacity: 0 }}
        animate={step > 0 ? { y: 20, opacity: [0, 1, 0.8, 0], scale: [1, 1.2, 1] } : { y: -40, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Zap className="w-4 h-4 text-blue-400 mb-0.5" />
        <span className="text-[6px] font-mono text-blue-300">AMY_SLV</span>
      </motion.div>
      
      {/* Feixe de energia */}
      <motion.div 
        className="absolute top-12 w-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
        initial={{ height: 0, opacity: 0 }}
        animate={step === 2 ? { height: 60, opacity: [0, 1, 0] } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="flex items-center z-10 mt-10">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-7 h-8 bg-[#0d1117] border border-emerald-500/50 relative flex items-center justify-center"
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              marginLeft: i > 0 ? '-4px' : '0'
            }}
            animate={
              step >= 2
                ? { 
                    x: i < 2 ? -30 : i > 3 ? 30 : 0, 
                    y: i % 2 === 0 ? 10 : -10,
                    borderColor: 'rgba(52, 211, 153, 0.8)',
                    boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)'
                  }
                : { x: 0, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 120, damping: 10, delay: step >= 2 ? 0.2 : 0 }}
          >
            <span className="text-[6px] font-mono text-emerald-400 glow-text">GLI</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Estomago: Proteina (ZigZag) cortada por scan laser
  const renderStomach = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Laser Scan Horizontal */}
      <motion.div
        className="absolute w-full h-[1px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] z-20"
        initial={{ y: -40, opacity: 0 }}
        animate={step > 0 ? { y: [ -40, 20, 20, 50 ], opacity: [0, 1, 1, 0] } : { y: -40, opacity: 0 }}
        transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
      >
        <div className="absolute right-2 -top-3 text-[7px] text-red-400 font-mono">PEPSIN_SCAN</div>
      </motion.div>

      <div className="flex items-center z-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className="w-5 h-5 rounded-sm bg-orange-500/10 border border-orange-500/50 flex items-center justify-center"
              animate={
                step >= 2 
                ? { 
                    y: i < 4 ? -20 - (i*5) : 20 + ((i-4)*5), 
                    x: i < 4 ? -10 : 10,
                    rotate: i < 4 ? -15 : 15,
                    borderColor: 'rgba(249, 115, 22, 1)',
                    backgroundColor: 'rgba(249, 115, 22, 0.2)'
                  } 
                : { y: i % 2 === 0 ? 5 : -5, x: 0, rotate: 0 }
              }
              transition={{ type: 'spring', stiffness: 80, delay: step >= 2 ? 0.3 : 0 }}
            >
              <span className="text-[6px] font-mono text-orange-400">AA</span>
            </motion.div>
            {i < 7 && (
              <motion.div 
                className="w-2 h-[1px] bg-orange-500/50" 
                animate={step >= 2 && i === 3 ? { opacity: 0, scale: 0 } : { opacity: 1 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Fígado/Pâncreas: Gota de Lipídio estilhaçada por Bile (radar target)
  const renderLiverPancreas = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Mira Radar */}
      <motion.div 
        className="absolute w-24 h-24 border border-emerald-500/30 rounded-full z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-emerald-500 -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-emerald-500 -translate-x-1/2" />
        <div className="absolute left-0 top-1/2 h-0.5 w-2 bg-emerald-500 -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 h-0.5 w-2 bg-emerald-500 -translate-y-1/2" />
      </motion.div>

      {/* Ping da Bile */}
      <motion.div
        className="absolute w-full h-full border-2 border-emerald-400 rounded-full z-20 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={step === 1 ? { scale: [0, 0.5], opacity: [0, 1] } : step >= 2 ? { scale: 1.5, opacity: 0 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Blob Central */}
      <motion.div
        className="absolute w-16 h-16 bg-amber-500/20 border border-amber-500 rounded-full z-10 flex items-center justify-center backdrop-blur-sm"
        animate={step >= 2 ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
         <span className="text-[8px] font-mono text-amber-400 font-bold tracking-widest">MACRO_LIPID</span>
      </motion.div>

      {/* Micelas */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`micelle-${i}`}
          className="absolute w-6 h-6 bg-amber-400/10 border border-amber-400 rounded-full z-10 flex items-center justify-center"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={
            step >= 2
              ? {
                  scale: 1,
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 45,
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 45,
                  boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
                }
              : { scale: 0, x: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        >
          <span className="text-[5px] text-amber-300 font-mono">MIC</span>
        </motion.div>
      ))}
    </div>
  );

  // Intestino Delgado: Vilosidades em forma de onda SVG absorvendo partículas
  const renderSmallIntestine = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden pb-4">
      
      {/* Vilosidades (SVG Wave Path) */}
      <div className="absolute bottom-0 w-full h-16 opacity-80 z-20 border-b-2 border-orange-500/50">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
          <motion.path 
            d="M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z"
            fill="rgba(249, 115, 22, 0.1)"
            stroke="rgba(249, 115, 22, 0.8)"
            strokeWidth="0.5"
            animate={step >= 1 ? {
              d: [
                "M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z",
                "M0 20 L0 10 Q5 20 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z",
                "M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Partículas Nutricionais */}
      <AnimatePresence>
        {step > 0 && (
          <div className="absolute inset-0 flex justify-around px-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`nutr-${i}`}
                className={`w-2 h-2 rounded-full absolute ${i % 2 === 0 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]' : i % 3 === 0 ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]' : 'bg-red-400 shadow-[0_0_8px_rgba(239,68,68,1)]'} z-10`}
                initial={{ top: '10%', opacity: 0 }}
                animate={{ 
                  top: ['10%', '80%', '90%'], 
                  opacity: [0, 1, 0],
                  scale: [1, 1, 0.5]
                }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                style={{ left: `${15 + i * 14}%` }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      <div className="absolute top-2 right-2 text-[7px] font-mono text-orange-400 opacity-50 border border-orange-500/30 px-1 rounded">VILLI_ACTIVE</div>
    </div>
  );

  // Intestino Grosso: Hexagonos compactando e emitindo partículas azuis (água)
  const renderLargeIntestine = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* Campo de extração */}
      <motion.div 
        className="absolute inset-0 border border-blue-500/20 rounded-xl z-0"
        animate={step >= 1 ? { backgroundColor: ['rgba(59,130,246,0)', 'rgba(59,130,246,0.05)', 'rgba(59,130,246,0)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.div
        className="relative z-10 grid grid-cols-3 gap-1 p-2 bg-orange-900/20 border border-orange-800 rounded-xl"
        animate={step >= 2 ? { scale: 0.7, gap: 0, backgroundColor: 'rgba(120, 53, 15, 0.8)' } : { scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-slate-400 bg-[#0d1117] px-1 whitespace-nowrap">H2O EXTRACTION</span>
        
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-orange-700/50 rounded-sm relative">
             {/* Partículas de água ejetadas */}
             <motion.div 
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(96,165,250,1)] -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={step >= 1 && step < 3 ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: i % 2 === 0 ? [0, -30] : [0, 30],
                  y: i < 3 ? [0, -30] : [0, 30]
                } : { opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
             />
          </div>
        ))}
      </motion.div>
    </div>
  );

  const animations: Record<string, () => JSX.Element> = {
    mouth: renderMouth,
    stomach: renderStomach,
    liver_pancreas: renderLiverPancreas,
    small_intestine: renderSmallIntestine,
    large_intestine: renderLargeIntestine,
  };

  const AnimComponent = animations[organId] || renderMouth;

  return (
    <div className="w-full bg-[#0d1117]/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden group h-[220px] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
      {/* Grid tech background */}
      <div className="absolute inset-0 opacity-20 tech-grid" />
      
      {/* Scanline overlay running constantly */}
      <div className="absolute inset-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-scanline z-0" />

      {/* Corners UI */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-slate-500" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-slate-500" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-slate-500" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-slate-500" />

      <div className="absolute top-3 left-4 text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 bg-[#0d1117] px-1 z-30">
        <span className={`w-1.5 h-1.5 rounded-full ${playing ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
        SEQ_{organId.toUpperCase()}
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center mt-2 z-10">
        <AnimComponent />
      </div>

      <button
        onClick={() => setPlaying(!playing)}
        className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-[#161b22]/80 backdrop-blur-md border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 font-mono text-[8px] uppercase tracking-widest rounded transition-all shadow-[0_0_10px_rgba(0,0,0,0.3)]"
      >
        {playing ? (
          <><RotateCcw className="w-3 h-3" /> [ ABORT ]</>
        ) : (
          <><Play className="w-3 h-3" /> [ EXECUTE ]</>
        )}
      </button>
    </div>
  );
}
