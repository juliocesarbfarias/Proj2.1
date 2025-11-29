// Em: src/data/vestibularesData.js

// 1. IMPORTE OS LOGOS QUE VOCÊ BAIXOU (no Passo 1)
//    (Ajuste os nomes dos arquivos para os nomes reais que você salvou)
import logoUnicamp from '../assets/logo-unicamp.png';
import logoFuvest from '../assets/logo-fuvest.png';
import logoUtfpr from '../assets/logo-utfpr.png';
import logoUem from '../assets/logo-uem.png';
import logoUnesp from '../assets/logo-unesp.png';

// 2. EXPORTE OS DADOS DOS CARDS
export const vestibularesData = [
  {
    id: 'unicamp',
    nome: 'UNICAMP',
    desc: 'Teste seus conhecimentos com as provas da Universidade Estadual de Campinas.',
    logo: logoUnicamp, // Usando a variável importada
  },
  {
    id: 'fuvest',
    nome: 'FUVEST',
    desc: 'Prepare-se para o vestibular da USP com simulados baseados na FUVEST.',
    logo: logoFuvest,
  },
  {
    id: 'utfpr',
    nome: 'UTFPR',
    desc: 'Simulados focados no vestibular da Universidade Tecnológica Federal do Paraná.',
    logo: logoUtfpr,
  },
  {
    id: 'uem',
    nome: 'UEM',
    desc: 'Avalie seu desempenho para as provas da Universidade Estadual de Maringá.',
    logo: logoUem,
  },
  {
    id: 'unesp',
    nome: 'UNESP',
    desc: 'Encare os desafios do vestibular da Universidade Estadual Paulista.',
    logo: logoUnesp,
  },
];