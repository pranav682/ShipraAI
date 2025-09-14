'use client';

import { useState } from 'react';
import { ActivityLog } from '@/lib/types/user';
import { useAuth } from './use-auth';

export function useActivityLogger() {
  const { user } = useAuth();
  const [isLogging, setIsLogging] = useState(false);

  const logActivity = async (
    action: string,
    resource: string,
    details: string,
    resourceId?: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low',
    metadata?: Record<string, any>
  ) => {
    if (!user) return;

    setIsLogging(true);
    
    try {
      const activityLog: ActivityLog = {
        id: Date.now().toString(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        action,
        resource,
        resourceId,
        details,
        metadata,
        timestamp: new Date().toISOString(),
        severity,
        ipAddress: '192.168.1.1', // In production, get real IP
        userAgent: navigator.userAgent
      };

      // In production, send to your API
      console.log('Activity logged:', activityLog);
      
      // Store in localStorage for demo purposes
      const existingLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      existingLogs.unshift(activityLog);
      localStorage.setItem('activityLogs', JSON.stringify(existingLogs.slice(0, 1000))); // Keep last 1000 logs
      
    } catch (error) {
      console.error('Failed to log activity:', error);
    } finally {
      setIsLogging(false);
    }
  };

  return { logActivity, isLogging };
}