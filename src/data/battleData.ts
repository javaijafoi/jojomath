// JoJo Math Fight - Battle Mode Data
import { fighterImages } from '@/assets/fighters';
import { generateMathProblem, MathProblem, Stand, stands } from './gameData';

export interface Fighter {
  id: string;
  name: string;
  stand: string;
  avatar: string;
  maxHp: number;
  attackPower: number;
  specialAbility: string;
  quote: string;
  victoryQuote: string;
  defeatQuote: string;
}

export interface BattleState {
  playerHp: number;
  cpuHp: number;
  combo: number;
  specialMeter: number;
  isSpecialReady: boolean;
}

// Fighters available in battle mode
export const fighters: Fighter[] = [
  {
    id: "jotaro",
    name: "Jotaro Kujo",
    stand: "Star Platinum",
    avatar: fighterImages.josuke, // Using Josuke as placeholder
    maxHp: 100,
    attackPower: 12,
    specialAbility: "Time Stop - Dobra o dano do próximo ataque",
    quote: "「Yare yare daze...」",
    victoryQuote: "「Você não pode derrotar Star Platinum!」",
    defeatQuote: "「Impossível...」",
  },
  {
    id: "josuke",
    name: "Josuke Higashikata",
    stand: "Crazy Diamond",
    avatar: fighterImages.josuke,
    maxHp: 110,
    attackPower: 10,
    specialAbility: "DORA! - Recupera 20 HP ao acertar combo de 5",
    quote: "「Não fale mal do meu cabelo!」",
    victoryQuote: "「DORARARARA! Ganhei!」",
    defeatQuote: "「Meu cabelo... não foi isso...」",
  },
  {
    id: "bucciarati",
    name: "Bruno Bucciarati",
    stand: "Sticky Fingers",
    avatar: fighterImages.bucciarati,
    maxHp: 100,
    attackPower: 11,
    specialAbility: "ARI ARI ARI! - Triplo dano em combo de 5",
    quote: "「Arrivederci!」",
    victoryQuote: "「Este é o gosto de um mentiroso!」",
    defeatQuote: "「Giorno... continue...」",
  },
  {
    id: "kira",
    name: "Yoshikage Kira",
    stand: "Killer Queen",
    avatar: fighterImages.kira,
    maxHp: 95,
    attackPower: 13,
    specialAbility: "Bites the Dust - Reverte dano se errar",
    quote: "「Eu só quero uma vida tranquila...」",
    victoryQuote: "「Killer Queen já tocou você!」",
    defeatQuote: "「Minha vida tranquila...」",
  },
  {
    id: "rohan",
    name: "Rohan Kishibe",
    stand: "Heaven's Door",
    avatar: fighterImages.rohan,
    maxHp: 85,
    attackPower: 14,
    specialAbility: "Heaven's Door - Revela resposta correta 1x",
    quote: "「Eu recuso!」",
    victoryQuote: "「Esta foi uma excelente referência!」",
    defeatQuote: "「Como artista, isso é inaceitável!」",
  },
  {
    id: "johnny",
    name: "Johnny Joestar",
    stand: "Tusk ACT 4",
    avatar: fighterImages.johnny,
    maxHp: 100,
    attackPower: 15,
    specialAbility: "Infinite Rotation - Ignora defesa do inimigo",
    quote: "「A rotação infinita!」",
    victoryQuote: "「Arigato, Gyro...」",
    defeatQuote: "「Eu ainda não posso me levantar...」",
  },
  {
    id: "gyro",
    name: "Gyro Zeppeli",
    stand: "Ball Breaker",
    avatar: fighterImages.gyro,
    maxHp: 105,
    attackPower: 12,
    specialAbility: "Golden Spin - Crítico garantido no próximo acerto",
    quote: "「Nyoho~!」",
    victoryQuote: "「Esta é a técnica Zeppeli!」",
    defeatQuote: "「Johnny... continue correndo!」",
  },
  {
    id: "diego",
    name: "Diego Brando",
    stand: "Scary Monsters",
    avatar: fighterImages.diego,
    maxHp: 100,
    attackPower: 13,
    specialAbility: "WRYYY! - Ataque extra quando HP baixo",
    quote: "「WRYYYYY!」",
    victoryQuote: "「Eu sou o vencedor!」",
    defeatQuote: "「Useless... useless!」",
  },
  {
    id: "valentine",
    name: "Funny Valentine",
    stand: "D4C - Love Train",
    avatar: fighterImages.valentine,
    maxHp: 120,
    attackPower: 10,
    specialAbility: "Love Train - Reduz dano recebido em 50%",
    quote: "「Dojyaaan~!」",
    victoryQuote: "「Pela América, eu venci!」",
    defeatQuote: "「Meus ideais... foram em vão?」",
  },
  {
    id: "pucci",
    name: "Enrico Pucci",
    stand: "Made in Heaven",
    avatar: fighterImages.pucci,
    maxHp: 90,
    attackPower: 14,
    specialAbility: "Time Acceleration - Timer mais rápido para CPU",
    quote: "「O destino me escolheu!」",
    victoryQuote: "「O céu está ao meu alcance!」",
    defeatQuote: "「Isso não pode ser o destino...」",
  },
  {
    id: "kars",
    name: "Kars",
    stand: "Ultimate Life Form",
    avatar: fighterImages.kars,
    maxHp: 130,
    attackPower: 9,
    specialAbility: "Perfect Being - Regenera HP passivamente",
    quote: "「Eu sou o ser supremo!」",
    victoryQuote: "「Humanos são inferiores!」",
    defeatQuote: "「Impossível! EU SOU PERFEITO!」",
  },
];

// Get random fighters for selection
export function getRandomFighters(count: number = 4): Fighter[] {
  const shuffled = [...fighters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, fighters.length));
}

// Get a random CPU opponent
export function getRandomCpuOpponent(excludeId?: string): Fighter {
  const available = fighters.filter(f => f.id !== excludeId);
  return available[Math.floor(Math.random() * available.length)];
}

// Battle quotes
export const battleStartQuotes = [
  "「FIGHT!」",
  "「Round 1... FIGHT!」",
  "「Stand Battle... START!」",
  "「Here we go!」",
];

export const criticalHitQuotes = [
  "「ORA ORA ORA!」",
  "「MUDA MUDA MUDA!」",
  "「DORARARARA!」",
  "「ARI ARI ARI!」",
];

export const comboQuotes = [
  "「COMBO x2!」",
  "「COMBO x3!」",
  "「COMBO x4!」",
  "「COMBO x5! SPECIAL READY!」",
];

export const knockoutQuotes = [
  "「K.O.!」",
  "「RETIRED!」",
  "「FINISH!」",
];

// Damage calculation
export const BASE_DAMAGE = 10;
export const COMBO_BONUS = 2;
export const SPECIAL_MULTIPLIER = 3;
export const WRONG_ANSWER_DAMAGE = 15;
export const TIMEOUT_DAMAGE = 20;
export const MAX_COMBO_FOR_SPECIAL = 5;

// Re-export math problem generation for battle mode
export { generateMathProblem, type MathProblem };
