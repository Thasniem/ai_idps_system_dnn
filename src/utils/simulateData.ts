import { ThreatData, SystemMetric, NetworkDevice } from '@/hooks/useRealTimeData';

// Simulate realistic healthcare cybersecurity data
export const generateMockThreats = (): ThreatData[] => {
  const threats: ThreatData[] = [
    {
      id: '1',
      severity: 'critical',
      type: 'Ransomware Attempt',
      source_ip: '192.168.1.45',
      target_ip: '10.0.0.15',
      status: 'investigating',
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      description: 'Suspicious file encryption activity detected on EHR server'
    },
    {
      id: '2',
      severity: 'high',
      type: 'Unauthorized EHR Access',
      source_ip: '203.45.67.89',
      target_ip: '10.0.0.23',
      status: 'detected',
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      description: 'Multiple failed login attempts on patient data system'
    },
    {
      id: '3',
      severity: 'medium',
      type: 'IoT Device Anomaly',
      source_ip: '192.168.2.101',
      target_ip: '10.0.1.78',
      status: 'mitigated',
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      description: 'Medical device sending unusual network traffic'
    },
    {
      id: '4',
      severity: 'high',
      type: 'Data Exfiltration Attempt',
      source_ip: '10.0.0.67',
      target_ip: '45.123.67.89',
      status: 'resolved',
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      description: 'Large patient database download attempt blocked'
    },
    {
      id: '5',
      severity: 'low',
      type: 'Phishing Email',
      source_ip: '198.51.100.44',
      target_ip: '10.0.0.156',
      status: 'resolved',
      created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      description: 'Malicious email targeting healthcare staff detected'
    }
  ];

  return threats;
};

export const generateMockMetrics = (): SystemMetric[] => {
  const metrics: SystemMetric[] = [];
  const metricTypes: ('cpu' | 'memory' | 'network' | 'disk')[] = ['cpu', 'memory', 'network', 'disk'];
  
  metricTypes.forEach((type, index) => {
    for (let i = 0; i < 20; i++) {
      metrics.push({
        id: `${type}-${i}`,
        metric_type: type,
        value: Math.random() * 100,
        unit: type === 'network' ? 'Mbps' : '%',
        created_at: new Date(Date.now() - i * 5 * 60 * 1000).toISOString()
      });
    }
  });

  return metrics.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export const generateMockDevices = (): NetworkDevice[] => {
  return [
    {
      id: '1',
      name: 'EHR-SERVER-01',
      ip_address: '10.0.0.15',
      device_type: 'server',
      status: 'online',
      last_seen: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'PATIENT-WORKSTATION-A12',
      ip_address: '10.0.0.23',
      device_type: 'workstation',
      status: 'warning',
      last_seen: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'INFUSION-PUMP-205',
      ip_address: '192.168.2.101',
      device_type: 'iot',
      status: 'online',
      last_seen: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      name: 'CORE-SWITCH-A',
      ip_address: '10.0.1.1',
      device_type: 'network_equipment',
      status: 'online',
      last_seen: new Date(Date.now() - 30 * 1000).toISOString()
    },
    {
      id: '5',
      name: 'CT-SCANNER-CTRL',
      ip_address: '192.168.3.45',
      device_type: 'iot',
      status: 'critical',
      last_seen: new Date(Date.now() - 25 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      name: 'BACKUP-SERVER-02',
      ip_address: '10.0.0.67',
      device_type: 'server',
      status: 'offline',
      last_seen: new Date(Date.now() - 120 * 60 * 1000).toISOString()
    }
  ];
};