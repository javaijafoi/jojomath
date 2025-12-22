// Steel Ball Run Game Data

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
}

export interface RaceStage {
  id: number;
  name: string;
  distance: number; // km from start
  description: string;
}

// Stands from Steel Ball Run
export const stands: Stand[] = [
  {
    id: "tusk-act1",
    name: "Tusk ACT 1",
    user: "Johnny Joestar",
    description: "Nail bullets with rotational energy",
    color: "hsl(210, 80%, 55%)",
  },
  {
    id: "tusk-act4",
    name: "Tusk ACT 4",
    user: "Johnny Joestar",
    description: "Infinite rotation power",
    color: "hsl(210, 90%, 60%)",
  },
  {
    id: "ball-breaker",
    name: "Ball Breaker",
    user: "Gyro Zeppeli",
    description: "Golden Spin manifestation",
    color: "hsl(145, 70%, 45%)",
  },
  {
    id: "scary-monsters",
    name: "Scary Monsters",
    user: "Diego Brando",
    description: "Transform into dinosaurs",
    color: "hsl(0, 75%, 50%)",
  },
  {
    id: "d4c",
    name: "D4C - Love Train",
    user: "Funny Valentine",
    description: "Dimensional travel and misfortune redirection",
    color: "hsl(280, 60%, 50%)",
  },
  {
    id: "cream-starter",
    name: "Cream Starter",
    user: "Hot Pants",
    description: "Flesh manipulation spray",
    color: "hsl(340, 60%, 55%)",
  },
  {
    id: "in-a-silent-way",
    name: "In a Silent Way",
    user: "Sandman",
    description: "Sound manipulation as physical attacks",
    color: "hsl(35, 70%, 50%)",
  },
  {
    id: "mandom",
    name: "Mandom",
    user: "Ringo Roadagain",
    description: "Rewind time by 6 seconds",
    color: "hsl(200, 50%, 40%)",
  },
  {
    id: "catch-the-rainbow",
    name: "Catch the Rainbow",
    user: "Blackmore",
    description: "Control and solidify raindrops",
    color: "hsl(220, 60%, 60%)",
  },
  {
    id: "civil-war",
    name: "Civil War",
    user: "Axl RO",
    description: "Materialize discarded things and guilt",
    color: "hsl(180, 40%, 45%)",
  },
  {
    id: "ticket-to-ride",
    name: "Ticket to Ride",
    user: "Lucy Steel",
    description: "Miraculous protection",
    color: "hsl(45, 90%, 60%)",
  },
  {
    id: "oh-lonesome-me",
    name: "Oh! Lonesome Me",
    user: "Mountain Tim",
    description: "Rope manipulation and body separation",
    color: "hsl(25, 60%, 45%)",
  },
];

// Playable and CPU characters
export const characters: Character[] = [
  {
    id: "johnny",
    name: "Johnny Joestar",
    stand: stands.find(s => s.id === "tusk-act4")!,
    avatar: "🏇",
    isPlayable: true,
  },
  {
    id: "gyro",
    name: "Gyro Zeppeli",
    stand: stands.find(s => s.id === "ball-breaker")!,
    avatar: "🎱",
    isPlayable: true,
  },
  {
    id: "diego",
    name: "Diego Brando",
    stand: stands.find(s => s.id === "scary-monsters")!,
    avatar: "🦖",
    isPlayable: false, // CPU opponent
  },
  {
    id: "hot-pants",
    name: "Hot Pants",
    stand: stands.find(s => s.id === "cream-starter")!,
    avatar: "✝️",
    isPlayable: true,
  },
];

// Race stages based on Steel Ball Run
export const raceStages: RaceStage[] = [
  { id: 1, name: "San Diego", distance: 0, description: "Starting point" },
  { id: 2, name: "Arizona Desert", distance: 1500, description: "First stage - 15,000 meters" },
  { id: 3, name: "Monument Valley", distance: 2800, description: "Second stage" },
  { id: 4, name: "Rocky Mountains", distance: 4200, description: "Third stage - Mountain crossing" },
  { id: 5, name: "Kansas City", distance: 5500, description: "Fourth stage" },
  { id: 6, name: "Chicago", distance: 6800, description: "Fifth stage" },
  { id: 7, name: "Philadelphia", distance: 8000, description: "Sixth stage" },
  { id: 8, name: "New York", distance: 9000, description: "Final destination!" },
];

export const TOTAL_RACE_DISTANCE = 9000; // Simplified distance units

// Math operations
export type Operation = '+' | '-' | '×' | '÷';

export const operations: Operation[] = ['+', '-', '×', '÷'];

// Generate a math problem
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

  // Generate wrong options close to the answer
  const wrongOptions = new Set<number>();
  while (wrongOptions.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = answer + offset;
    if (wrongAnswer !== answer && wrongAnswer >= 0) {
      wrongOptions.add(wrongAnswer);
    }
  }

  const options = shuffleArray([answer, ...Array.from(wrongOptions)]);

  // Assign random stands to cards
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
