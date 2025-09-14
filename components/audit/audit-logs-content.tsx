'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Clock,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  BarChart3
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { activityLogs } from '@/lib/data/team-data';
import { ActivityLog } from '@/lib/types/user';
import { useAuth } from '@/lib/hooks/use-auth';
import { toast } from 'sonner';

export function AuditLogsContent() {
  const { hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const canViewAudit = hasPermission('audit_view');
  const canExportAudit = hasPermission('audit_export');

  useEffect(() => {
    // Load logs from localStorage and combine with sample data
    const storedLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    setLogs([...storedLogs, ...activityLogs]);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesResource = resourceFilter === 'all' || log.resource === resourceFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          matchesDate = logDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = logDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = logDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesSeverity && matchesResource && matchesDate;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'high':
        return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30';
      case 'critical':
        return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'medium':
        return <Clock className="w-3 h-3 mr-1" />;
      case 'high':
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case 'critical':
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return <Activity className="w-3 h-3 mr-1" />;
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'automation':
        return <Activity className="w-4 h-4" />;
      case 'team':
        return <User className="w-4 h-4" />;
      case 'billing':
        return <FileText className="w-4 h-4" />;
      case 'analytics':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const exportLogs = (format: 'csv' | 'json') => {
    if (!canExportAudit) {
      toast.error('You don\'t have permission to export audit logs.');
      return;
    }

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filteredLogs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } else {
      const csvHeaders = [
        'Timestamp', 'User', 'Email', 'Action', 'Resource', 'Details', 'Severity', 'IP Address'
      ];
      
      const csvData = [
        csvHeaders,
        ...filteredLogs.map(log => [
          log.timestamp,
          log.userName,
          log.userEmail,
          log.action,
          log.resource,
          log.details,
          log.severity,
          log.ipAddress || 'N/A'
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }

    toast.success('Audit logs exported successfully! 📊');
  };

  if (!canViewAudit) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="glass-effect border-white/10 max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Access Denied</h3>
            <p className="text-gray-300">
              You don't have permission to view audit logs. Contact your administrator for access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Audit Logs</h1>
          <p className="text-gray-300 text-lg">
            Monitor all team activities and system events
          </p>
        </div>
        {canExportAudit && (
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
              onClick={() => exportLogs('csv')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              onClick={() => exportLogs('json')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Events', value: logs.length.toString(), icon: Activity, gradient: 'from-blue-500 to-purple-600' },
          { title: 'Today', value: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length.toString(), icon: Calendar, gradient: 'from-green-500 to-blue-600' },
          { title: 'High Priority', value: logs.filter(l => ['high', 'critical'].includes(l.severity)).length.toString(), icon: AlertTriangle, gradient: 'from-orange-500 to-red-600' },
          { title: 'Users Active', value: new Set(logs.map(l => l.userId)).size.toString(), icon: User, gradient: 'from-purple-500 to-pink-600' }
        ].map((stat, index) => (
          <Card 
            key={index} 
            className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search activities, users, or actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs List */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-500" />
            Activity Timeline
          </CardTitle>
          <CardDescription className="text-gray-300">
            Chronological record of all system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <Card 
                key={log.id}
                className="glass-effect border border-white/10 hover:border-purple-500/30 hover-scale cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 0.02}s` }}
                onClick={() => setSelectedLog(log)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="w-10 h-10 border-2 border-purple-500/50">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                          {log.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-white transition-all duration-300 group-hover:gradient-text">
                            {log.action}
                          </h4>
                          <Badge className={getSeverityColor(log.severity)}>
                            {getSeverityIcon(log.severity)}
                            {log.severity}
                          </Badge>
                          <div className="flex items-center text-purple-300">
                            {getResourceIcon(log.resource)}
                            <span className="ml-1 text-sm">{log.resource}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{log.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {log.userName} ({log.userEmail})
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          {log.ipAddress && (
                            <span>IP: {log.ipAddress}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No audit logs found</h3>
              <p className="text-gray-300">
                {searchQuery || severityFilter !== 'all' || resourceFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'No activities have been logged yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Details Modal */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="glass-effect border-white/20 max-w-2xl">
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="gradient-text text-2xl">Activity Details</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Complete information about this activity
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Action</div>
                    <div className="text-white font-medium">{selectedLog.action}</div>
                  </div>
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Resource</div>
                    <div className="text-white font-medium">{selectedLog.resource}</div>
                  </div>
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">User</div>
                    <div className="text-white font-medium">{selectedLog.userName}</div>
                    <div className="text-gray-400 text-sm">{selectedLog.userEmail}</div>
                  </div>
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Timestamp</div>
                    <div className="text-white font-medium">
                      {new Date(selectedLog.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="text-sm text-gray-400 mb-2">Details</div>
                  <div className="text-white">{selectedLog.details}</div>
                </div>

                {selectedLog.metadata && (
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-sm text-gray-400 mb-2">Metadata</div>
                    <pre className="text-white text-sm bg-black/20 p-3 rounded-lg overflow-auto">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 glass-effect border border-white/10 rounded-xl text-center">
                    <Badge className={getSeverityColor(selectedLog.severity)}>
                      {getSeverityIcon(selectedLog.severity)}
                      {selectedLog.severity}
                    </Badge>
                    <div className="text-xs text-gray-400 mt-1">Severity</div>
                  </div>
                  {selectedLog.ipAddress && (
                    <div className="p-4 glass-effect border border-white/10 rounded-xl text-center">
                      <div className="text-white font-medium">{selectedLog.ipAddress}</div>
                      <div className="text-xs text-gray-400 mt-1">IP Address</div>
                    </div>
                  )}
                  {selectedLog.resourceId && (
                    <div className="p-4 glass-effect border border-white/10 rounded-xl text-center">
                      <div className="text-white font-medium">{selectedLog.resourceId}</div>
                      <div className="text-xs text-gray-400 mt-1">Resource ID</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}