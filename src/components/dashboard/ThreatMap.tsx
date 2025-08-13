import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface ThreatEvent {
  id: string;
  type: string;
  source: string;
  target: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  details: string;
}

const mockThreatEvents: ThreatEvent[] = [
  {
    id: "1",
    type: "Ransomware Detection",
    source: "External IP: 192.168.1.45",
    target: "EHR Server - Ward 3",
    severity: "critical",
    timestamp: new Date(),
    details: "Suspicious encryption activity detected on patient database"
  },
  {
    id: "2", 
    type: "Unauthorized EHR Access",
    source: "Internal User: dr.smith@hospital.com",
    target: "Patient Records DB",
    severity: "high",
    timestamp: new Date(Date.now() - 300000),
    details: "Access attempt outside authorized hours"
  },
  {
    id: "3",
    type: "IoT Device Exploit",
    source: "Unknown Device",
    target: "Insulin Pump Network",
    severity: "high", 
    timestamp: new Date(Date.now() - 600000),
    details: "Anomalous communication pattern detected"
  },
  {
    id: "4",
    type: "DDoS Attempt",
    source: "Multiple External IPs",
    target: "Main Hospital Portal",
    severity: "medium",
    timestamp: new Date(Date.now() - 900000),
    details: "Coordinated traffic spike from suspicious sources"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-destructive";
    case "high":
      return "text-destructive";
    case "medium":
      return "text-warning";
    case "low":
      return "text-success";
    default:
      return "text-muted-foreground";
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

export function ThreatMap() {
  const [threats, setThreats] = useState<ThreatEvent[]>(mockThreatEvents);
  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      // Simulate new threat events
      if (Math.random() > 0.7) {
        const newThreat: ThreatEvent = {
          id: Date.now().toString(),
          type: "Network Anomaly",
          source: `External IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: "Healthcare Network",
          severity: Math.random() > 0.5 ? "medium" : "low",
          timestamp: new Date(),
          details: "Automated threat detection alert"
        };
        
        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  return (
    <Card className="shadow-cyber">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            Real-Time Threat Detection
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm text-muted-foreground">
              {isRealTime ? 'Live' : 'Paused'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threats.map((threat) => (
            <div
              key={threat.id}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-semibold ${getSeverityColor(threat.severity)}`}>
                    {threat.type}
                  </h4>
                  <Badge variant={getSeverityBadgeVariant(threat.severity)}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {threat.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Source: </span>
                  <span className="text-foreground">{threat.source}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Target: </span>
                  <span className="text-foreground">{threat.target}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{threat.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}