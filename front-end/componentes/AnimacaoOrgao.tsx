// ==========================================
// Componente responsável por todas as animações interativas 
// dos órgãos e processos digestivos.
// Utiliza Framer Motion para efeitos fluídos.
// ==========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Target, Beaker, MousePointer2, Droplets, Brain, Zap, Waves, Microscope, Dna, Activity, ArrowRight, Asterisk, Sparkles } from 'lucide-react';

const getColors = (color: string) => {
  switch(color) {
    case 'blue': return { bg: 'bg-blue-500/5', text: 'text-blue-400', border: 'border-blue-500/30' };
    case 'red': return { bg: 'bg-red-500/5', text: 'text-red-400', border: 'border-red-500/30' };
    case 'amber': return { bg: 'bg-amber-500/5', text: 'text-amber-400', border: 'border-amber-500/30' };
    case 'orange': return { bg: 'bg-orange-500/5', text: 'text-orange-400', border: 'border-orange-500/30' };
    case 'purple': return { bg: 'bg-purple-500/5', text: 'text-purple-400', border: 'border-purple-500/30' };
    case 'emerald': return { bg: 'bg-emerald-500/5', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'rose': return { bg: 'bg-rose-500/5', text: 'text-rose-400', border: 'border-rose-500/30' };
    default: return { bg: 'bg-slate-500/5', text: 'text-slate-400', border: 'border-slate-500/30' };
  }
}

const SimBase = ({ onClick, active, icon: Icon, text, color, children }: any) => {
  const c = getColors(color);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden rounded-xl" onClick={onClick}>
      <div className={`absolute inset-0 ${c.bg} opacity-0 hover:opacity-100 transition-opacity z-0 pointer-events-none`} />
      {!active && <div className={`absolute top-4 text-[9px] font-bold tracking-widest ${c.text} animate-pulse flex items-center gap-2 bg-[#0d1117] px-3 py-1.5 rounded border ${c.border} z-30 shadow-md`}><Icon className="w-3 h-3"/> {text}</div>}
      {children}
    </div>
  );
}

