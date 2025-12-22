import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnswerButtonProps {
  value: number;
  onClick: () => void;
  disabled?: boolean;
  state?: "idle" | "correct" | "wrong";
  index: number;
}

const buttonColors = [
  {
    bg: "bg-answer-1",
    border: "border-answer-1",
    glow: "answer-glow-1",
    hover: "hover:brightness-110",
  },
  {
    bg: "bg-answer-2", 
    border: "border-answer-2",
    glow: "answer-glow-2",
    hover: "hover:brightness-110",
  },
  {
    bg: "bg-answer-3",
    border: "border-answer-3", 
    glow: "answer-glow-3",
    hover: "hover:brightness-110",
  },
  {
    bg: "bg-answer-4",
    border: "border-answer-4",
    glow: "answer-glow-4",
    hover: "hover:brightness-110",
  },
];

export function AnswerButton({ 
  value, 
  onClick, 
  disabled, 
  state = "idle",
  index 
}: AnswerButtonProps) {
  const colors = buttonColors[index % buttonColors.length];

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full h-20 md:h-24 text-5xl md:text-6xl font-bebas transition-all duration-200",
        "border-4 hover:scale-105 active:scale-95 relative overflow-hidden",
        state === "idle" && [
          colors.bg,
          colors.border,
          colors.glow,
          colors.hover,
          "text-background",
        ],
        state === "correct" && [
          "bg-gyro text-background pulse-gold border-gyro",
          "shadow-[0_0_40px_hsl(140,80%,50%/0.8)]",
        ],
        state === "wrong" && [
          "bg-destructive text-destructive-foreground shake border-destructive",
          "shadow-[0_0_40px_hsl(0,85%,55%/0.8)]",
        ]
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Menacing effect on hover */}
      <span className="absolute -top-1 -right-1 text-lg opacity-0 group-hover:opacity-70 animate-menacing font-bebas">
        ゴ
      </span>
      
      {/* Number with shadow for better visibility */}
      <span className="relative z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
        {value}
      </span>
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </Button>
  );
}
