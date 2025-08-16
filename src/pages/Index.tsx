import { NetworkStatsCard } from "@/components/NetworkStatsCard";
import { ThreatAlert } from "@/components/ThreatAlert";
import { NetworkChart } from "@/components/NetworkChart";
import { NetworkTopology } from "@/components/NetworkTopology";
import { Activity, Shield, Zap, Users, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/network-hero.jpg";

const Index = () => {
  const threats = [
    {
      id: "1",
      type: "critical" as const,
      title: "DDoS Attack Detected",
      description: "Unusual traffic spike from 185.243.11.x subnet targeting web services",
      source: "192.168.1.100",
      timestamp: "2 minutes ago"
    },
    {
      id: "2", 
      type: "high" as const,
      title: "Suspicious Port Scanning",
      description: "Multiple port scan attempts from external IP addresses",
      source: "10.0.0.50",
      timestamp: "8 minutes ago"
    },
    {
      id: "3",
      type: "medium" as const,
      title: "Bandwidth Anomaly",
      description: "Unexpected data transfer pattern in internal network segment",
      source: "172.16.0.25",
      timestamp: "15 minutes ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Network Security Dashboard"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cyber bg-clip-text text-transparent mb-4">
              Deep Net Watcher
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time network traffic analysis and anomaly detection powered by deep learning
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NetworkStatsCard
            title="Active Connections"
            value="1,247"
            change="+12% from last hour"
            changeType="positive"
            icon={<Activity className="h-4 w-4" />}
          />
          <NetworkStatsCard
            title="Threats Blocked"
            value="38"
            change="+5 in last hour"
            changeType="negative"
            icon={<Shield className="h-4 w-4" />}
          />
          <NetworkStatsCard
            title="Network Load"
            value="67%"
            change="Normal range"
            changeType="neutral"
            icon={<Zap className="h-4 w-4" />}
          />
          <NetworkStatsCard
            title="Connected Devices"
            value="156"
            change="2 new devices"
            changeType="positive"
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Network Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <NetworkChart />
          </div>

          {/* Threat Alerts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-semibold text-foreground">Active Threats</h2>
            </div>
            {threats.map((threat) => (
              <ThreatAlert key={threat.id} {...threat} />
            ))}
          </div>
        </div>

        {/* Network Topology */}
        <NetworkTopology />
      </div>
    </div>
  );
};

export default Index;