// =================== MOUTH ===================
const MouthOverview = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={MousePointer2} text="CLIQUE PARA QUEBRAR O AMIDO" color="blue">
       <motion.div className="absolute top-0 w-0.5 bg-blue-300 shadow-[0_0_15px_rgba(147,197,253,1)] z-10" initial={{ height: 0, opacity: 0 }} animate={a ? { height: 140, opacity: [0, 1, 1, 0] } : { height: 0, opacity: 0 }} transition={{ duration: 0.6, times: [0, 0.2, 0.8, 1] }} />
       <div className="flex items-center z-10 mt-8">
         {[0, 1, 2, 3, 4, 5].map((i) => (
           <motion.div key={i} className="w-8 h-9 bg-[#0d1117] border-2 border-emerald-500/80 flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(52,211,153,0.2)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', marginLeft: i > 0 ? '-6px' : '0' }} animate={ a ? { x: i < 2 ? -50 : i > 3 ? 50 : 0, y: i % 2 === 0 ? 25 : -25, rotate: i < 2 ? -30 : i > 3 ? 30 : 0, borderColor: 'rgba(52, 211, 153, 0.3)', opacity: 0.8 } : { x: 0, y: 0, rotate: 0 } } transition={{ type: 'spring', stiffness: 100, damping: 15, delay: a ? 0.2 : 0 }}>
             <span className="text-[7px] font-mono text-emerald-400 font-bold">GLI</span>
           </motion.div>
         ))}
       </div>
    </SimBase>
  )
}
const MouthCytology = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Microscope} text="SECREÇÃO ACINAR" color="purple">
       <div className="relative flex justify-center items-center h-24 w-24">
         {[0,1,2,3,4,5].map(i => <div key={i} className="absolute w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-500" style={{ transform: `rotate(${i*60}deg) translateY(-20px)` }} />)}
         <div className="absolute top-10 w-6 h-16 border-x-2 border-purple-500/50" />
         <AnimatePresence>
           {a && [0,1,2].map(i => <motion.div key={i} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)] z-10" initial={{ scale: 0, y: 0 }} animate={{ scale: 1, y: 70, opacity: [0, 1, 0] }} transition={{ duration: 1, delay: i*0.3, repeat: Infinity }} />)}
         </AnimatePresence>
       </div>
    </SimBase>
  )
}
const MouthBiochem = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Dna} text="HIDRÓLISE ENZIMÁTICA" color="blue">
       <div className="flex items-center gap-1">
         <motion.div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-400" animate={a ? { x: -30, opacity: 0.5 } : {}}>GLI</motion.div>
         <motion.div className="w-4 h-1 bg-emerald-500" animate={a ? { scaleX: 0, opacity: 0 } : {}} />
         <motion.div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-400" animate={a ? { x: 30, opacity: 0.5 } : {}}>GLI</motion.div>
       </div>
       <motion.div className="absolute top-8 w-12 h-12 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center text-[8px] text-blue-300 font-bold" initial={{ y: -60, opacity: 0 }} animate={a ? { y: -10, opacity: [0, 1, 0] } : { y: -60, opacity: 0 }} transition={{ duration: 1.5 }}>AMY</motion.div>
       <motion.div className="absolute top-16 text-[10px] text-blue-300 font-mono font-bold" initial={{ scale: 0, opacity: 0 }} animate={a ? { scale: 1.5, opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }} transition={{ duration: 1, delay: 0.5 }}>+ H2O</motion.div>
    </SimBase>
  )
}
const MouthEndocrine = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Activity} text="SINAL PARASSIMPÁTICO" color="emerald">
       <div className="absolute top-8 left-12"><Brain className="w-8 h-8 text-emerald-500" /></div>
       <div className="absolute bottom-10 right-12"><div className="w-10 h-10 bg-purple-500/20 border-2 border-purple-500 rounded-full flex items-center justify-center"><Droplets className="w-4 h-4 text-purple-400"/></div></div>
       <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200"><path d="M 80 60 C 150 60, 150 150, 220 150" fill="transparent" stroke="rgba(16,185,129,0.3)" strokeWidth="2" strokeDasharray="4 4" /></svg>
       <motion.div className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,1)]" initial={{ top: '30%', left: '26%' }} animate={a ? { top: ['30%', '40%', '75%'], left: ['26%', '50%', '73%'] } : {}} transition={{ duration: 0.8 }} />
       <motion.div className="absolute bottom-10 right-12 w-10 h-10 bg-blue-400 rounded-full z-0 pointer-events-none" initial={{ scale: 0, opacity: 0 }} animate={a ? { scale: [1, 2.5], opacity: [0.8, 0] } : {}} transition={{ delay: 0.8, duration: 1 }} />
    </SimBase>
  )
}

