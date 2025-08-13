import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Server, HardDrive, Cpu, Wifi, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkThroughput: number;
  uptime: string;
  securityScore: number;
}

export function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 23.5,
    memoryUsage: 67.2,
    diskUsage: 45.8,
    networkThroughput: 342.7,
    uptime: "15d 7h 23m",
    securityScore: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        diskUsage: Math.max(30, Math.min(80, prev.diskUsage + (Math.random() - 0.5) * 2)),
        networkThroughput: Math.max(100, Math.min(500, prev.networkThroughput + (Math.random() - 0.5) * 50)),
        securityScore: Math.max(85, Math.min(99, prev.securityScore + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return { status: "critical", color: "text-destructive" };
    if (value >= thresholds.warning) return { status: "warning", color: "text-warning" };
    return { status: "healthy", color: "text-success" };
  };

  const cpuHealth = getHealthStatus(metrics.cpuUsage, { warning: 70, critical: 85 });
  const memoryHealth = getHealthStatus(metrics.memoryUsage, { warning: 75, critical: 90 });
  const diskHealth = getHealthStatus(metrics.diskUsage, { warning: 80, critical: 95 });

  return (
    <Card className="shadow-cyber">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-primary" />
            <span>System Health Monitor</span>
          </CardTitle>
          <Badge variant="outline" className="text-success border-success">
            Operational
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className={`text-sm font-bold ${cpuHealth.color}`}>
                  {metrics.cpuUsage.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.cpuUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <span className={`text-sm font-bold ${memoryHealth.color}`}>
                  {metrics.memoryUsage.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.memoryUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Disk Usage</span>
                </div>
                <span className={`text-sm font-bold ${diskHealth.color}`}>
                  {metrics.diskUsage.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.diskUsage} className="h-2" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Network Throughput</span>
                </div>
                <Badge variant="outline">{metrics.networkThroughput.toFixed(1)} Mbps</Badge>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Security Score</span>
                </div>
                <Badge variant="outline" className="text-success border-success">
                  {metrics.securityScore}/100
                </Badge>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">System Uptime</span>
                </div>
                <span className="text-sm font-bold text-primary">{metrics.uptime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-success">1,247</div>
              <div className="text-xs text-muted-foreground">Threats Blocked</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">342</div>
              <div className="text-xs text-muted-foreground">Devices Monitored</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">99.8%</div>
              <div className="text-xs text-muted-foreground">Uptime (30d)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}