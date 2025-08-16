import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NetworkStatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

export function NetworkStatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon 
}: NetworkStatsCardProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-dark border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn(
          "text-xs",
          changeType === "positive" && "text-success",
          changeType === "negative" && "text-destructive",
          changeType === "neutral" && "text-muted-foreground"
        )}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}