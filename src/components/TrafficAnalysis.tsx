import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const timeRanges = [
  { id: "1H", label: "1H" },
  { id: "24H", label: "24H" },
  { id: "7D", label: "7D" },
];

// Generate dynamic data points
const generateDataPoint = (base: number, variance: number) => 
  Math.max(0, base + (Math.random() - 0.5) * variance);

const generateTimeData = (points: number, baseValue: number) => {
  const now = new Date();
  return Array.from({ length: points }, (_, i) => {
    const time = new Date(now.getTime() - (points - 1 - i) * 900000); // 15 min intervals
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: generateDataPoint(baseValue, 8)
    };
  });
};

export function TrafficAnalysis() {
  const [activeRange, setActiveRange] = useState("1H");
  const [data, setData] = useState({
    "1H": generateTimeData(6, 15),
    "24H": generateTimeData(6, 12),
    "7D": generateTimeData(7, 50)
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        "1H": generateTimeData(6, 15),
        "24H": generateTimeData(6, 12),
        "7D": generateTimeData(7, 50)
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Network Traffic Analysis
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </CardTitle>
          <div className="flex gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={activeRange === range.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveRange(range.id)}
                className="px-4 py-2 transition-all duration-200 hover:scale-105"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data[activeRange as keyof typeof data]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                className="animate-fade-in"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}