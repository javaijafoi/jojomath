// Steel Ball Run - Dados do Jogo
import { characterImages } from '@/assets/characters';

export interface Stand {
  id: string;
  name: string;
  user: string;
  description: string;
  color: string;
  image: string;
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

// Stands da Steel Ball Run com imagens locais dos PERSONAGENS
export const stands: Stand[] = [
  {
    id: "tusk-act1",
    name: "Tusk ACT 1",
    user: "Johnny Joestar",
    description: "Balas de unha com energia rotacional",
    color: "hsl(200, 100%, 55%)",
    image: characterImages.johnny,
  },
  {
    id: "tusk-act4",
    name: "Tusk ACT 4",
    user: "Johnny Joestar",
    description: "O poder da rotação infinita",
    color: "hsl(200, 100%, 60%)",
    image: characterImages.johnny,
  },
  {
    id: "ball-breaker",
    name: "Ball Breaker",
    user: "Gyro Zeppeli",
    description: "Manifestação do Spin Dourado",
    color: "hsl(140, 80%, 50%)",
    image: characterImages.gyro,
  },
  {
    id: "scary-monsters",
    name: "Scary Monsters",
    user: "Diego Brando",
    description: "Transformação em dinossauros",
    color: "hsl(0, 85%, 55%)",
    image: characterImages.diego,
  },
  {
    id: "d4c",
    name: "D4C - Love Train",
    user: "Funny Valentine",
    description: "Viagem dimensional e redirecionamento de infortúnio",
    color: "hsl(280, 70%, 55%)",
    image: characterImages.valentine,
  },
  {
    id: "cream-starter",
    name: "Cream Starter",
    user: "Hot Pants",
    description: "Spray de manipulação de carne",
    color: "hsl(330, 70%, 60%)",
    image: characterImages.hotpants,
  },
  {
    id: "in-a-silent-way",
    name: "In a Silent Way",
    user: "Sandman",
    description: "Manipulação de som como ataques físicos",
    color: "hsl(35, 80%, 55%)",
    image: characterImages.sandman,
  },
  {
    id: "mandom",
    name: "Mandom",
    user: "Ringo Roadagain",
    description: "Retrocede o tempo em 6 segundos",
    color: "hsl(200, 60%, 45%)",
    image: characterImages.ringo,
  },
  {
    id: "catch-the-rainbow",
    name: "Catch the Rainbow",
    user: "Blackmore",
    description: "Controla e solidifica gotas de chuva",
    color: "hsl(220, 70%, 65%)",
    image: characterImages.blackmore,
  },
  {
    id: "hey-ya",
    name: "Hey Ya!",
    user: "Pocoloco",
    description: "Orienta seu usuário para o caminho da sorte",
    color: "hsl(50, 90%, 55%)",
    image: characterImages.pocoloco,
  },
  {
    id: "oh-lonesome-me",
    name: "Oh! Lonesome Me",
    user: "Mountain Tim",
    description: "Manipulação de corda e separação corporal",
    color: "hsl(25, 70%, 50%)",
    image: characterImages.tim,
  },
  {
    id: "ticket-to-ride",
    name: "Ticket to Ride",
    user: "Lucy Steel",
    description: "Proteção milagrosa",
    color: "hsl(45, 100%, 65%)",
    image: characterImages.lucy,
  },
  {
    id: "wrecking-ball",
    name: "Wrecking Ball",
    user: "Wekapipo",
    description: "Esferas de aço que causam cegueira lateral esquerda",
    color: "hsl(0, 0%, 60%)",
    image: characterImages.wekapipo,
  },
];

// Todos os personagens disponíveis
export const characters: Character[] = [
  {
    id: "johnny",
    name: "Johnny Joestar",
    stand: stands.find(s => s.id === "tusk-act4")!,
    avatar: characterImages.johnny,
    isPlayable: true,
    quote: "Eu vou continuar avançando... não importa o quê!",
  },
  {
    id: "gyro",
    name: "Gyro Zeppeli",
    stand: stands.find(s => s.id === "ball-breaker")!,
    avatar: characterImages.gyro,
    isPlayable: true,
    quote: "Nyoho~! A lição número 5, Johnny... RESPEITE!",
  },
  {
    id: "hot-pants",
    name: "Hot Pants",
    stand: stands.find(s => s.id === "cream-starter")!,
    avatar: characterImages.hotpants,
    isPlayable: true,
    quote: "Eu tenho meus próprios pecados a carregar...",
  },
  {
    id: "mountain-tim",
    name: "Mountain Tim",
    stand: stands.find(s => s.id === "oh-lonesome-me")!,
    avatar: characterImages.tim,
    isPlayable: true,
    quote: "Eu sou um cowboy de verdade!",
  },
  {
    id: "sandman",
    name: "Sandman",
    stand: stands.find(s => s.id === "in-a-silent-way")!,
    avatar: characterImages.sandman,
    isPlayable: true,
    quote: "Eu corro mais rápido que qualquer cavalo!",
  },
  {
    id: "pocoloco",
    name: "Pocoloco",
    stand: stands.find(s => s.id === "hey-ya")!,
    avatar: characterImages.pocoloco,
    isPlayable: true,
    quote: "Eu nasci sortudo! A sorte está do meu lado!",
  },
  {
    id: "wekapipo",
    name: "Wekapipo",
    stand: stands.find(s => s.id === "wrecking-ball")!,
    avatar: characterImages.wekapipo,
    isPlayable: true,
    quote: "Estas esferas são o símbolo do meu poder!",
  },
  {
    id: "lucy",
    name: "Lucy Steel",
    stand: stands.find(s => s.id === "ticket-to-ride")!,
    avatar: characterImages.lucy,
    isPlayable: true,
    quote: "Eu farei qualquer coisa para proteger quem eu amo!",
  },
  {
    id: "diego",
    name: "Diego Brando",
    stand: stands.find(s => s.id === "scary-monsters")!,
    avatar: characterImages.diego,
    isPlayable: false,
    quote: "WRYYYYY! Eu sou o vencedor desta corrida!",
  },
];

// Função para sortear personagens aleatórios para seleção
export function getRandomPlayableCharacters(count: number = 4): Character[] {
  const playable = characters.filter(c => c.isPlayable);
  const shuffled = [...playable].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, playable.length));
}

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

