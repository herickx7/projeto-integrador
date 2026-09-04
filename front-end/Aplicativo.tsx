import { useState } from 'react';
import { motion } from 'motion/react';
import PesquisaAlimento from './componentes/PesquisaAlimento';
import MatrizDidatica from './componentes/MatrizDidatica';
import LinhaDoTempoDigestiva from './componentes/LinhaDoTempoDigestiva';
import { FoodItem } from './tipos';
import { Activity } from 'lucide-react';

export default function App() {
  // Estado que armazena o alimento selecionado pelo usuário na barra de pesquisa
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Variantes de animação para fazer os elementos aparecerem em sequência (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  // Animação individual para cada seção do site subir suavemente
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#05070a] font-sans text-slate-300 selection:bg-blue-500/30 relative">
      {/* Background global com efeito de grade tecnológica */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] tech-grid z-0" />
      
      {/* Hero Section - O cabeçalho principal do site */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex justify-between items-center bg-[#0d1117]/80 backdrop-blur-md border border-blue-500/30 rounded-2xl px-6 py-4 mx-6 mt-6 shadow-[0_0_30px_rgba(37,99,235,0.15)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
        
        <div className="flex items-center gap-4 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(37,99,235,0.6)" }}
            className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] cursor-default transition-shadow"
          >
            <Activity className="w-6 h-6 text-white" />
          </motion.div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-white tracking-tight uppercase flex items-center gap-2">
              Sistema Digestório - IFRN
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Interface de Simulação Fisiológica & Nutricional</p>
          </div>
        </div>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 py-10 space-y-12 relative z-20"
      >
        
        {/* Seção 1: Entrada do Alimento (Pesquisa) */}
        <motion.section variants={itemVariants} id="simulator">
          <div className="text-left mb-6 relative pl-4 border-l-2 border-blue-500/50">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] rounded-sm"></span> 
              1. Input Nutricional
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Consulte as comidas disponíveis tradicionalmente no campus. Pesquise um item servido (ex: "Cuscuz", "Frango").
            </p>
          </div>
          <PesquisaAlimento onSelect={setSelectedFood} />
        </motion.section>

        {/* Seção 2: Linha do tempo interativa da digestão */}
        <motion.section variants={itemVariants}>
          <div className="text-left mb-6 relative pl-4 border-l-2 border-emerald-500/50">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] rounded-sm"></span> 
              2. O Trato Gastrointestinal
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Acompanhe o caminho percorrido pelo bolo alimentar e inicie os simuladores em cada órgão. 
              {selectedFood ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-bold ml-1">[{selectedFood.name} INTEGRADO]</motion.span> : ''}
            </p>
          </div>
          <LinhaDoTempoDigestiva food={selectedFood} />
        </motion.section>

        {/* Seção 3: Tabela de Resumo Bioquímico */}
        <motion.section variants={itemVariants}>
          <div className="text-left mb-6 relative pl-4 border-l-2 border-amber-500/50">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] rounded-sm"></span> 
              3. Matriz Bioquímica
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Tabela resumo relacionando órgão, pH e enzimas.
            </p>
          </div>
          <MatrizDidatica />
        </motion.section>

      </motion.main>

      {/* Rodapé com os créditos solicitados */}
      <footer className="relative z-20 flex flex-col items-center text-center text-[10px] text-slate-500 font-mono border-t border-slate-800/50 pt-6 mt-12 pb-6 px-6 mx-6 gap-2">
        <p className="text-slate-400">Desenvolvido por: Herick Davi Azevedo Gurgel de Moraes e Pedro Lucas Araujo Fernandes, da Turma Informática 3V.</p>
        <p>IFRN Campus Ipanguaçu</p>
        <p className="text-slate-400">Professores: Cinthya Cavalcanti Florio e Joaquim Bruno Cruz Neto</p>
      </footer>
    </div>
  );
}
