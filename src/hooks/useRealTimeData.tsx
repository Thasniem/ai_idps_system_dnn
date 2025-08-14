import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { generateMockThreats, generateMockMetrics, generateMockDevices } from '@/utils/simulateData';

export interface ThreatData {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  source_ip: string;
  target_ip: string;
  status: 'detected' | 'investigating' | 'mitigated' | 'resolved';
  created_at: string;
  description?: string;
}

export interface SystemMetric {
  id: string;
  metric_type: 'cpu' | 'memory' | 'network' | 'disk';
  value: number;
  unit: string;
  created_at: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  ip_address: string;
  device_type: 'server' | 'workstation' | 'iot' | 'network_equipment';
  status: 'online' | 'offline' | 'warning' | 'critical';
  last_seen: string;
}

export const useRealTimeData = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchInitialData = async () => {
      setLoading(true);
      
      try {
        // Fetch recent threats
        const { data: threatsData } = await (supabase as any)
          .from('threats')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        
        // Fetch recent system metrics
        const { data: metricsData } = await (supabase as any)
          .from('system_metrics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        
        // Fetch network devices
        const { data: devicesData } = await (supabase as any)
          .from('network_devices')
          .select('*')
          .order('last_seen', { ascending: false });

        if (threatsData) setThreats(threatsData);
        if (metricsData) setSystemMetrics(metricsData);
        if (devicesData) setNetworkDevices(devicesData);
      } catch (error) {
        // Use mock data until migration is applied
        console.log('Using simulated data - will connect to database after migration is applied');
        setThreats(generateMockThreats());
        setSystemMetrics(generateMockMetrics());
        setNetworkDevices(generateMockDevices());
      }

      setLoading(false);
    };

    fetchInitialData();

    // Set up real-time subscriptions
    const threatsChannel = supabase
      .channel('threats-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'threats'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setThreats(prev => [payload.new as ThreatData, ...prev].slice(0, 50));
          } else if (payload.eventType === 'UPDATE') {
            setThreats(prev => prev.map(threat => 
              threat.id === payload.new.id ? payload.new as ThreatData : threat
            ));
          }
        }
      )
      .subscribe();

    const metricsChannel = supabase
      .channel('metrics-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'system_metrics'
        },
        (payload) => {
          setSystemMetrics(prev => [payload.new as SystemMetric, ...prev].slice(0, 100));
        }
      )
      .subscribe();

    const devicesChannel = supabase
      .channel('devices-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network_devices'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNetworkDevices(prev => [payload.new as NetworkDevice, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setNetworkDevices(prev => prev.map(device => 
              device.id === payload.new.id ? payload.new as NetworkDevice : device
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(threatsChannel);
      supabase.removeChannel(metricsChannel);
      supabase.removeChannel(devicesChannel);
    };
  }, [user]);

  const createThreat = async (threatData: Omit<ThreatData, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('threats')
        .insert([{ ...threatData, user_id: user.id }])
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateThreatStatus = async (threatId: string, status: ThreatData['status']) => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('threats')
        .update({ status })
        .eq('id', threatId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const addSystemMetric = async (metricData: Omit<SystemMetric, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('system_metrics')
        .insert([{ ...metricData, user_id: user.id }])
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    threats,
    systemMetrics,
    networkDevices,
    loading,
    createThreat,
    updateThreatStatus,
    addSystemMetric
  };
};