// Steel Ball Run - Dados do Jogo

export interface Stand {
  id: string;
  name: string;
  user: string;
  description: string;
  color: string;
}

export interface Character {
  id: string;
  name: string;
  stand: Stand;
  avatar: string;
  isPlayable: boolean;
  quote: string;
}

export interface RaceStage {
  id: number;
  name: string;
  distance: number;
  description: string;
}

// Stands da Steel Ball Run
export const stands: Stand[] = [
  {
    id: "tusk-act1",
    name: "Tusk ACT 1",
    user: "Johnny Joestar",
    description: "Balas de unha com energia rotacional",
    color: "hsl(200, 100%, 55%)",
  },
  {
    id: "tusk-act4",
    name: "Tusk ACT 4",
    user: "Johnny Joestar",
    description: "O poder da rotação infinita",
    color: "hsl(200, 100%, 60%)",
  },
  {
    id: "ball-breaker",
    name: "Ball Breaker",
    user: "Gyro Zeppeli",
    description: "Manifestação do Spin Dourado",
    color: "hsl(140, 80%, 50%)",
  },
  {
    id: "scary-monsters",
    name: "Scary Monsters",
    user: "Diego Brando",
    description: "Transformação em dinossauros",
    color: "hsl(0, 85%, 55%)",
  },
  {
    id: "d4c",
    name: "D4C - Love Train",
    user: "Funny Valentine",
    description: "Viagem dimensional e redirecionamento de infortúnio",
    color: "hsl(280, 70%, 55%)",
  },
  {
    id: "cream-starter",
    name: "Cream Starter",
    user: "Hot Pants",
    description: "Spray de manipulação de carne",
    color: "hsl(330, 70%, 60%)",
  },
  {
    id: "in-a-silent-way",
    name: "In a Silent Way",
    user: "Sandman",
    description: "Manipulação de som como ataques físicos",
    color: "hsl(35, 80%, 55%)",
  },
  {
    id: "mandom",
    name: "Mandom",
    user: "Ringo Roadagain",
    description: "Retrocede o tempo em 6 segundos",
    color: "hsl(200, 60%, 45%)",
  },
  {
    id: "catch-the-rainbow",
    name: "Catch the Rainbow",
    user: "Blackmore",
    description: "Controla e solidifica gotas de chuva",
    color: "hsl(220, 70%, 65%)",
  },
  {
    id: "civil-war",
    name: "Civil War",
    user: "Axl RO",
    description: "Materializa coisas descartadas e culpa",
    color: "hsl(180, 50%, 50%)",
  },
  {
    id: "ticket-to-ride",
    name: "Ticket to Ride",
    user: "Lucy Steel",
    description: "Proteção milagrosa",
    color: "hsl(45, 100%, 65%)",
  },
  {
    id: "oh-lonesome-me",
    name: "Oh! Lonesome Me",
    user: "Mountain Tim",
    description: "Manipulação de corda e separação corporal",
    color: "hsl(25, 70%, 50%)",
  },
];

// Personagens jogáveis e CPU
export const characters: Character[] = [
  {
    id: "johnny",
    name: "Johnny Joestar",
    stand: stands.find(s => s.id === "tusk-act4")!,
    avatar: "https://static.jojowiki.com/images/thumb/3/3c/latest/20210619211157/Johnny_Joestar_Infobox_Manga.png/270px-Johnny_Joestar_Infobox_Manga.png",
    isPlayable: true,
    quote: "Eu vou continuar avançando... não importa o quê!",
  },
  {
    id: "gyro",
    name: "Gyro Zeppeli",
    stand: stands.find(s => s.id === "ball-breaker")!,
    avatar: "https://static.jojowiki.com/images/thumb/1/11/latest/20191015214506/Gyro_Zeppeli_Infobox_Manga.png/270px-Gyro_Zeppeli_Infobox_Manga.png",
    isPlayable: true,
    quote: "Nyoho~! A lição número 5, Johnny... RESPEITE!",
  },
  {
    id: "diego",
    name: "Diego Brando",
    stand: stands.find(s => s.id === "scary-monsters")!,
    avatar: "https://static.jojowiki.com/images/thumb/e/ef/latest/20191015214412/Diego_Brando_Infobox_Manga.png/270px-Diego_Brando_Infobox_Manga.png",
    isPlayable: false,
    quote: "WRYYYYY! Eu sou o vencedor desta corrida!",
  },
  {
    id: "hot-pants",
    name: "Hot Pants",
    stand: stands.find(s => s.id === "cream-starter")!,
    avatar: "https://static.jojowiki.com/images/thumb/6/6c/latest/20191015214421/Hot_Pants_Infobox_Manga.png/270px-Hot_Pants_Infobox_Manga.png",
    isPlayable: true,
    quote: "Eu tenho meus próprios pecados a carregar...",
  },
];

