import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "traffic", label: "Traffic Analysis" },
  { id: "models", label: "ML Models" },
  { id: "config", label: "Configuration" },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <header className="bg-background border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold text-foreground">NetGuard AI</h1>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>System Status: <span className="text-success font-medium">Active</span></span>
          <span>Last Updated: 9/9/2025, 6:17:17 PM</span>
          <span className="bg-muted px-2 py-1 rounded text-xs">601</span>
        </div>
      </div>
    </header>
  );
}