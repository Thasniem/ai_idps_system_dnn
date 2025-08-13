import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Activity, Eye } from "lucide-react";

interface ThreatMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  severity: "low" | "medium" | "high" | "critical";
  icon: React.ComponentType<any>;
}

const threatMetrics: ThreatMetric[] = [
  {
    id: "1",
    title: "Active Threats",
    value: "3",
    change: "+2 from last hour",
    trend: "up",
    severity: "high",
    icon: AlertTriangle
  },
  {
    id: "2", 
    title: "Blocked Attempts",
    value: "247",
    change: "+18 from last hour",
    trend: "up",
    severity: "medium",
    icon: Shield
  },
  {
    id: "3",
    title: "Network Health",
    value: "98.7%",
    change: "Stable",
    trend: "stable",
    severity: "low",
    icon: Activity
  },
  {
    id: "4",
    title: "Monitored Devices",
    value: "1,342",
    change: "+5 new devices",
    trend: "up",
    severity: "low",
    icon: Eye
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "gradient-danger";
    case "high":
      return "gradient-danger";
    case "medium":
      return "bg-warning";
    case "low":
      return "gradient-secondary";
    default:
      return "bg-muted";
  }
};

const getSeverityBadgeVariant = (severity: string) => {
  switch (severity) {
    case "critical":
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};

export function ThreatMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {threatMetrics.map((metric) => {
        const IconComponent = metric.icon;
        return (
          <Card key={metric.id} className="relative overflow-hidden shadow-cyber hover:shadow-glow transition-all duration-300">
            <div className={`absolute inset-0 opacity-10 ${getSeverityColor(metric.severity)}`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <Badge variant={getSeverityBadgeVariant(metric.severity)} className="ml-2">
                  {metric.severity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}