// Etapas da corrida baseadas na Steel Ball Run
export const raceStages: RaceStage[] = [
  { id: 1, name: "San Diego", distance: 0, description: "Ponto de partida" },
  { id: 2, name: "Deserto do Arizona", distance: 1500, description: "Primeira etapa - 15.000 metros" },
  { id: 3, name: "Monument Valley", distance: 2800, description: "Segunda etapa" },
  { id: 4, name: "Montanhas Rochosas", distance: 4200, description: "Terceira etapa - Travessia das montanhas" },
  { id: 5, name: "Kansas City", distance: 5500, description: "Quarta etapa" },
  { id: 6, name: "Chicago", distance: 6800, description: "Quinta etapa" },
  { id: 7, name: "Filadélfia", distance: 8000, description: "Sexta etapa" },
  { id: 8, name: "Nova York", distance: 9000, description: "Destino final!" },
];

export const TOTAL_RACE_DISTANCE = 9000;

// Operações matemáticas
export type Operation = '+' | '-' | '×' | '÷';

export const operations: Operation[] = ['+', '-', '×', '÷'];

// Gerar problema matemático
export interface MathProblem {
  cardA: number;
  cardB: number;
  operation: Operation;
  answer: number;
  options: number[];
  standA: Stand;
  standB: Stand;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateMathProblem(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): MathProblem {
  let maxNum: number;
  
  switch (difficulty) {
    case 'easy':
      maxNum = 10;
      break;
    case 'medium':
      maxNum = 12;
      break;
    case 'hard':
      maxNum = 15;
      break;
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];
  let cardA: number;
  let cardB: number;
  let answer: number;

  switch (operation) {
    case '+':
      cardA = Math.floor(Math.random() * maxNum) + 1;
      cardB = Math.floor(Math.random() * maxNum) + 1;
      answer = cardA + cardB;
      break;
    case '-':
      cardA = Math.floor(Math.random() * maxNum) + 1;
      cardB = Math.floor(Math.random() * cardA) + 1;
      answer = cardA - cardB;
      break;
    case '×':
      cardA = Math.floor(Math.random() * maxNum) + 1;
      cardB = Math.floor(Math.random() * 10) + 1;
      answer = cardA * cardB;
      break;
    case '÷':
      cardB = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      cardA = cardB * answer;
      break;
  }

  // Gerar opções erradas próximas à resposta
  const wrongOptions = new Set<number>();
  while (wrongOptions.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = answer + offset;
    if (wrongAnswer !== answer && wrongAnswer >= 0) {
      wrongOptions.add(wrongAnswer);
    }
  }

  const options = shuffleArray([answer, ...Array.from(wrongOptions)]);

  // Atribuir stands aleatórios às cartas
  const shuffledStands = shuffleArray(stands);
  
  return {
    cardA,
    cardB,
    operation,
    answer,
    options,
    standA: shuffledStands[0],
    standB: shuffledStands[1],
  };
}

// Citações aleatórias para momentos do jogo
export const victoryQuotes = [
  "「Esta é... a rotação infinita!」",
  "「Arigato... Gyro」",
  "「Eu finalmente consegui me levantar!」",
  "「O caminho para o céu está aberto!」",
];

export const defeatQuotes = [
  "「Isso é... o destino?」",
  "「A corrida ainda não acabou...」",
  "「Eu vou me levantar de novo!」",
  "「Próxima vez... eu vou vencer!」",
];

export const correctAnswerQuotes = [
  "「GO! GO! GO!」",
  "「ORA ORA ORA!」",
  "「SPIN!」",
  "「Nyoho~!」",
  "「Excelente!」",
];

export const wrongAnswerQuotes = [
  "「WRYYYYY!」",
  "「Useless... useless!」",
  "「Diego avança!」",
  "「Scary Monsters!」",
];
