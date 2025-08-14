import { ThreatMetrics } from "@/components/dashboard/ThreatMetrics";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { NeuralNetworkStatus } from "@/components/dashboard/NeuralNetworkStatus";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { ApiInterface } from "@/components/dashboard/ApiInterface";
import { Shield, Brain, Activity, Database } from "lucide-react";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import heroImage from "@/assets/healthcare-network-hero.jpg";

const Index = () => {
  const { threats, systemMetrics, networkDevices, loading } = useRealTimeData();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Healthcare cybersecurity network visualization" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-cyber opacity-80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary animate-glow" />
              <h1 className="text-4xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent">
                Healthcare IDPS
              </h1>
              <Brain className="h-8 w-8 text-secondary animate-pulse-slow" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced Intrusion Detection & Prevention System powered by Neural Networks
              <br />
              <span className="text-primary font-semibold">Protecting Healthcare Infrastructure in Real-Time</span>
            </p>
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">99.7%</div>
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{networkDevices.length}</div>
                <div className="text-sm text-muted-foreground">Protected Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">23ms</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Threat Metrics Overview */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Real-Time Threat Metrics</h2>
          </div>
          <ThreatMetrics />
        </section>

        {/* Neural Network and System Health */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Brain className="h-5 w-5 text-secondary" />
            <h2 className="text-2xl font-bold">AI-Powered Detection System</h2>
          </div>
          <NeuralNetworkStatus />
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Threat Detection Feed */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-5 w-5 text-destructive" />
              <h2 className="text-2xl font-bold">Active Threat Detection</h2>
            </div>
            <ThreatMap />
          </section>

          {/* System Health Monitor */}
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <Database className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">System Health</h2>
            </div>
            <SystemHealth />
          </section>
        </div>

        {/* API Integration */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">API Integration</h2>
          </div>
          <ApiInterface />
        </section>

        {/* Project Scope & Objectives */}
        <section className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-neural bg-clip-text text-transparent mb-4">
              Project Scope & Core Objectives
            </h2>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              Comprehensive healthcare cybersecurity solution addressing critical infrastructure protection needs
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Shield className="h-8 w-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Threat Detection</h3>
              <p className="text-sm text-muted-foreground">
                Continuous monitoring of network traffic and system activities to identify ransomware, 
                unauthorized EHR access, and IoT device exploits targeting healthcare infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Neural Network Classification</h3>
              <p className="text-sm text-muted-foreground">
                Advanced machine learning models trained on healthcare-specific threat patterns 
                to classify and predict intrusions with 94.7% accuracy.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Activity className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">Healthcare-Focused Security</h3>
              <p className="text-sm text-muted-foreground">
                Specialized protection for patient data, EHR systems, medical IoT devices, 
                and critical healthcare infrastructure with HIPAA compliance considerations.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Database className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">API-Driven Integration</h3>
              <p className="text-sm text-muted-foreground">
                Structured, REST API interfaces for seamless integration with existing 
                healthcare IT systems, SIEM platforms, and security orchestration tools.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Shield className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Prevention & Response</h3>
              <p className="text-sm text-muted-foreground">
                Automated threat prevention mechanisms with real-time alerting and 
                incident response capabilities for immediate threat mitigation.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/50 shadow-cyber">
              <Activity className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Success Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Target: &lt;50ms detection latency, &gt;95% accuracy, &lt;2% false positive rate, 
                and 99.9% uptime for critical healthcare environment protection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;