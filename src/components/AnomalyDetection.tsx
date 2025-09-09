import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnomalyPoint {
  x: number;
  y: number;
  type: "critical" | "warning";
  id: string;
}

const generateAnomalyPoint = (type: "critical" | "warning"): AnomalyPoint => ({
  x: Math.random() * 90 + 10,
  y: type === "critical" ? Math.random() * 40 + 100 : Math.random() * 60 + 60,
  type,
  id: Math.random().toString(36).substr(2, 9)
});

export function AnomalyDetection() {
  const [anomalyData, setAnomalyData] = useState<AnomalyPoint[]>([
    ...Array(3).fill(0).map(() => generateAnomalyPoint("critical")),
    ...Array(12).fill(0).map(() => generateAnomalyPoint("warning"))
  ]);

  const [newPoints, setNewPoints] = useState<string[]>([]);

  // Simulate real-time anomaly detection
  useEffect(() => {
    const interval = setInterval(() => {
      setAnomalyData(prev => {
        const updated = [...prev];
        
        // Randomly add new anomalies
        if (Math.random() < 0.3) {
          const newPoint = generateAnomalyPoint(Math.random() < 0.2 ? "critical" : "warning");
          updated.push(newPoint);
          setNewPoints(curr => [...curr, newPoint.id]);
          
          // Remove highlight after animation
          setTimeout(() => {
            setNewPoints(curr => curr.filter(id => id !== newPoint.id));
          }, 2000);
        }
        
        // Remove old points to keep manageable count
        if (updated.length > 20) {
          updated.splice(0, updated.length - 15);
        }
        
        // Slightly move existing points
        return updated.map(point => ({
          ...point,
          x: Math.max(5, Math.min(95, point.x + (Math.random() - 0.5) * 2)),
          y: Math.max(30, Math.min(140, point.y + (Math.random() - 0.5) * 3))
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const criticalCount = anomalyData.filter(d => d.type === "critical").length;
  const warningCount = anomalyData.filter(d => d.type === "warning").length;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Anomaly Detection
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Critical:</span>
              <Badge variant="destructive" className="min-w-6 justify-center transition-all duration-300 animate-scale-in">
                {criticalCount}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Warning:</span>
              <Badge variant="secondary" className="min-w-6 justify-center transition-all duration-300 animate-scale-in">
                {warningCount}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full bg-muted/20 rounded border overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 300">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Y-axis labels */}
            <text x="15" y="50" className="text-xs fill-muted-foreground" textAnchor="middle">10</text>
            <text x="15" y="110" className="text-xs fill-muted-foreground" textAnchor="middle">6</text>
            <text x="15" y="170" className="text-xs fill-muted-foreground" textAnchor="middle">3</text>
            
            {/* Data points */}
            {anomalyData.map((point) => (
              <g key={point.id}>
                <circle
                  cx={point.x * 4}
                  cy={300 - point.y * 2}
                  r="3"
                  fill={point.type === "critical" ? "hsl(var(--critical))" : "hsl(var(--warning-status))"}
                  className={`transition-all duration-500 ${
                    newPoints.includes(point.id) 
                      ? 'animate-pulse opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                />
                {newPoints.includes(point.id) && (
                  <circle
                    cx={point.x * 4}
                    cy={300 - point.y * 2}
                    r="8"
                    fill="none"
                    stroke={point.type === "critical" ? "hsl(var(--critical))" : "hsl(var(--warning-status))"}
                    strokeWidth="2"
                    className="animate-ping"
                    opacity="0.6"
                  />
                )}
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}