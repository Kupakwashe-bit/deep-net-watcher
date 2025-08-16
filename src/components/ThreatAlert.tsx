import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatAlertProps {
  id: string;
  type: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  source: string;
  timestamp: string;
}

const threatConfig = {
  critical: {
    icon: AlertTriangle,
    bg: "bg-gradient-threat",
    border: "border-destructive/50",
    shadow: "shadow-glow-threat",
    badge: "destructive"
  },
  high: {
    icon: AlertTriangle,
    bg: "bg-gradient-threat",
    border: "border-destructive/30",
    shadow: "shadow-glow-threat",
    badge: "destructive"
  },
  medium: {
    icon: Zap,
    bg: "bg-gradient-dark",
    border: "border-warning/30",
    shadow: "",
    badge: "default"
  },
  low: {
    icon: Shield,
    bg: "bg-gradient-dark",
    border: "border-muted/30",
    shadow: "",
    badge: "secondary"
  }
} as const;

export function ThreatAlert({ 
  id, 
  type, 
  title, 
  description, 
  source, 
  timestamp 
}: ThreatAlertProps) {
  const config = threatConfig[type];
  const IconComponent = config.icon;

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      config.bg,
      config.border,
      config.shadow
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              type === "critical" && "bg-destructive/20 text-destructive",
              type === "high" && "bg-destructive/15 text-destructive",
              type === "medium" && "bg-warning/20 text-warning",
              type === "low" && "bg-muted/20 text-muted-foreground"
            )}>
              <IconComponent className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                {title}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{source}</p>
            </div>
          </div>
          <Badge 
            variant={config.badge as any}
            className="text-xs uppercase tracking-wide"
          >
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-xs text-muted-foreground/70">{timestamp}</p>
      </CardContent>
    </Card>
  );
}