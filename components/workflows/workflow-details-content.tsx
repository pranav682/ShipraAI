'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  BarChart3,
  Filter,
  Search,
  FileText,
  Database,
  Mail,
  TrendingUp,
  Zap,
  User,
  DollarSign,
  Activity,
  Settings,
  ExternalLink,
  RefreshCw
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Link from 'next/link';
import { workflowDetails, workflowRuns } from '@/lib/data/workflow-data';

interface WorkflowDetailsContentProps {
  workflowId: string;
}

export function WorkflowDetailsContent({ workflowId }: WorkflowDetailsContentProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRun, setSelectedRun] = useState<any>(null);
  const [dateRange, setDateRange] = useState('all');

  // Filter runs based on status and search
  const filteredRuns = workflowRuns.filter(run => {
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    const matchesSearch = run.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         run.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         run.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'failed':
        return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'running':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'failed':
        return <XCircle className="w-3 h-3 mr-1" />;
      case 'warning':
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case 'running':
        return <RefreshCw className="w-3 h-3 mr-1 animate-spin" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  const exportRunData = (run: any, format: 'csv' | 'json') => {
    const data = {
      runId: run.id,
      runNumber: run.runNumber,
      startTime: run.startTime,
      endTime: run.endTime,
      duration: run.duration,
      status: run.status,
      trigger: run.trigger,
      triggeredBy: run.triggeredBy,
      recordsProcessed: run.recordsProcessed,
      dataGenerated: run.dataGenerated,
      executionCost: run.executionCost,
      version: run.version,
      output: run.output,
      steps: run.steps
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workflow-run-${run.runNumber}.json`;
      a.click();
    } else {
      // CSV format
      const csvData = [
        ['Field', 'Value'],
        ['Run ID', run.id],
        ['Run Number', run.runNumber],
        ['Start Time', run.startTime],
        ['End Time', run.endTime],
        ['Duration', run.duration],
        ['Status', run.status],
        ['Trigger', run.trigger],
        ['Triggered By', run.triggeredBy],
        ['Records Processed', run.recordsProcessed],
        ['Data Generated', run.dataGenerated],
        ['Execution Cost', `$${run.executionCost}`],
        ['Version', run.version],
        ['Emails Sent', run.output.emailsSent],
        ['Emails Delivered', run.output.emailsDelivered],
        ['Emails Opened', run.output.emailsOpened],
        ['Emails Clicked', run.output.emailsClicked],
        ['CRM Records Updated', run.output.crmRecordsUpdated]
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workflow-run-${run.runNumber}.csv`;
      a.click();
    }
  };

  const exportAllRuns = (format: 'csv' | 'json') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filteredRuns, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${workflowDetails.name.replace(/\s+/g, '-').toLowerCase()}-all-runs.json`;
      a.click();
    } else {
      const csvHeaders = [
        'Run ID', 'Run Number', 'Start Time', 'End Time', 'Duration', 'Status', 
        'Trigger', 'Triggered By', 'Records Processed', 'Data Generated', 
        'Execution Cost', 'Version', 'Emails Sent', 'Emails Delivered', 
        'Emails Opened', 'Emails Clicked', 'CRM Records Updated'
      ];
      
      const csvData = [
        csvHeaders,
        ...filteredRuns.map(run => [
          run.id, run.runNumber, run.startTime, run.endTime, run.duration,
          run.status, run.trigger, run.triggeredBy, run.recordsProcessed,
          run.dataGenerated, `$${run.executionCost}`, run.version,
          run.output.emailsSent, run.output.emailsDelivered,
          run.output.emailsOpened, run.output.emailsClicked,
          run.output.crmRecordsUpdated
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${workflowDetails.name.replace(/\s+/g, '-').toLowerCase()}-all-runs.csv`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/workflows">
            <Button variant="ghost" size="sm" className="hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workflows
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold gradient-text">{workflowDetails.name}</h1>
            <p className="text-gray-300">{workflowDetails.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button className="btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Button>
        </div>
      </div>

      {/* Workflow Overview */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white">Workflow Overview</CardTitle>
                  <CardDescription className="text-gray-300">
                    Performance metrics and execution details
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30">
                    <Activity className="w-3 h-3 mr-1" />
                    {workflowDetails.status}
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                    v{workflowDetails.version}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">{workflowDetails.metrics.totalRuns.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Runs</div>
                </div>
                <div className="text-center p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{workflowDetails.metrics.successRate}%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="text-center p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">{workflowDetails.metrics.avgExecutionTime}</div>
                  <div className="text-sm text-gray-400">Avg Duration</div>
                </div>
                <div className="text-center p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">{workflowDetails.metrics.totalCost}</div>
                  <div className="text-sm text-gray-400">Total Cost</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Features</h4>
                  <ul className="space-y-2">
                    {workflowDetails.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Integrations</h4>
                  <div className="flex flex-wrap gap-2">
                    {workflowDetails.integrations.map((integration, idx) => (
                      <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-300">
                        {integration}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="text-white font-medium mb-3 mt-4">Triggers</h4>
                  <ul className="space-y-1">
                    {workflowDetails.triggers.map((trigger, idx) => (
                      <li key={idx} className="text-sm text-gray-300">• {trigger}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <Play className="w-4 h-4 mr-3" />
                Trigger Manual Run
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <Pause className="w-4 h-4 mr-3" />
                Pause Workflow
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <ExternalLink className="w-4 h-4 mr-3" />
                View in Builder
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-lg text-white">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                onClick={() => exportAllRuns('csv')}
              >
                <Download className="w-4 h-4 mr-3" />
                Export All (CSV)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                onClick={() => exportAllRuns('json')}
              >
                <FileText className="w-4 h-4 mr-3" />
                Export All (JSON)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Runs Section */}
      <Card className="glass-effect border-white/10 animate-slide-up">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-white">Execution Runs</CardTitle>
              <CardDescription className="text-gray-300">
                Individual run history with detailed execution data
              </CardDescription>
            </div>
            <Badge className="w-fit bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              {filteredRuns.length} runs found
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by trigger, email, or run ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Runs List */}
          <div className="space-y-4">
            {filteredRuns.map((run, index) => (
              <Card 
                key={run.id}
                className="glass-effect border border-white/10 hover:border-purple-500/30 hover-scale cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedRun(run)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-semibold text-white text-lg">Run #{run.runNumber}</h4>
                        <Badge className={getStatusColor(run.status)}>
                          {getStatusIcon(run.status)}
                          {run.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500/30 text-gray-300">
                          {run.trigger}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Start Time</div>
                          <div className="text-white font-medium">
                            {new Date(run.startTime).toLocaleDateString()} {new Date(run.startTime).toLocaleTimeString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Duration</div>
                          <div className="text-white font-medium">{run.duration}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Triggered By</div>
                          <div className="text-white font-medium">{run.triggeredBy}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Cost</div>
                          <div className="text-white font-medium">${run.executionCost}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                        <div>
                          <div className="text-gray-400">Records Processed</div>
                          <div className="text-blue-400 font-medium">{run.recordsProcessed}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Emails Sent</div>
                          <div className="text-green-400 font-medium">{run.output.emailsSent}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Emails Opened</div>
                          <div className="text-purple-400 font-medium">{run.output.emailsOpened}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">CRM Updates</div>
                          <div className="text-orange-400 font-medium">{run.output.crmRecordsUpdated}</div>
                        </div>
                      </div>

                      {run.errors && run.errors.length > 0 && (
                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="text-red-300 text-sm">
                            <strong>Errors:</strong> {run.errors.join(', ')}
                          </div>
                        </div>
                      )}

                      {run.warnings && run.warnings.length > 0 && (
                        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="text-yellow-300 text-sm">
                            <strong>Warnings:</strong> {run.warnings.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      <Button size="sm" className="btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportRunData(run, 'csv');
                          }}
                        >
                          CSV
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportRunData(run, 'json');
                          }}
                        >
                          JSON
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRuns.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No runs found</h3>
              <p className="text-gray-300">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your filters to see more results.'
                  : 'This workflow hasn\'t been executed yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Run Details Modal */}
      <Dialog open={!!selectedRun} onOpenChange={() => setSelectedRun(null)}>
        <DialogContent className="glass-effect border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRun && (
            <>
              <DialogHeader>
                <DialogTitle className="gradient-text text-2xl">
                  Run #{selectedRun.runNumber} Details
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Complete execution information and step-by-step breakdown
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/20">Overview</TabsTrigger>
                  <TabsTrigger value="steps" className="data-[state=active]:bg-purple-600/20">Execution Steps</TabsTrigger>
                  <TabsTrigger value="output" className="data-[state=active]:bg-purple-600/20">Output Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Run ID</div>
                      <div className="text-white font-medium">{selectedRun.id}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <Badge className={getStatusColor(selectedRun.status)}>
                        {getStatusIcon(selectedRun.status)}
                        {selectedRun.status}
                      </Badge>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Start Time</div>
                      <div className="text-white font-medium">
                        {new Date(selectedRun.startTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">End Time</div>
                      <div className="text-white font-medium">
                        {new Date(selectedRun.endTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Duration</div>
                      <div className="text-white font-medium">{selectedRun.duration}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Execution Cost</div>
                      <div className="text-white font-medium">${selectedRun.executionCost}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Trigger</div>
                      <div className="text-white font-medium">{selectedRun.trigger}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Triggered By</div>
                      <div className="text-white font-medium">{selectedRun.triggeredBy}</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="steps" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {selectedRun.steps.map((step: any, idx: number) => (
                      <div key={idx} className="p-4 glass-effect border border-white/10 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-lg font-bold text-gray-400">#{idx + 1}</div>
                            <div>
                              <div className="font-medium text-white">{step.name}</div>
                              <div className="text-sm text-gray-400">Duration: {step.duration}</div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(step.status)}>
                            {getStatusIcon(step.status)}
                            {step.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="output" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Emails Sent</div>
                      <div className="text-2xl font-bold text-green-400">{selectedRun.output.emailsSent}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Emails Delivered</div>
                      <div className="text-2xl font-bold text-blue-400">{selectedRun.output.emailsDelivered}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Emails Opened</div>
                      <div className="text-2xl font-bold text-purple-400">{selectedRun.output.emailsOpened}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Emails Clicked</div>
                      <div className="text-2xl font-bold text-orange-400">{selectedRun.output.emailsClicked}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Bounce Rate</div>
                      <div className="text-2xl font-bold text-red-400">{selectedRun.output.bounceRate}%</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">CRM Records Updated</div>
                      <div className="text-2xl font-bold text-cyan-400">{selectedRun.output.crmRecordsUpdated}</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  className="flex-1 btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale"
                  onClick={() => exportRunData(selectedRun, 'csv')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/20 hover:bg-white/10 hover-scale"
                  onClick={() => exportRunData(selectedRun, 'json')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}