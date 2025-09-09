import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const anomalyData = [
  { x: 85, y: 120, type: "critical" },
  { x: 92, y: 115, type: "critical" },
  { x: 88, y: 118, type: "critical" },
  { x: 45, y: 85, type: "warning" },
  { x: 52, y: 88, type: "warning" },
  { x: 48, y: 82, type: "warning" },
  { x: 55, y: 90, type: "warning" },
  { x: 58, y: 92, type: "warning" },
  { x: 42, y: 78, type: "warning" },
  { x: 49, y: 85, type: "warning" },
  { x: 51, y: 87, type: "warning" },
  { x: 46, y: 83, type: "warning" },
  { x: 53, y: 89, type: "warning" },
  { x: 47, y: 84, type: "warning" },
  { x: 50, y: 86, type: "warning" },
];

export function AnomalyDetection() {
  const criticalCount = anomalyData.filter(d => d.type === "critical").length;
  const warningCount = anomalyData.filter(d => d.type === "warning").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Anomaly Detection</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Critical:</span>
              <Badge variant="destructive" className="min-w-6 justify-center">
                {criticalCount}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Warning:</span>
              <Badge variant="secondary" className="min-w-6 justify-center">
                {warningCount}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full bg-muted/20 rounded border">
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
            {anomalyData.map((point, index) => (
              <circle
                key={index}
                cx={point.x * 4}
                cy={300 - point.y * 2}
                r="3"
                fill={point.type === "critical" ? "hsl(var(--critical))" : "hsl(var(--warning-status))"}
                className="opacity-80"
              />
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}