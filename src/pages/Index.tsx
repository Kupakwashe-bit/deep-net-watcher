import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { AlertsSidebar } from "@/components/AlertsSidebar";
import { TrafficAnalysis } from "@/components/TrafficAnalysis";
import { AnomalyDetection } from "@/components/AnomalyDetection";

interface Metric {
  title: string;
  baseValue: number;
  value: string;
  unit?: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: "activity" | "shield" | "zap" | "target";
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Traffic Volume",
      baseValue: 2.0,
      value: "2.0",
      unit: "GB/s",
      change: "↑ 12% from last hour",
      changeType: "positive" as const,
      icon: "activity" as const
    },
    {
      title: "Active Connections", 
      baseValue: 14582,
      value: "14,582",
      change: "↓ 3% from last hour",
      changeType: "negative" as const,
      icon: "zap" as const
    },
    {
      title: "Threats Blocked",
      baseValue: 5,
      value: "5",
      change: "↑ 8% from last hour", 
      changeType: "positive" as const,
      icon: "shield" as const
    },
    {
      title: "Model Accuracy",
      baseValue: 98.7,
      value: "98.7%",
      change: "↑ 0.2% improvement",
      changeType: "positive" as const,
      icon: "target" as const
    }
  ]);

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        let newValue: number;
        let change: string;
        let changeType: "positive" | "negative" | "neutral";

        switch (metric.title) {
          case "Traffic Volume":
            newValue = Math.max(0.1, metric.baseValue + (Math.random() - 0.5) * 0.8);
            const trafficChange = ((newValue - metric.baseValue) / metric.baseValue * 100).toFixed(1);
            change = `${parseFloat(trafficChange) >= 0 ? '↑' : '↓'} ${Math.abs(parseFloat(trafficChange))}% from last hour`;
            changeType = parseFloat(trafficChange) >= 0 ? "positive" : "negative";
            return {
              ...metric,
              baseValue: newValue,
              value: newValue.toFixed(1),
              change,
              changeType
            };

          case "Active Connections":
            newValue = Math.max(10000, metric.baseValue + Math.floor((Math.random() - 0.5) * 2000));
            const connChange = ((newValue - metric.baseValue) / metric.baseValue * 100).toFixed(1);
            change = `${parseFloat(connChange) >= 0 ? '↑' : '↓'} ${Math.abs(parseFloat(connChange))}% from last hour`;
            changeType = parseFloat(connChange) >= 0 ? "positive" : "negative";
            return {
              ...metric,
              baseValue: newValue,
              value: newValue.toLocaleString(),
              change,
              changeType
            };

          case "Threats Blocked":
            newValue = Math.max(0, metric.baseValue + Math.floor((Math.random() - 0.3) * 3));
            const threatChange = Math.floor(Math.random() * 15);
            change = `↑ ${threatChange}% from last hour`;
            changeType = "positive";
            return {
              ...metric,
              baseValue: newValue,
              value: newValue.toString(),
              change,
              changeType
            };

          case "Model Accuracy":
            newValue = Math.max(95, Math.min(99.9, metric.baseValue + (Math.random() - 0.5) * 0.3));
            const accChange = ((newValue - metric.baseValue)).toFixed(1);
            change = `${parseFloat(accChange) >= 0 ? '↑' : '↓'} ${Math.abs(parseFloat(accChange))}% improvement`;
            changeType = parseFloat(accChange) >= 0 ? "positive" : "negative";
            return {
              ...metric,
              baseValue: newValue,
              value: `${newValue.toFixed(1)}%`,
              change,
              changeType
            };

          default:
            return metric;
        }
      }));
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex">
        <AlertsSidebar />
        
        <div className="flex-1 p-6 animate-fade-in">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div 
                key={metric.title} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MetricCard
                  title={metric.title}
                  value={metric.unit ? `${metric.value} ${metric.unit}` : metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                />
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
              <TrafficAnalysis />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
              <AnomalyDetection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;