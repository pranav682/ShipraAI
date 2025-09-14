'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Plus, 
  Zap, 
  Mail, 
  Webhook, 
  Clock, 
  GitBranch, 
  Database, 
  MessageSquare,
  Save,
  Play,
  Trash2,
  Settings
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WorkflowBuilderProps {
  onClose: () => void;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  name: string;
  icon: any;
  color: string;
  config?: any;
}

const triggerTypes = [
  { id: 'webhook', name: 'Webhook', icon: Webhook, color: 'bg-blue-100 text-blue-600' },
  { id: 'schedule', name: 'Schedule', icon: Clock, color: 'bg-green-100 text-green-600' },
  { id: 'email', name: 'Email Received', icon: Mail, color: 'bg-purple-100 text-purple-600' },
];

const actionTypes = [
  { id: 'send-email', name: 'Send Email', icon: Mail, color: 'bg-orange-100 text-orange-600' },
  { id: 'api-call', name: 'API Call', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'database', name: 'Database Action', icon: Database, color: 'bg-red-100 text-red-600' },
  { id: 'slack', name: 'Send Slack Message', icon: MessageSquare, color: 'bg-indigo-100 text-indigo-600' },
];

export function WorkflowBuilder({ onClose }: WorkflowBuilderProps) {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = (type: 'trigger' | 'action' | 'condition', nodeType: any) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type,
      name: nodeType.name,
      icon: nodeType.icon,
      color: nodeType.color,
      config: {}
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Workflow Builder</h1>
            <p className="text-muted-foreground">Design your automation workflow</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Test Run
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Node Library */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Workflow Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="My Workflow"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="Describe what this workflow does..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Triggers</CardTitle>
              <CardDescription>Start your workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {triggerTypes.map((trigger) => (
                <Button
                  key={trigger.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => addNode('trigger', trigger)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${trigger.color}`}>
                    <trigger.icon className="w-4 h-4" />
                  </div>
                  <span>{trigger.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Actions</CardTitle>
              <CardDescription>What happens next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {actionTypes.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => addNode('action', action)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${action.color}`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span>{action.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm h-[800px]">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                <Badge variant="secondary">{nodes.length} nodes</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-full">
              <div className="relative h-full">
                {nodes.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <GitBranch className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Start Building</h3>
                      <p className="text-muted-foreground">
                        Add triggers and actions from the sidebar to create your workflow
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {nodes.map((node, index) => (
                      <div key={node.id} className="relative">
                        <Card 
                          className={`cursor-pointer transition-colors ${
                            selectedNode === node.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${node.color}`}>
                                  <node.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="font-medium">{node.name}</div>
                                  <div className="text-xs text-muted-foreground uppercase">
                                    {node.type}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNode(node.id);
                                  }}
                                >
                                  <Settings className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNode(node.id);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        {index < nodes.length - 1 && (
                          <div className="flex justify-center py-2">
                            <div className="w-0.5 h-6 bg-gray-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Panel */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Properties</CardTitle>
              <CardDescription>
                {selectedNode ? 'Configure the selected node' : 'Select a node to configure'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <Label>Node Name</Label>
                    <Input 
                      value={nodes.find(n => n.id === selectedNode)?.name || ''}
                      onChange={(e) => {
                        setNodes(nodes.map(node => 
                          node.id === selectedNode 
                            ? { ...node, name: e.target.value }
                            : node
                        ));
                      }}
                    />
                  </div>

                  {/* Dynamic configuration based on node type */}
                  {nodes.find(n => n.id === selectedNode)?.type === 'trigger' && (
                    <div className="space-y-4">
                      <div>
                        <Label>Trigger Condition</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {nodes.find(n => n.id === selectedNode)?.type === 'action' && (
                    <div className="space-y-4">
                      <div>
                        <Label>Action Configuration</Label>
                        <Textarea 
                          placeholder="Configure action parameters..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click on a node in the canvas to configure its settings
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}