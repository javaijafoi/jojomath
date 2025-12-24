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
        "w-full h-12 md:h-14 text-3xl md:text-4xl font-bebas transition-all duration-200",
        "border-2 rounded-lg hover:scale-105 active:scale-95 relative overflow-hidden",
        state === "idle" && [
          colors.bg,
          colors.border,
          colors.hover,
          "text-background",
          "shadow-[0_0_12px_hsl(var(--answer-" + (index + 1) + ")/0.4)]",
        ],
        state === "correct" && [
          "bg-gyro text-gyro-foreground border-gyro",
          "shadow-[0_0_25px_hsl(140,80%,50%/0.7)]",
        ],
        state === "wrong" && [
          "bg-destructive text-destructive-foreground border-destructive",
          "shadow-[0_0_25px_hsl(0,85%,55%/0.7)]",
        ]
      )}
    >
      {/* Number with shadow for better visibility */}
      <span className="relative z-10 drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]">
        {value}
      </span>
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
    </Button>
  );
}
