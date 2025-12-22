import { cn } from "@/lib/utils";

interface MenacingTextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function MenacingText({ children, className, size = "md" }: MenacingTextProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  return (
    <div className="relative inline-block">
      <span 
        className={cn(
          "font-bebas tracking-wider menacing",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </span>
      {/* Floating menacing symbols */}
      <span 
        className="absolute -top-4 -right-4 text-menacing font-bebas text-2xl animate-menacing opacity-80"
      >
        ゴ
      </span>
      <span 
        className="absolute -bottom-2 -left-6 text-menacing font-bebas text-xl animate-menacing opacity-70"
        style={{ animationDelay: "0.3s" }}
      >
        ゴ
      </span>
      <span 
        className="absolute top-0 -left-8 text-menacing font-bebas text-lg animate-menacing opacity-60"
        style={{ animationDelay: "0.6s" }}
      >
        ゴ
      </span>
    </div>
  );
}