// =================== STOMACH ===================
const StomachOverview = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={MousePointer2} text="INJETAR HCl E PEPSINAA" color="red">
       <motion.div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-transparent rounded-xl" initial={{ opacity: 0 }} animate={a ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5 }} />
       <div className="flex items-center z-10 mt-8">
         {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} className="flex items-center">
              <motion.div className="w-6 h-6 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.3)] backdrop-blur-sm" animate={ a ? { y: (i % 2 === 0 ? -1 : 1) * (Math.random() * 40 + 30), x: (i - 3.5) * 20, rotate: Math.random() * 90, scale: 0.9, opacity: 0.7, borderColor: 'rgba(249,115,22,0.4)' } : { y: i % 2 === 0 ? 8 : -8, x: 0 } } transition={{ type: 'spring', stiffness: 60, damping: 12, delay: a ? 0.3 : 0 }}>
                <span className="text-[7px] text-orange-300 font-bold">AA</span>
              </motion.div>
              {i < 7 && <motion.div className="w-4 h-[3px] bg-orange-500/80 shadow-[0_0_5px_rgba(249,115,22,0.8)]" animate={a ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2, delay: a ? 0.1 : 0 }} />}
            </div>
         ))}
       </div>
    </SimBase>
  )
}
const StomachCytology = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Microscope} text="SECREÇÃO GÁSTRICA" color="red">
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <div className="w-14 h-20 bg-red-500/20 border-2 border-red-500 rounded-lg flex items-center justify-center text-[8px] text-red-300 font-bold mb-2">CÉL. PARIETAL</div>
          <AnimatePresence>{a && <motion.div className="text-red-500 font-bold" initial={{ y: -20, opacity: 0 }} animate={{ y: 20, opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>H+</motion.div>}</AnimatePresence>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-20 bg-purple-500/20 border-2 border-purple-500 rounded-lg flex items-center justify-center text-[8px] text-purple-300 font-bold mb-2">CÉL. PRINCIPAL</div>
          <AnimatePresence>{a && <motion.div className="text-purple-400 font-bold text-[10px]" initial={{ y: -20, opacity: 0 }} animate={{ y: 20, opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>PEP</motion.div>}</AnimatePresence>
        </div>
      </div>
    </SimBase>
  )
}
const StomachBiochem = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Dna} text="ATIVAÇÃO DO PEPSINAOGÊNIO" color="red">
      <motion.div className="absolute inset-0 bg-red-900/30" initial={{ opacity: 0 }} animate={a ? { opacity: 1 } : { opacity: 0 }} />
      <div className="relative">
        <motion.div className="w-20 h-20 rounded-full flex items-center justify-center border-4 z-10 relative font-bold text-[9px]" animate={a ? { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 1)', color: 'rgba(252, 165, 165, 1)' } : { backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 1)', color: 'rgba(147, 197, 253, 1)' }} transition={{ duration: 0.5 }}>
          {a ? 'PEPSINA' : 'PEPSINAOGÊNIO'}
        </motion.div>
        <motion.div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-500/50 border-2 border-slate-400 rounded-lg" animate={a ? { x: 50, y: -50, rotate: 180, opacity: 0 } : {}} transition={{ duration: 0.8 }} />
      </div>
    </SimBase>
  )
}
const StomachEndocrine = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Activity} text="CASCATA DA GASTRINA" color="emerald">
       <div className="flex items-center gap-4">
         <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-500/20 flex items-center justify-center text-[8px] text-green-300">G-CELL</div>
         <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={a ? { x: [0, 25], opacity: [1, 0] } : { opacity: 0 }} transition={{ duration: 0.5 }} />
         <div className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-yellow-500/20 flex items-center justify-center text-[8px] text-yellow-300">ECL</div>
         <motion.div className="w-2 h-2 bg-yellow-400 rounded-full" animate={a ? { x: [0, 25], opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.5, delay: 0.5 }} />
         <motion.div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-[8px]" animate={a ? { borderColor: 'rgba(239, 68, 68, 1)', backgroundColor: 'rgba(239, 68, 68, 0.4)', color: 'rgba(252, 165, 165, 1)', scale: 1.1, boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' } : { borderColor: 'rgba(156, 163, 175, 1)', backgroundColor: 'rgba(156, 163, 175, 0.2)', color: 'rgba(156, 163, 175, 1)', scale: 1 }} transition={{ duration: 0.5, delay: 1 }}>CÉL. PARIETAL</motion.div>
       </div>
    </SimBase>
  )
}

