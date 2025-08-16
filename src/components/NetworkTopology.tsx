import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Router, Server, Monitor, Smartphone, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkNode {
  id: string;
  type: "router" | "server" | "desktop" | "mobile";
  name: string;
  status: "healthy" | "warning" | "critical";
  connections: string[];
}

const nodes: NetworkNode[] = [
  { id: "r1", type: "router", name: "Core Router", status: "healthy", connections: ["s1", "s2", "d1"] },
  { id: "s1", type: "server", name: "Web Server", status: "warning", connections: ["r1"] },
  { id: "s2", type: "server", name: "DB Server", status: "healthy", connections: ["r1"] },
  { id: "d1", type: "desktop", name: "Workstation", status: "critical", connections: ["r1"] },
  { id: "m1", type: "mobile", name: "Mobile Device", status: "healthy", connections: ["r1"] },
];

const getNodeIcon = (type: NetworkNode["type"]) => {
  switch (type) {
    case "router": return Router;
    case "server": return Server;
    case "desktop": return Monitor;
    case "mobile": return Smartphone;
  }
};

const getStatusConfig = (status: NetworkNode["status"]) => {
  switch (status) {
    case "healthy":
      return {
        bg: "bg-success/20",
        border: "border-success/40",
        text: "text-success",
        badge: "bg-success/20 text-success"
      };
    case "warning":
      return {
        bg: "bg-warning/20",
        border: "border-warning/40",
        text: "text-warning",
        badge: "bg-warning/20 text-warning"
      };
    case "critical":
      return {
        bg: "bg-destructive/20",
        border: "border-destructive/40",
        text: "text-destructive",
        badge: "bg-destructive/20 text-destructive"
      };
  }
};

export function NetworkTopology() {
  return (
    <Card className="bg-gradient-dark border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Network Topology</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nodes.map((node) => {
            const IconComponent = getNodeIcon(node.type);
            const statusConfig = getStatusConfig(node.status);
            
            return (
              <div
                key={node.id}
                className={cn(
                  "relative p-4 rounded-lg border-2 transition-all duration-300",
                  statusConfig.bg,
                  statusConfig.border,
                  "hover:scale-105 cursor-pointer"
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={cn("p-2 rounded-full", statusConfig.bg)}>
                    <IconComponent className={cn("h-6 w-6", statusConfig.text)} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{node.name}</p>
                    <Badge 
                      className={cn("text-xs mt-1", statusConfig.badge)}
                      variant="outline"
                    >
                      {node.status}
                    </Badge>
                  </div>
                </div>
                
                {node.status === "critical" && (
                  <div className="absolute -top-1 -right-1">
                    <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/10 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Network Status Summary</h4>
          <div className="flex gap-4 text-sm">
            <span className="text-success">3 Healthy</span>
            <span className="text-warning">1 Warning</span>
            <span className="text-destructive">1 Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}