// Gerar problema matemático - APENAS NÚMEROS DE 1 A 9
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

export function generateMathProblem(): MathProblem {
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let cardA: number;
  let cardB: number;
  let answer: number;

  // Usar apenas números de 1 a 9
  switch (operation) {
    case '+':
      cardA = Math.floor(Math.random() * 9) + 1; // 1-9
      cardB = Math.floor(Math.random() * 9) + 1; // 1-9
      answer = cardA + cardB;
      break;
    case '-':
      cardA = Math.floor(Math.random() * 9) + 1; // 1-9
      cardB = Math.floor(Math.random() * cardA) + 1; // 1 até cardA
      answer = cardA - cardB;
      break;
    case '×':
      cardA = Math.floor(Math.random() * 9) + 1; // 1-9
      cardB = Math.floor(Math.random() * 9) + 1; // 1-9
      answer = cardA * cardB;
      break;
    case '÷':
      cardB = Math.floor(Math.random() * 8) + 1; // 1-8 (divisor)
      answer = Math.floor(Math.random() * 9) + 1; // 1-9 (resultado)
      cardA = cardB * answer; // cardA pode ser maior que 9
      // Se cardA > 9, ajustar para manter visual simples
      if (cardA > 9) {
        cardB = Math.floor(Math.random() * 3) + 1; // 1-3
        answer = Math.floor(Math.random() * 3) + 1; // 1-3
        cardA = cardB * answer;
      }
      break;
  }

  // Gerar opções erradas próximas à resposta
  const wrongOptions = new Set<number>();
  while (wrongOptions.size < 3) {
    const offset = Math.floor(Math.random() * 6) - 3;
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
  "「Nyoho~! Essa é a técnica do Zeppeli!」",
];

export const defeatQuotes = [
  "「Isso é... o destino?」",
  "「A corrida ainda não acabou...」",
  "「Eu vou me levantar de novo!」",
  "「Próxima vez... eu vou vencer!」",
  "「WRYYYY! Diego venceu!」",
];

export const correctAnswerQuotes = [
  "「GO! GO! GO!」",
  "「ORA ORA ORA!」",
  "「SPIN!」",
  "「Nyoho~!」",
  "「Excelente!」",
  "「A rotação é perfeita!」",
  "「Isso é o Spin!」",
];

export const wrongAnswerQuotes = [
  "「WRYYYYY!」",
  "「Useless... useless!」",
  "「Diego avança!」",
  "「Scary Monsters!」",
  "「Muda muda muda!」",
];

// Citações de incentivo durante o jogo
export const encouragementQuotes = [
  "「Confie na rotação!」",
  "「O Spin vai te guiar!」",
  "「Acredite no caminho dourado!」",
  "「Nyoho~! Você consegue!」",
  "「A rotação infinita está dentro de você!」",
  "「Pense como um cavaleiro!」",
  "「O destino está do seu lado!」",
  "「Essa é a técnica Zeppeli!」",
];

// Citações de provocação do Diego
export const diegoTaunts = [
  "「Você é muito lento, patético!」",
  "「Eu serei o primeiro a cruzar a linha!」",
  "「WRYYY! Seus esforços são inúteis!」",
  "「Scary Monsters vai te devorar!」",
  "「Você nunca vai me alcançar!」",
];
