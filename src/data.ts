import { OrganData } from './types';

export const digestiveOrgans: OrganData[] = [
  {
    id: 'mouth',
    name: 'Boca e Faringe',
    ph: '6.8 - 7.2 (Neutro)',
    enzymes: ['Amilase Salivar (Ptialina)', 'Lipase Lingual'],
    action: 'Amido → Maltose, Lipídios → Diglicerídeos',
    nutrition: 'Início da quebra de carboidratos complexos. A mastigação aumenta a área de contato para a ação enzimática posterior.',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
  },
  {
    id: 'stomach',
    name: 'Estômago',
    ph: '1.5 - 2.0 (Muito Ácido)',
    enzymes: ['Pepsina', 'Lipase Gástrica'],
    action: 'Proteínas → Peptídeos, Lipídios → Diglicerídeos',
    nutrition: 'O ambiente ácido causa desnaturação das proteínas da dieta, expondo ligações peptídicas para a pepsina. Início da quebra proteica.',
    color: 'bg-red-500/10 border-red-500/30 text-red-400'
  },
  {
    id: 'liver_pancreas',
    name: 'Fígado e Pâncreas (Anexos)',
    ph: '7.5 - 8.0 (Alcalino)',
    enzymes: ['Bile (Fígado - Emulsificante)', 'Amilase, Tripsina, Lipase Pancreática'],
    action: 'Gorduras → Micelas, Peptídeos → Aminoácidos, Amido → Maltose',
    nutrition: 'A bile emulsifica grandes gotas de gordura (facilitando a lipase). O suco pancreático neutraliza a acidez e lança a maior carga enzimática do trato.',
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'small_intestine',
    name: 'Intestino Delgado',
    ph: '7.0 - 8.0 (Levemente Alcalino)',
    enzymes: ['Maltase', 'Sacarase', 'Lactase', 'Peptidases'],
    action: 'Dissacarídeos → Monossacarídeos, Peptídeos → Aminoácidos',
    nutrition: 'Principal local de digestão final (suco entérico) e absorção em massa de macronutrientes pelas vilosidades e microvilosidades para a corrente sanguínea.',
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'large_intestine',
    name: 'Intestino Grosso',
    ph: '5.5 - 7.0 (Levemente Ácido a Neutro)',
    enzymes: ['Nenhuma (Ação da Flora Bacteriana)'],
    action: 'Fibras → Ácidos Graxos de Cadeia Curta (AGCC)',
    nutrition: 'Absorção de água, minerais (eletrólitos) e síntese de vitaminas (K, complexo B) por simbiose bacteriana. Formação do bolo fecal.',
    color: 'bg-orange-500/10 border-orange-500/30 text-orange-400'
  }
];