// =================== LIVER & PÂNCREAS ===================
const LiverOverview = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Target} text="INJECT BILE" color="amber">
       <motion.div className="absolute top-4 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] z-20" initial={{ y: -40, opacity: 0, scale: 1 }} animate={a ? { y: 60, opacity: [0, 1, 0], scale: [1, 1.5, 0.5] } : { y: -40, opacity: 0 }} transition={{ duration: 0.5, ease: "easeIn" }} />
       <motion.div className="absolute w-24 h-24 bg-gradient-to-br from-amber-400/40 to-amber-600/20 border-2 border-amber-400 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(251,191,36,0.6),0_0_30px_rgba(251,191,36,0.4)] z-10 mt-8 backdrop-blur-md" animate={a ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: a ? 0.4 : 0 }}>
         <span className="text-[10px] text-amber-200 font-bold tracking-widest">MACRO LIPÍDIO</span>
       </motion.div>
       <div className="absolute inset-0 flex items-center justify-center mt-8">
         {[...Array(12)].map((_, i) => (
           <motion.div key={i} className="absolute w-8 h-8 bg-amber-400/20 border border-amber-400 rounded-full z-10 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-sm" initial={{ scale: 0, x: 0, y: 0, opacity: 0 }} animate={ a ? { scale: 1, opacity: 1, x: Math.cos(i * 30 * (Math.PI / 180)) * 70, y: Math.sin(i * 30 * (Math.PI / 180)) * 70 } : { scale: 0, x: 0, y: 0, opacity: 0 } } transition={{ type: 'spring', stiffness: 100, damping: 10, delay: a ? 0.6 : 0 }}>
             <span className="text-[6px] text-amber-300 font-bold">MIC</span>
           </motion.div>
         ))}
       </div>
    </SimBase>
  )
}
const LiverCytology = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Microscope} text="SÍNTESE BILIAR" color="emerald">
       <div className="relative w-32 h-32 bg-amber-900/30 border-2 border-amber-700 flex items-center justify-center z-10" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
          <span className="text-[9px] text-amber-500 font-bold mb-4">HEPATÓCITO</span>
          <AnimatePresence>
            {a && [0,1,2].map(i => <motion.div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: [0, 1, 0] }} transition={{ duration: 1, delay: i*0.2, repeat: Infinity }} />)}
            {a && [0,1,2].map(i => <motion.div key={`b-${i}`} className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,1)]" initial={{ y: 0, opacity: 0 }} animate={{ y: 40, opacity: [0, 1, 0] }} transition={{ duration: 1, delay: i*0.2 + 0.5, repeat: Infinity }} />)}
          </AnimatePresence>
       </div>
       <div className="absolute bottom-6 w-12 h-2 bg-emerald-500/50" />
    </SimBase>
  )
}
const LiverBiochem = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Dna} text="CASCATA ZIMOGÊNICA" color="amber">
       <div className="flex flex-col items-center gap-4">
         <motion.div className="w-6 h-6 bg-yellow-500/80 rounded-full flex items-center justify-center text-[6px] font-bold shadow-md z-20" animate={a ? { y: 20, opacity: 0 } : {}}>ENT</motion.div>
         <motion.div className="w-24 h-8 rounded-full border-2 flex items-center justify-center font-bold text-[8px] z-10" animate={a ? { borderColor: 'rgba(239, 68, 68, 1)', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'rgba(252, 165, 165, 1)' } : { borderColor: 'rgba(59, 130, 246, 1)', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'rgba(147, 197, 253, 1)' }} transition={{ delay: 0.3 }}>
           {a ? 'TRIPSINA' : 'TRIPSINOGÊNIO'}
         </motion.div>
         <motion.div className="w-32 h-8 rounded-full border-2 flex items-center justify-center font-bold text-[8px]" animate={a ? { borderColor: 'rgba(249, 115, 22, 1)', backgroundColor: 'rgba(249, 115, 22, 0.2)', color: 'rgba(253, 186, 116, 1)' } : { borderColor: 'rgba(168, 85, 247, 1)', backgroundColor: 'rgba(168, 85, 247, 0.2)', color: 'rgba(216, 180, 254, 1)' }} transition={{ delay: 0.8 }}>
           {a ? 'CHYMOTRIPSINA' : 'CHYMOTRIPSINOGÊNIO'}
         </motion.div>
       </div>
    </SimBase>
  )
}
const LiverEndocrine = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Activity} text="CCK & SECRETIN" color="emerald">
       <div className="absolute top-10 left-6 w-16 h-8 bg-slate-700/50 rounded-full flex items-center justify-center text-[8px] font-bold border border-slate-500">DUODENO</div>
       
       <div className="absolute top-4 right-10 w-16 h-12 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-[8px] text-green-300 font-bold overflow-visible">
         <motion.div animate={a ? { scale: [1, 0.7, 1] } : {}} transition={{ delay: 0.6, duration: 0.5 }}>VESÍCULA BILIAR</motion.div>
       </div>

       <div className="absolute bottom-6 right-8 w-20 h-10 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center text-[8px] text-yellow-300 font-bold">
         <motion.div animate={a ? { scale: [1, 1.2, 1], textShadow: '0 0 10px #fef08a' } : {}} transition={{ delay: 0.8, duration: 0.5 }}>PÂNCREAS</motion.div>
       </div>

       <motion.div className="absolute w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,1)]" initial={{ top: '35%', left: '25%' }} animate={a ? { top: '15%', left: '70%', opacity: [1, 0] } : { opacity: 0 }} transition={{ duration: 0.6 }} />
       <motion.div className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,1)]" initial={{ top: '35%', left: '25%' }} animate={a ? { top: '75%', left: '70%', opacity: [1, 0] } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }} />
    </SimBase>
  )
}

