import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { AlertsSidebar } from "@/components/AlertsSidebar";
import { TrafficAnalysis } from "@/components/TrafficAnalysis";
import { AnomalyDetection } from "@/components/AnomalyDetection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const metrics = [
    {
      title: "Traffic Volume",
      value: "2.0",
      unit: "GB/s",
      change: "↑ 12% from last hour",
      changeType: "positive" as const,
      icon: "activity" as const
    },
    {
      title: "Active Connections", 
      value: "14,582",
      change: "↓ 3% from last hour",
      changeType: "negative" as const,
      icon: "zap" as const
    },
    {
      title: "Threats Blocked",
      value: "5",
      change: "↑ 8% from last hour", 
      changeType: "positive" as const,
      icon: "shield" as const
    },
    {
      title: "Model Accuracy",
      value: "98.7%",
      change: "↑ 0.2% improvement",
      changeType: "positive" as const,
      icon: "target" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex">
        <AlertsSidebar />
        
        <div className="flex-1 p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.unit ? `${metric.value} ${metric.unit}` : metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrafficAnalysis />
            <AnomalyDetection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;