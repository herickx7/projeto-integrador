import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';

export default function OrganAnimation({ organId }: { organId: string }) {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (playing) {
      setStep(1);
      const timer = setTimeout(() => setStep(2), 1200);
      return () => clearTimeout(timer);
    } else {
      setStep(0);
    }
  }, [playing]);

  const renderMouth = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="absolute top-6 w-8 h-8 bg-blue-500/20 border-2 border-blue-400 rounded-full flex items-center justify-center z-20"
        initial={{ y: -40, opacity: 0 }}
        animate={step > 0 ? { y: 20, opacity: [0, 1, 0], scale: [1, 1.3, 1] } : { y: -40, opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className="text-[8px] font-mono text-blue-300">AMY</span>
      </motion.div>
      <div className="flex items-center gap-0.5 z-10">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-8 bg-emerald-500/20 border-2 border-emerald-400 rounded-sm flex items-center justify-center"
            animate={
              step === 2
                ? { x: i < 2 ? -25 : i > 3 ? 25 : 0, y: i % 2 === 0 ? 5 : -5 }
                : { x: 0, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <span className="text-[8px] font-mono text-emerald-300">GLI</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStomach = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="absolute top-6 w-8 h-8 bg-red-500/20 border-2 border-red-400 rounded-full flex items-center justify-center z-20"
        initial={{ y: -40, opacity: 0 }}
        animate={step > 0 ? { y: 20, opacity: [0, 1, 0], scale: [1, 1.3, 1] } : { y: -40, opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className="text-[8px] font-mono text-red-300">PEP</span>
      </motion.div>
      <div className="flex items-center gap-0 z-10">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-8 bg-orange-500/20 border-2 border-orange-400 rounded-full flex items-center justify-center"
            animate={step === 2 ? { x: i < 3 ? -15 : 15, y: i < 3 ? 5 : -5 } : { x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <span className="text-[8px] font-mono text-orange-300">AA</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLiverPancreas = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-6 flex gap-3 z-20">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-4 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            initial={{ y: -20, opacity: 0 }}
            animate={step > 0 ? { y: [-20, 30], opacity: [0, 1, 0] } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          />
        ))}
      </div>
      <motion.div
        className="absolute w-20 h-20 bg-amber-400/20 border-2 border-amber-400 rounded-full z-10 flex items-center justify-center"
        animate={step === 2 ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
         <span className="text-[8px] font-mono text-amber-300">LIPÍDIO</span>
      </motion.div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`micelle-${i}`}
          className="absolute w-8 h-8 bg-amber-400/40 border border-amber-400 rounded-full z-10"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={
            step === 2
              ? {
                  scale: 1,
                  x: Math.cos(i * 72 * (Math.PI / 180)) * 40,
                  y: Math.sin(i * 72 * (Math.PI / 180)) * 40,
                }
              : { scale: 0, x: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        />
      ))}
    </div>
  );

  const renderSmallIntestine = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-2">
      <div className="absolute top-4 flex gap-4 z-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-emerald-400' : i % 3 === 0 ? 'bg-blue-400' : 'bg-red-400'} shadow-[0_0_10px_currentColor]`}
            initial={{ y: 0, opacity: 1 }}
            animate={step === 2 ? { y: 80, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="flex gap-3 items-end z-10 border-b-2 border-slate-700 w-full justify-center px-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`villi-${i}`}
            className="w-8 bg-orange-500/10 border-x-2 border-t-2 border-orange-500/30 rounded-t-full"
            initial={{ height: 50 }}
            animate={
              step === 2
                ? { height: 60, backgroundColor: 'rgba(249, 115, 22, 0.3)', borderColor: 'rgba(249, 115, 22, 0.8)' }
                : { height: 50 }
            }
            transition={{ duration: 0.3, repeat: step === 2 ? Infinity : 0, repeatType: 'reverse' }}
          />
        ))}
      </div>
    </div>
  );

  const renderLargeIntestine = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="relative w-28 h-20 bg-orange-900/30 border-2 border-orange-800 rounded-3xl flex items-center justify-center"
        animate={step === 2 ? { scale: 0.8, backgroundColor: 'rgba(120, 53, 15, 0.6)' } : { scale: 1 }}
        transition={{ duration: 1 }}
      >
        <span className="absolute -top-6 text-[8px] font-mono text-slate-500 uppercase">H2O</span>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
            initial={{ x: (i - 1.5) * 12, y: i % 2 === 0 ? -5 : 5, opacity: 1 }}
            animate={
              step === 2
                ? { x: (i - 1.5) * 40, y: i % 2 === 0 ? -40 : 40, opacity: 0 }
                : { x: (i - 1.5) * 12, y: i % 2 === 0 ? -5 : 5, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
          />
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
    <div className="w-full bg-[#0d1117]/60 border border-slate-800 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden group h-[220px]">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        SIMULADOR_{organId.toUpperCase()}
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center mt-4">
        <AnimComponent />
      </div>

      <button
        onClick={() => setPlaying(!playing)}
        className="relative z-20 mt-2 flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-slate-700 hover:border-blue-500 hover:text-blue-400 text-slate-300 font-mono text-[9px] uppercase tracking-widest rounded-lg transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
      >
        {playing ? (
          <>
            <RotateCcw className="w-3 h-3" /> Reset
          </>
        ) : (
          <>
            <Play className="w-3 h-3" /> Start
          </>
        )}
      </button>
    </div>
  );
}