// =================== SMALL INTESTINE ===================
const SmallIntestineOverview = () => {
  const [absorbed, setAbsorbed] = useState<number[]>([]);
  const handleAbsorb = (i: number, e: React.MouseEvent) => { e.stopPropagation(); if (!absorbed.includes(i)) setAbsorbed([...absorbed, i]); }
  return (
    <SimBase onClick={()=>{}} active={absorbed.length > 0} icon={MousePointer2} text="CLIQUE NOS NUTRIENTES" color="orange">
      <div className="absolute bottom-0 w-full h-20 opacity-80 z-20 border-b-2 border-orange-500/50">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
          <motion.path d="M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z" fill="rgba(249, 115, 22, 0.15)" stroke="rgba(249, 115, 22, 0.8)" strokeWidth="0.5" animate={{ d: [ "M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z", "M0 20 L0 10 Q5 20 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z", "M0 20 L0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 L100 20 Z" ] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        </svg>
      </div>
      <div className="absolute inset-0 flex justify-around px-6 top-16">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div key={i} onClick={(e) => handleAbsorb(i, e)} className={`w-7 h-7 rounded-full absolute cursor-pointer flex items-center justify-center hover:scale-110 transition-transform ${ i % 2 === 0 ? 'bg-emerald-500/90 shadow-[0_0_15px_rgba(16,185,129,0.8)]' : i % 3 === 0 ? 'bg-blue-500/90 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-red-500/90 shadow-[0_0_15px_rgba(239,68,68,0.8)]' } z-30`} initial={{ y: (i%2)*15, opacity: 1, scale: 1 }} animate={ absorbed.includes(i) ? { y: 150, opacity: 0, scale: 0.3 } : { y: [(i%2)*15, (i%2)*15 + 10, (i%2)*15] } } transition={ absorbed.includes(i) ? { duration: 0.5, ease: "backIn" } : { duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" } } style={{ left: `${8 + i * 14}%` }}>
            <span className="text-[8px] text-white font-bold">{ i % 2 === 0 ? 'GLI' : i % 3 === 0 ? 'AA' : 'AG' }</span>
          </motion.div>
        ))}
      </div>
    </SimBase>
  )
}
const SmallIntestineCytology = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Microscope} text="ABSORÇÃO APICAL" color="orange">
       <div className="flex gap-2 items-end h-full pt-10">
         {[0,1,2].map(i => (
           <div key={i} className="w-16 h-24 bg-orange-900/30 border-2 border-orange-700 relative flex flex-col items-center">
             <motion.div className="absolute -top-4 w-full border-t-4 border-dashed border-orange-400" animate={a ? { y: [-2, 2, -2], opacity: [0.5, 1, 0.5] } : {}} transition={{ duration: 0.5, repeat: Infinity }} />
             {a && <motion.div className="w-4 h-4 bg-emerald-400 rounded-full mt-2" initial={{ y: -30, opacity: 0 }} animate={{ y: 20, opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: i*0.2, repeat: Infinity }} />}
           </div>
         ))}
       </div>
    </SimBase>
  )
}
const SmallIntestineBiochem = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Dna} text="SGLT1 CO-TRANSPORT" color="blue">
      <div className="w-full h-2 bg-blue-900 absolute top-1/2 -translate-y-1/2" />
      <motion.div className="w-16 h-20 bg-blue-500/20 border-2 border-blue-500 rounded-lg absolute z-10 flex items-center justify-center" animate={a ? { rotate: 180 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
        <div className="w-2 h-full bg-[#0d1117]" />
      </motion.div>
      <motion.div className="w-4 h-4 bg-white rounded-full absolute z-20 text-[6px] font-bold flex items-center justify-center text-blue-900" initial={{ y: -40, x: -10 }} animate={a ? { y: [ -40, 0, 40 ], x: [-10, -10, 10] } : {}} transition={{ duration: 1.5, times: [0, 0.4, 1] }}>Na</motion.div>
      <motion.div className="w-6 h-6 bg-emerald-400 rounded-full absolute z-20 text-[6px] font-bold flex items-center justify-center text-emerald-900" initial={{ y: -40, x: 10 }} animate={a ? { y: [ -40, 0, 40 ], x: [10, 10, -10] } : {}} transition={{ duration: 1.5, times: [0, 0.4, 1] }}>GLI</motion.div>
    </SimBase>
  )
}
const SmallIntestineEndocrine = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Activity} text="SECREÇÃO DE INCRETINAS" color="emerald">
       <div className="absolute left-6 top-8 w-16 h-24 bg-emerald-900/30 border-2 border-emerald-500 rounded flex flex-col items-center justify-center text-[8px] font-bold text-emerald-400">L-CELL</div>
       <div className="absolute bottom-6 w-full h-8 bg-red-900/20 border-y-2 border-red-500" />
       <div className="absolute right-6 top-8 w-16 h-12 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-yellow-400">
         <motion.div animate={a ? { scale: [1, 1.2, 1], textShadow: '0 0 10px #fef08a' } : {}} transition={{ delay: 1, duration: 0.5 }}>PÂNCREAS</motion.div>
       </div>
       <AnimatePresence>
         {a && [0,1,2].map(i => <motion.div key={i} className="absolute w-2 h-2 bg-emerald-400 rounded-full z-20 shadow-[0_0_8px_rgba(52,211,153,1)]" initial={{ left: '20%', bottom: '40px' }} animate={{ left: '80%', bottom: '20px', opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: i*0.3 }} />)}
       </AnimatePresence>
    </SimBase>
  )
}

