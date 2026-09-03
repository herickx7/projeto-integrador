// ==========================================
// Matriz Didática (Resumo Bioquímico).
// Exibe uma tabela com o resumo dos órgãos, pH e enzimas 
// para facilitar a revisão dos alunos.
// ==========================================

import { digestiveOrgans } from '../data';
import { motion } from 'motion/react';

export default function DidacticMatrix() {
  return (
    <div className="bg-[#0d1117]/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.3)] relative">
      {/* Decorative tech background */}
      <div className="absolute inset-0 opacity-10 tech-grid pointer-events-none" />

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left text-[11px] min-w-[900px]">
          <thead className="bg-[#161b22] text-slate-400 font-mono">
            <tr>
              <th className="p-4 border-b border-slate-700 font-mono text-[10px] uppercase tracking-widest text-blue-400">Órgão</th>
              <th className="p-4 border-b border-slate-700 font-mono text-[10px] uppercase tracking-widest">pH Ótimo</th>
              <th className="p-4 border-b border-slate-700 font-mono text-[10px] uppercase tracking-widest">Enzimas / Secreções</th>
              <th className="p-4 border-b border-slate-700 font-mono text-[10px] uppercase tracking-widest">Substrato → Produto</th>
              <th className="p-4 border-b border-slate-700 font-mono text-[10px] uppercase tracking-widest w-1/3">Relação Fisiológica / Nutrição</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 divide-y divide-slate-800/50">
            {digestiveOrgans.map((organ, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={organ.id} 
                className="hover:bg-blue-500/10 transition-colors group relative"
              >
                {/* Hover indicator line */}
                <td className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                
                <td className="p-4 font-semibold text-white whitespace-nowrap pl-5 glow-text group-hover:text-blue-300 transition-colors">{organ.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded border ${organ.color.split(' ')[1]} ${organ.color.split(' ')[0]} ${organ.color.split(' ')[2]} font-mono text-[9px] shadow-inner`}>
                    {organ.ph.split(' ')[0]}
                  </span>
                </td>
                <td className="p-4 font-mono text-[10px] text-blue-400">
                  <ul className="flex flex-col gap-1.5">
                    {organ.enzymes.map((e, i) => (
                      <li key={i} className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-500/80 before:rounded-sm before:shadow-[0_0_5px_rgba(59,130,246,0.8)]">
                        {e}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 text-xs text-emerald-400 font-mono font-medium">{organ.action}</td>
                <td className="p-4 text-[11px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{organ.nutrition}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
