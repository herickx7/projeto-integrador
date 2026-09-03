// ==========================================
// Base de dados local com as informações teóricas
// dos órgãos do sistema digestório. Contém os textos
// da matriz didática e da linha do tempo.
// ==========================================

import { OrganData } from './types';

export const digestiveOrgans: OrganData[] = [
  {
    id: 'mouth',
    name: 'Boca e Faringe',
    ph: '6.8 - 7.2 (Neutro)',
    enzymes: ['Amilase Salivar (Ptialina)', 'Lipase Lingual'],
    action: 'Amido → Maltose, Lipídios → Diglicerídeos',
    nutrition: 'Início da quebra de carboidratos complexos. A mastigação aumenta a área de contato para a ação enzimática posterior.',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    academicDetails: {
      cytology: 'Presença de glândulas salivares (parótida, submandibular, sublingual) compostas por ácinos serosos (produzem Ptialina) e mucosos (produzem mucina).',
      biochem: 'A amilase salivar cliva as ligações glicosídicas α(1→4) do amido de forma aleatória, produzindo oligossacarídeos, maltose e maltotriose. Inativa em pH ácido.',
      endocrine: 'Secreção salivar regulada predominantemente pelo Sistema Nervoso Autônomo (Parassimpático induz saliva aquosa e rica em enzimas; Simpático gera saliva espessa).'
    }
  },
  {
    id: 'stomach',
    name: 'Estômago',
    ph: '1.5 - 2.0 (Muito Ácido)',
    enzymes: ['Pepsina', 'Lipase Gástrica'],
    action: 'Proteínas → Peptídeos, Lipídios → Diglicerídeos',
    nutrition: 'O ambiente ácido causa desnaturação das proteínas da dieta, expondo ligações peptídicas para a pepsina. Início da quebra proteica.',
    color: 'bg-red-500/10 border-red-500/30 text-red-400',
    academicDetails: {
      cytology: 'Mucosa gástrica formada por glândulas tubulares. Células Parietais secretam HCl e fator intrínseco; Células Principais secretam pepsinogênio.',
      biochem: 'Células Parietais utilizam a bomba H+/K+ ATPase para ejetar H+. O pepsinogênio é autoclivado a pepsina no pH baixo, ativando sítios proteolíticos.',
      endocrine: 'Regulado pela Gastrina (células G, estimulam ácido), Histamina (estimula H2) e Somatostatina (inibe secreção gástrica).'
    }
  },
  {
    id: 'liver_pancreas',
    name: 'Fígado e Pâncreas (Anexos)',
    ph: '7.5 - 8.0 (Alcalino)',
    enzymes: ['Bile (Fígado - Emulsificante)', 'Amilase, Tripsina, Lipase Pancreática'],
    action: 'Gorduras → Micelas, Peptídeos → Aminoácidos, Amido → Maltose',
    nutrition: 'A bile emulsifica grandes gotas de gordura (facilitando a lipase). O suco pancreático neutraliza a acidez e lança a maior carga enzimática do trato.',
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    academicDetails: {
      cytology: 'Lóbulos hepáticos compostos por hepatócitos (síntese biliar). Pâncreas exócrino formado por ácinos serosos ricos em grânulos de zimogênio.',
      biochem: 'Ácidos biliares anfipáticos formam micelas mistas. A Tripsina pancreática (ativada pela enteropeptidase) ativa as demais pró-enzimas (quimotripsinogênio, proelastase).',
      endocrine: 'Secretina estimula pâncreas a liberar bicarbonato (alcalinizar). Colecistoquinina (CCK) induz contração da vesícula biliar e secreção enzimática.'
    }
  },
  {
    id: 'small_intestine',
    name: 'Intestino Delgado',
    ph: '7.0 - 8.0 (Levemente Alcalino)',
    enzymes: ['Maltase', 'Sacarase', 'Lactase', 'Peptidases'],
    action: 'Dissacarídeos → Monossacarídeos, Peptídeos → Aminoácidos',
    nutrition: 'Principal local de digestão final (suco entérico) e absorção em massa de macronutrientes pelas vilosidades e microvilosidades para a corrente sanguínea.',
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    academicDetails: {
      cytology: 'Mucosa dobrada em vilosidades revestidas por Enterócitos com microvilosidades ("borda em escova"), células caliciformes e células de Paneth (imunidade).',
      biochem: 'Enzimas acopladas à membrana apical quebram dissacarídeos finais. Absorção ativa via co-transportadores SGLT1 (Glicose/Na+) e difusão facilitada (GLUT5/Fructose).',
      endocrine: 'Secreção de GIP (Peptídeo Inibitório Gástrico/Incretina) e GLP-1 que preparam o pâncreas para liberar insulina antes da glicose no sangue aumentar.'
    }
  },
  {
    id: 'large_intestine',
    name: 'Intestino Grosso',
    ph: '5.5 - 7.0 (Levemente Ácido a Neutro)',
    enzymes: ['Nenhuma (Ação da Flora Bacteriana)'],
    action: 'Fibras → Ácidos Graxos de Cadeia Curta (AGCC)',
    nutrition: 'Absorção de água, minerais (eletrólitos) e síntese de vitaminas (K, complexo B) por simbiose bacteriana. Formação do bolo fecal.',
    color: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    academicDetails: {
      cytology: 'Ausência de vilosidades. Mucosa lisa com profundas criptas de Lieberkühn, alta densidade de células caliciformes para lubrificação do bolo.',
      biochem: 'Microbiota fermenta polissacarídeos não amiláceos produzindo Acetato, Propionato e Butirato, que servem de energia primária para colonócitos.',
      endocrine: 'Mecanismos de motilidade coordenados, reflexo gastrocólico mediado por nervos entéricos e serotonina local (90% produzida nas células enterocromafins).'
    }
  }
];