// =================== LARGE INTESTINE ===================
const LargeIntestineOverview = () => {
  const [clicks, setClicks] = useState(0);
  const maxClicks = 6;
  const progress = Math.min(clicks / maxClicks, 1);
  return (
    <SimBase onClick={() => setClicks(c => Math.min(c + 1, maxClicks))} active={clicks>0} icon={Droplets} text="CLIQUE PARA EXTRAIR ÁGUA" color="orange">
       {clicks === maxClicks && <div className="absolute top-4 text-[10px] text-emerald-400 flex items-center gap-2 bg-[#0d1117] px-2 py-1 rounded border border-emerald-500/30 z-30 shadow-md">REABSORÇÃO CONCLUÍDA</div>}
       <motion.div className="relative z-10 grid grid-cols-3 gap-2 p-5 bg-orange-900/40 border-2 border-orange-800 rounded-2xl shadow-[0_0_30px_rgba(154,52,18,0.3)] mt-6" animate={{ scale: 1 - progress * 0.35, backgroundColor: `rgba(${120 - progress*50}, ${53 - progress*30}, 15, ${0.4 + progress*0.5})`, gap: `${8 - progress*8}px`, borderColor: `rgba(${154 - progress*50}, ${52 - progress*20}, 18, 1)` }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
         <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 bg-[#0d1117] px-3 py-1 rounded-full border border-slate-700 tracking-widest shadow-md">QUIMO</span>
         {[...Array(6)].map((_, i) => (
           <div key={i} className="w-8 h-8 bg-orange-700/80 rounded-lg relative flex items-center justify-center overflow-visible shadow-inner">
              <span className="text-[7px] text-orange-300 font-bold">FIBRA</span>
              <AnimatePresence>
                {clicks > 0 && clicks <= maxClicks && <motion.div key={`drop-${clicks}-${i}`} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)] z-20 pointer-events-none" initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ opacity: 0, x: (i % 2 === 0 ? -1 : 1) * (50 + Math.random()*30), y: (i < 3 ? -1 : 1) * (50 + Math.random()*30), scale: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} />}
              </AnimatePresence>
           </div>
         ))}
       </motion.div>
    </SimBase>
  )
}
const LargeIntestineCytology = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Microscope} text="SECREÇÃO MUCOSA" color="blue">
       <div className="w-32 h-32 border-4 border-t-0 border-orange-800 rounded-b-3xl relative flex justify-around p-2 bg-[#0d1117]">
         {[0,1,2].map(i => <div key={`g-${i}`} className="w-4 h-8 bg-blue-900/50 border border-blue-500 rounded-full self-center" />)}
         <motion.div className="absolute inset-0 bg-blue-500/30 rounded-b-2xl" initial={{ scaleY: 0, transformOrigin: 'bottom' }} animate={a ? { scaleY: 1 } : {}} transition={{ duration: 1 }} />
         {a && <div className="absolute inset-0 flex items-center justify-center text-blue-300 font-bold text-[10px] z-10">LUBRIFICAÇÃO MUCOSA</div>}
       </div>
    </SimBase>
  )
}
const LargeIntestineBiochem = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Dna} text="FERMENTAÇÃO BACTERIANA" color="purple">
       <motion.div className="w-32 h-4 bg-orange-700/50 rounded-full mb-4" animate={a ? { scaleX: 0, opacity: 0 } : {}} transition={{ duration: 1, delay: 0.5 }} />
       <div className="flex gap-4">
         {[0,1,2].map(i => (
           <motion.div key={i} className="w-10 h-16 bg-purple-900/40 border-2 border-purple-500 rounded-full flex items-center justify-center relative" animate={a ? { y: [-10, 0, -10] } : {}} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.1 }}>
             <span className="text-[6px] text-purple-300 font-bold">BACTÉRIA</span>
             {a && <motion.div className="absolute w-full h-full rounded-full border-2 border-emerald-400" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 1, repeat: Infinity, delay: i*0.2 }} />}
           </motion.div>
         ))}
       </div>
       {a && <div className="absolute bottom-6 text-emerald-400 text-[10px] font-bold font-mono">AGCC (BUTIRATO)</div>}
    </SimBase>
  )
}
const LargeIntestineEndocrine = () => {
  const [a, setA] = useState(false);
  return (
    <SimBase onClick={()=>setA(true)} active={a} icon={Activity} text="REFLEXO GASTROCÓLICO" color="rose">
       <div className="absolute top-10 w-12 h-12 bg-rose-900/50 border-2 border-rose-500 rounded-full flex items-center justify-center text-[8px] font-bold text-rose-300">CÉL. EC</div>
       <motion.div className="absolute bottom-10 w-48 h-8 bg-orange-900/50 border-2 border-orange-500" animate={a ? { scaleX: [1, 0.6, 1] } : {}} transition={{ duration: 1, delay: 0.5 }} />
       <motion.div className="absolute w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,1)]" initial={{ top: '40%', opacity: 0 }} animate={a ? { top: '65%', opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.5 }} />
       {a && <div className="absolute bottom-2 text-rose-400 text-[8px] font-bold font-mono">MOTILIDADE INDUZIDA POR 5-HT</div>}
    </SimBase>
  )
}


