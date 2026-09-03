// ==========================================
// Linha do tempo interativa da digestão.
// Renderiza cada órgão sequencialmente e permite ao usuário 
// expandir detalhes nutricionais, citológicos, etc.
// ==========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { digestiveOrgans } from '../data';
import { FoodItem, OrganData } from '../types';
import OrganAnimation from './OrganAnimation';
import { Microscope, Dna, Activity, FileText, ChevronDown, ChevronUp } from 'lucide-react';

function OrganCard({ organ, food, expanded, setExpanded, activeTab, setActiveTab }: { organ: OrganData, food: FoodItem | null, expanded: boolean, setExpanded: (v: boolean) => void, activeTab: 'overview' | 'cytology' | 'biochem' | 'endocrine', setActiveTab: (v: any) => void }) {
  const baseColor = organ.color.split(' ')[1];
  const textColor = organ.color.split(' ')[2];

  return (
    <div className={`p-6 rounded-2xl border ${baseColor} bg-[#0d1117]/80 backdrop-blur-md hover:bg-[#161b22] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all group relative overflow-hidden flex flex-col`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded border ${baseColor} ${organ.color.split(' ')[0]} ${textColor} text-[10px] font-mono uppercase shadow-inner`}>
              pH: {organ.ph}
            </div>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${expanded ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 bg-[#0d1117] text-slate-400 hover:text-slate-200 hover:border-slate-500'} transition-colors font-mono text-[9px] uppercase tracking-widest`}
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Mostrar Menos</> : <><ChevronDown className="w-3 h-3" /> Exibir Mais</>}
          </button>
        </div>
        
        <h3 className="text-xl font-mono text-white mb-4 uppercase tracking-tight">{organ.name}</h3>

        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-1 block">Enzimas Atuantes</span>
                <p className={`font-mono ${textColor} text-sm glow-text`}>{organ.enzymes.join(' • ')}</p>
              </div>
              <div className="h-px w-full bg-slate-800/80" />
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-1 block">Ação Fisiológica (Substrato → Produto)</span>
                <p className="text-slate-300 text-sm leading-snug">{organ.action}</p>
              </div>

              {food && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/50" />
                  <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                      [ PROCESSAMENTO: {food.name} ]
                  </span>
                  <p className="text-[11px] text-blue-300/90 leading-relaxed italic">
                    {organ.id === 'mouth' && `Inicia-se a quebra dos ${food.carbohydrates.toFixed(1)}g de carboidratos complexos através da mastigação mecânica e da amilase salivar.`}
                    {organ.id === 'stomach' && `Ação vigorosa da pepsina sobre os ${food.proteins.toFixed(1)}g de proteínas, transformando-as em peptídeos devido ao meio extremamente ácido (HCl).`}
                    {organ.id === 'liver_pancreas' && `A bile (produzida no fígado) emulsifica os ${food.fat.toFixed(1)}g de gorduras, preparando-as para a lipase pancreática, enquanto carboidratos e proteínas continuam sendo quebrados.`}
                    {organ.id === 'small_intestine' && `Absorção em massa! As microvilosidades enviam os produtos finais dos ${food.carbohydrates.toFixed(1)}g de carbos, ${food.proteins.toFixed(1)}g de proteínas e ${food.fat.toFixed(1)}g de lipídios para a corrente sanguínea.`}
                    {organ.id === 'large_intestine' && `As fibras não digeridas do alimento sofrem fermentação pela microbiota intestinal. Há intensa reabsorção hídrica para formação do bolo fecal.`}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700/50 pb-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-slate-700 text-white shadow-inner' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <FileText className="w-3 h-3" /> Nutrição
                </button>
                <button 
                  onClick={() => setActiveTab('cytology')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === 'cytology' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-inner' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <Microscope className="w-3 h-3" /> Citologia
                </button>
                <button 
                  onClick={() => setActiveTab('biochem')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === 'biochem' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-inner' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <Dna className="w-3 h-3" /> Bioquímica
                </button>
                <button 
                  onClick={() => setActiveTab('endocrine')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === 'endocrine' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-inner' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <Activity className="w-3 h-3" /> Endócrino
                </button>
              </div>

              <div className="min-h-[120px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="tab-overview" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-1 block">Papel na Nutrição</span>
                        <p className="text-slate-300 text-xs leading-relaxed">{organ.nutrition}</p>
                      </div>
                      <div className="h-px w-full bg-slate-800/80" />
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-1 block">Enzimas & Ação Fisiológica</span>
                        <p className={`font-mono ${textColor} text-xs mb-2`}>{organ.enzymes.join(' • ')}</p>
                        <p className="text-slate-400 text-xs">{organ.action}</p>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'cytology' && (
                    <motion.div key="tab-cytology" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <span className="text-[9px] text-purple-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-sm bg-purple-500"></span> Morfologia Celular
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">{organ.academicDetails?.cytology}</p>
                    </motion.div>
                  )}
                  {activeTab === 'biochem' && (
                    <motion.div key="tab-biochem" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <span className="text-[9px] text-blue-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-sm bg-blue-500"></span> Rotas Moleculares
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">{organ.academicDetails?.biochem}</p>
                    </motion.div>
                  )}
                  {activeTab === 'endocrine' && (
                    <motion.div key="tab-endocrine" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500"></span> Controle Hormonal e Nervoso
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">{organ.academicDetails?.endocrine}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrganRow({ organ, food, isEven }: { organ: OrganData, food: FoodItem | null, isEven: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'cytology' | 'biochem' | 'endocrine'>('overview');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="absolute left-6 md:left-1/2 top-10 w-6 h-6 rounded-full border-2 border-blue-500 bg-[#0d1117] -translate-x-1/2 shadow-[0_0_15px_rgba(37,99,235,0.6)] z-20 flex items-center justify-center">
        <motion.div 
          className="w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(147,197,253,1)]" 
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} z-10`}>
         <OrganCard organ={organ} food={food} expanded={expanded} setExpanded={setExpanded} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} mt-2 md:mt-0 z-10`}>
         <OrganAnimation organId={organ.id} activeTab={expanded ? activeTab : 'overview'} />
      </div>
    </motion.div>
  );
}

export default function DigestiveTimeline({ food }: { food: FoodItem | null }) {
  return (
    <div className="relative max-w-5xl mx-auto py-10">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800/80 -translate-x-1/2 overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        <motion.div 
           className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-emerald-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] origin-top"
           initial={{ scaleY: 0 }}
           whileInView={{ scaleY: 1 }}
           viewport={{ once: true, margin: "0px 0px -200px 0px" }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      <div className="space-y-16">
        {digestiveOrgans.map((organ, index) => (
          <OrganRow key={organ.id} organ={organ} food={food} isEven={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
