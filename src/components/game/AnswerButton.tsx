import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnswerButtonProps {
  value: number;
  onClick: () => void;
  disabled?: boolean;
  state?: "idle" | "correct" | "wrong";
  index: number;
}

export function AnswerButton({ 
  value, 
  onClick, 
  disabled, 
  state = "idle",
  index 
}: AnswerButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full h-16 text-2xl font-bebas transition-all duration-200",
        "border-2 hover:scale-105 active:scale-95",
        state === "idle" && "bg-card hover:bg-primary hover:text-primary-foreground border-primary/50",
        state === "correct" && "bg-success text-success-foreground pulse-gold border-success",
        state === "wrong" && "bg-destructive text-destructive-foreground shake border-destructive"
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {value}
    </Button>
  );
}
