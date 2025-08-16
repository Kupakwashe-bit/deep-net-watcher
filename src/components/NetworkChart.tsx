import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { time: "00:00", traffic: 45, anomaly: 2 },
  { time: "02:00", traffic: 52, anomaly: 1 },
  { time: "04:00", traffic: 38, anomaly: 0 },
  { time: "06:00", traffic: 67, anomaly: 3 },
  { time: "08:00", traffic: 89, anomaly: 5 },
  { time: "10:00", traffic: 124, anomaly: 8 },
  { time: "12:00", traffic: 156, anomaly: 12 },
  { time: "14:00", traffic: 178, anomaly: 15 },
  { time: "16:00", traffic: 145, anomaly: 9 },
  { time: "18:00", traffic: 167, anomaly: 11 },
  { time: "20:00", traffic: 134, anomaly: 7 },
  { time: "22:00", traffic: 98, anomaly: 4 },
];

export function NetworkChart() {
  return (
    <Card className="bg-gradient-dark border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          Real-time Network Traffic
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="traffic" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                name="Network Traffic (Mbps)"
              />
              <Line 
                type="monotone" 
                dataKey="anomaly" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
                name="Anomalies Detected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}