import { digestiveOrgans } from '../data';

export default function DidacticMatrix() {
  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] min-w-[900px]">
          <thead className="bg-slate-900 text-slate-400 font-mono">
            <tr>
              <th className="p-3 border-b border-slate-800 font-mono text-[10px] uppercase tracking-widest">Órgão</th>
              <th className="p-3 border-b border-slate-800 font-mono text-[10px] uppercase tracking-widest">pH Ótimo</th>
              <th className="p-3 border-b border-slate-800 font-mono text-[10px] uppercase tracking-widest">Enzimas / Secreções</th>
              <th className="p-3 border-b border-slate-800 font-mono text-[10px] uppercase tracking-widest">Substrato → Produto</th>
              <th className="p-3 border-b border-slate-800 font-mono text-[10px] uppercase tracking-widest w-1/3">Relação Fisiológica / Nutrição</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 divide-y divide-slate-800/50">
            {digestiveOrgans.map((organ) => (
              <tr key={organ.id} className="hover:bg-blue-500/5 transition-colors group">
                <td className="p-3 font-semibold text-white whitespace-nowrap">{organ.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded border ${organ.color.split(' ')[1]} ${organ.color.split(' ')[0]} ${organ.color.split(' ')[2]} font-mono text-[9px]`}>
                    {organ.ph.split(' ')[0]}
                  </span>
                </td>
                <td className="p-3 font-mono text-[10px] text-blue-400">
                  <ul className="flex flex-col gap-1">
                    {organ.enzymes.map((e, i) => (
                      <li key={i} className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-blue-500/50 before:rounded-full">
                        {e}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 text-xs text-emerald-400 font-mono">{organ.action}</td>
                <td className="p-3 text-xs text-slate-400 leading-relaxed">{organ.nutrition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
