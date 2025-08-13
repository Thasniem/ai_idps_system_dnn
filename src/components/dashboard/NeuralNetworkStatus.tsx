import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Database, Network } from "lucide-react";
import { useState, useEffect } from "react";

interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  threatsPredicted: number;
  falsePositives: number;
  processingTime: number;
  lastUpdate: Date;
}

export function NeuralNetworkStatus() {
  const [metrics, setMetrics] = useState<ModelMetrics>({
    accuracy: 94.7,
    precision: 92.3,
    recall: 96.1,
    f1Score: 94.2,
    threatsPredicted: 1247,
    falsePositives: 23,
    processingTime: 0.034,
    lastUpdate: new Date()
  });

  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        accuracy: Math.max(90, Math.min(99, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        precision: Math.max(85, Math.min(98, prev.precision + (Math.random() - 0.5) * 0.3)),
        recall: Math.max(90, Math.min(99, prev.recall + (Math.random() - 0.5) * 0.2)),
        f1Score: Math.max(88, Math.min(97, prev.f1Score + (Math.random() - 0.5) * 0.2)),
        threatsPredicted: prev.threatsPredicted + Math.floor(Math.random() * 3),
        processingTime: Math.max(0.01, Math.min(0.1, prev.processingTime + (Math.random() - 0.5) * 0.005)),
        lastUpdate: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="gradient-neural bg-clip-text text-transparent">Neural Network Performance</span>
            <Badge variant={isTraining ? "secondary" : "outline"} className="ml-auto">
              {isTraining ? "Training" : "Active"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">{metrics.accuracy.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.accuracy} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precision</span>
                <span className="font-medium">{metrics.precision.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.precision} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recall</span>
                <span className="font-medium">{metrics.recall.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.recall} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">F1-Score</span>
                <span className="font-medium">{metrics.f1Score.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.f1Score} className="h-2" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Real-Time Stats</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Threats Predicted: </span>
                <span className="font-medium text-primary">{metrics.threatsPredicted.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">False Positives: </span>
                <span className="font-medium text-warning">{metrics.falsePositives}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Time: </span>
                <span className="font-medium text-success">{metrics.processingTime.toFixed(3)}s</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Update: </span>
                <span className="font-medium">{metrics.lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-cyber">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-primary" />
            <span>Model Architecture</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <Cpu className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Input Layer</div>
                  <div className="text-xs text-muted-foreground">Network Features (256 nodes)</div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <Brain className="h-4 w-4 text-secondary" />
                <div>
                  <div className="font-medium">Hidden Layers</div>
                  <div className="text-xs text-muted-foreground">3 layers (512, 256, 128 nodes)</div>
                </div>
              </div>
              <Badge variant="secondary">Processing</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <Database className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-medium">Output Layer</div>
                  <div className="text-xs text-muted-foreground">Threat Classification (5 classes)</div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">Training Data</div>
              <div className="text-sm">
                <span className="text-muted-foreground">Healthcare Threat Dataset: </span>
                <span className="font-medium text-primary">2.3M samples</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Last Training: </span>
                <span className="font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}