export default function OrganAnimation({ organId, activeTab = 'overview' }: { organId: string, activeTab?: string }) {
  const [resetKey, setResetKey] = useState(0);

  // Force reset when tab changes
  useEffect(() => setResetKey(k => k+1), [activeTab, organId]);

  const components: any = {
    mouth: { overview: MouthOverview, cytology: MouthCytology, biochem: MouthBiochem, endocrine: MouthEndocrine },
    stomach: { overview: StomachOverview, cytology: StomachCytology, biochem: StomachBiochem, endocrine: StomachEndocrine },
    liver_pancreas: { overview: LiverOverview, cytology: LiverCytology, biochem: LiverBiochem, endocrine: LiverEndocrine },
    small_intestine: { overview: SmallIntestineOverview, cytology: SmallIntestineCytology, biochem: SmallIntestineBiochem, endocrine: SmallIntestineEndocrine },
    large_intestine: { overview: LargeIntestineOverview, cytology: LargeIntestineCytology, biochem: LargeIntestineBiochem, endocrine: LargeIntestineEndocrine },
  };

  const AnimComponent = components[organId]?.[activeTab] || MouthOverview;

  return (
    <div className="w-full bg-[#0d1117]/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden group h-[260px] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 opacity-20 tech-grid pointer-events-none" />
      <div className="absolute inset-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-scanline z-0 pointer-events-none" />

      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-slate-500 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-slate-500 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-slate-500 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-slate-500 pointer-events-none" />

      <div className="absolute top-3 left-4 text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 bg-[#0d1117] px-1 z-30 shadow-md">
        <Asterisk className="w-3 h-3 text-blue-500" />
        SEQ_{organId.toUpperCase()} // {activeTab.toUpperCase()}
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center mt-2 z-10" key={resetKey}>
        <AnimComponent />
      </div>

      <button
        onClick={() => setResetKey(k => k+1)}
        className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-[#161b22]/80 backdrop-blur-md border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 font-mono text-[8px] uppercase tracking-widest rounded transition-all shadow-[0_0_10px_rgba(0,0,0,0.3)]"
      >
        <RotateCcw className="w-3 h-3" /> [ REINICIAR CENA ]
      </button>
    </div>
  );
}
