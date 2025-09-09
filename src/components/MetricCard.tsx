import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity, Shield, Zap, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: "activity" | "shield" | "zap" | "target";
}

const iconMap = {
  activity: Activity,
  shield: Shield,
  zap: Zap,
  target: Target,
};

export function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <IconComponent className={cn(
            "h-5 w-5 transition-colors duration-300",
            icon === "activity" && "text-primary animate-pulse",
            icon === "shield" && "text-success",
            icon === "zap" && "text-warning",
            icon === "target" && "text-accent"
          )} />
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground transition-all duration-500 animate-scale-in">
            {value}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm transition-colors duration-300",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {changeType === "positive" && <TrendingUp className="h-4 w-4 animate-pulse" />}
            {changeType === "negative" && <TrendingDown className="h-4 w-4 animate-pulse" />}
            <span className="animate-fade-in">{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}