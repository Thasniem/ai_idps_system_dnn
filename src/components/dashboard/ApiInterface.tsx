import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Send, Copy } from "lucide-react";
import { useState } from "react";

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/threats",
    description: "Retrieve current threat detections",
    response: {
      status: "active",
      threats: [
        {
          id: "threat_001",
          type: "ransomware_detection",
          severity: "critical",
          source_ip: "192.168.1.45",
          target: "ehr_server_ward3",
          timestamp: "2024-01-15T10:30:00Z",
          details: {
            ml_confidence: 0.94,
            attack_vector: "file_encryption",
            affected_systems: ["patient_db", "backup_server"]
          }
        }
      ]
    }
  },
  {
    method: "POST",
    endpoint: "/api/v1/alerts",
    description: "Create custom security alert",
    payload: {
      type: "custom_alert",
      severity: "high",
      message: "Suspicious activity detected",
      source_system: "custom_monitor",
      metadata: {
        user_id: "admin_001",
        device_id: "device_xyz"
      }
    }
  },
  {
    method: "GET",
    endpoint: "/api/v1/neural-network/status",
    description: "Get neural network model status",
    response: {
      model_status: "active",
      accuracy: 94.7,
      last_training: "2024-01-15T08:00:00Z",
      predictions_today: 1247,
      false_positive_rate: 0.018
    }
  }
];

export function ApiInterface() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = (obj: any) => JSON.stringify(obj, null, 2);

  return (
    <Card className="shadow-cyber">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-primary" />
          <span>API Integration Interface</span>
          <Badge variant="outline" className="ml-auto">v1.0</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="endpoints" className="space-y-4">
            <div className="space-y-2">
              {apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                    selectedEndpoint === index ? 'border-primary bg-muted/30' : 'border-border'
                  }`}
                  onClick={() => setSelectedEndpoint(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={endpoint.method === 'GET' ? 'outline' : 'secondary'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono text-primary">{endpoint.endpoint}</code>
                    </div>
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                </div>
              ))}
            </div>

            {selectedEndpoint !== null && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Request/Response Example</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(formatJson(apiEndpoints[selectedEndpoint]))}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {apiEndpoints[selectedEndpoint].payload && (
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-warning">Request Body:</h5>
                      <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                        <code>{formatJson(apiEndpoints[selectedEndpoint].payload)}</code>
                      </pre>
                    </div>
                  )}
                  
                  {apiEndpoints[selectedEndpoint].response && (
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-success">Response:</h5>
                      <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                        <code>{formatJson(apiEndpoints[selectedEndpoint].response)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <h4 className="font-semibold mb-2">Real-time Threat Notifications</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Receive instant notifications when critical threats are detected
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Webhook URL:</span>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      https://your-system.com/webhooks/threats
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trigger Events:</span>
                    <div className="flex space-x-1">
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                      <Badge variant="secondary" className="text-xs">High</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/20">
                <h4 className="font-semibold mb-2">System Health Alerts</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Monitor IDPS system performance and availability
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Webhook URL:</span>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      https://your-system.com/webhooks/health
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frequency:</span>
                    <Badge variant="outline" className="text-xs">Every 5 minutes</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Authentication</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Use API keys for secure access to IDPS endpoints.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    Authorization: Bearer your-api-key-here
                  </code>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Code className="h-4 w-4 text-secondary" />
                    <h4 className="font-semibold">Rate Limits</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    API requests are limited to ensure system stability.
                  </p>
                  <div className="text-xs space-y-1">
                    <div>• Standard: 1000 requests/hour</div>
                    <div>• Premium: 5000 requests/hour</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Error Codes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code>400</code>
                    <span className="text-muted-foreground">Bad Request - Invalid parameters</span>
                  </div>
                  <div className="flex justify-between">
                    <code>401</code>
                    <span className="text-muted-foreground">Unauthorized - Invalid API key</span>
                  </div>
                  <div className="flex justify-between">
                    <code>429</code>
                    <span className="text-muted-foreground">Rate Limited - Too many requests</span>
                  </div>
                  <div className="flex justify-between">
                    <code>500</code>
                    <span className="text-muted-foreground">Internal Error - System issue</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}