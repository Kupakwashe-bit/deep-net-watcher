import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  source: string;
  timestamp: string;
  severity: "critical" | "warning";
  riskScore: number;
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Anomalous Port Scan",
    description: "Detected from 192.168.1.61 - Risk Score: 6.2",
    source: "192.168.1.61",
    timestamp: "9/9/2025, 7:25:50 PM - ~60 minutes ago",
    severity: "warning",
    riskScore: 6.2
  },
  {
    id: "2",
    title: "Unusual Data Transfer",
    description: "Detected from 192.168.1.196 - Risk Score: 7.3",
    source: "192.168.1.196",
    timestamp: "9/9/2025, 7:25:48 PM - ~60 minutes ago",
    severity: "warning",
    riskScore: 7.3
  },
  {
    id: "3",
    title: "Anomalous Port Scan",
    description: "Detected from 192.168.1.7 - Risk Score: 8.1",
    source: "192.168.1.7",
    timestamp: "9/9/2025, 7:25:46 PM - ~60 minutes ago",
    severity: "warning",
    riskScore: 8.1
  },
  {
    id: "4",
    title: "DDoS Attack Detected",
    description: "Detected from 192.168.1.106 - Risk Score: 9.5",
    source: "192.168.1.106",
    timestamp: "9/9/2025, 7:25:44 PM - ~60 minutes ago",
    severity: "critical",
    riskScore: 9.5
  }
];

export function AlertsSidebar() {
  return (
    <div className="w-80 bg-background border-r border-border p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning-status" />
        <h2 className="font-semibold text-foreground">Active Alerts</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Real-time threat detection</p>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                  alert.severity === "critical" ? "text-critical" : "text-warning-status"
                }`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                    <Badge 
                      variant={alert.severity === "critical" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}