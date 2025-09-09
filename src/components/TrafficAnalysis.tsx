import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const timeRanges = [
  { id: "1H", label: "1H" },
  { id: "24H", label: "24H" },
  { id: "7D", label: "7D" },
];

const data1H = [
  { time: "12:00", value: 12 },
  { time: "12:15", value: 15 },
  { time: "12:30", value: 8 },
  { time: "12:45", value: 18 },
  { time: "13:00", value: 14 },
  { time: "13:15", value: 20 },
];

const data24H = [
  { time: "00:00", value: 5 },
  { time: "04:00", value: 8 },
  { time: "08:00", value: 15 },
  { time: "12:00", value: 18 },
  { time: "16:00", value: 12 },
  { time: "20:00", value: 10 },
];

const data7D = [
  { time: "Mon", value: 45 },
  { time: "Tue", value: 52 },
  { time: "Wed", value: 38 },
  { time: "Thu", value: 65 },
  { time: "Fri", value: 58 },
  { time: "Sat", value: 42 },
  { time: "Sun", value: 48 },
];

const dataMap = {
  "1H": data1H,
  "24H": data24H,
  "7D": data7D,
};

export function TrafficAnalysis() {
  const [activeRange, setActiveRange] = useState("1H");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Network Traffic Analysis</CardTitle>
          <div className="flex gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={activeRange === range.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveRange(range.id)}
                className="px-4 py-2"
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
            <LineChart data={dataMap[activeRange as keyof typeof dataMap]}>
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
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}