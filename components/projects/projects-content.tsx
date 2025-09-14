'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  MessageSquare,
  Calendar,
  Activity,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Rocket,
  Brain,
  BarChart3,
  FileText,
  Mail,
  Database,
  TrendingUp,
  Settings,
  FolderOpen,
  Users,
  Star
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

const projects = [
  {
    id: 1,
    name: 'Customer Experience Automation',
    description: 'Complete customer journey automation from lead to retention',
    status: 'active',
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-25',
    automationsCount: 3,
    totalInvestment: 1891,
    category: 'Customer Success',
    automations: [
      {
        id: 1,
        name: 'Lead Capture & Qualification',
        status: 'live',
        deliveredDate: '2024-01-15',
        cost: 597,
        metrics: { runs: 1247, successRate: 98.5, dataGenerated: '2.3K leads' }
      },
      {
        id: 2,
        name: 'Customer Onboarding Flow',
        status: 'live',
        deliveredDate: '2024-01-20',
        cost: 697,
        metrics: { runs: 856, successRate: 97.8, dataGenerated: '856 customers' }
      },
      {
        id: 3,
        name: 'Retention & Upsell Engine',
        status: 'in_development',
        estimatedDelivery: '2024-02-05',
        cost: 897,
        progress: 75
      }
    ]
  },
  {
    id: 2,
    name: 'Sales Operations Hub',
    description: 'End-to-end sales process automation and analytics',
    status: 'active',
    createdDate: '2024-01-05',
    lastUpdated: '2024-01-22',
    automationsCount: 2,
    totalInvestment: 1794,
    category: 'Sales',
    automations: [
      {
        id: 4,
        name: 'AI Lead Scoring Engine',
        status: 'live',
        deliveredDate: '2024-01-18',
        cost: 1297,
        metrics: { runs: 3421, successRate: 99.2, dataGenerated: '5.7K leads scored' }
      },
      {
        id: 5,
        name: 'Sales Pipeline Analytics',
        status: 'consultation_scheduled',
        consultationDate: '2024-01-28',
        cost: 497,
        estimatedDelivery: '2024-02-10'
      }
    ]
  },
  {
    id: 3,
    name: 'Marketing Automation Suite',
    description: 'Multi-channel marketing automation and performance tracking',
    status: 'planning',
    createdDate: '2024-01-20',
    lastUpdated: '2024-01-23',
    automationsCount: 1,
    totalInvestment: 897,
    category: 'Marketing',
    automations: [
      {
        id: 6,
        name: 'Social Media Analytics Dashboard',
        status: 'in_development',
        estimatedDelivery: '2024-02-05',
        cost: 897,
        progress: 65
      }
    ]
  }
];

export function ProjectsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showAddAutomationModal, setShowAddAutomationModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    category: '',
    goals: ''
  });
  const [newAutomation, setNewAutomation] = useState({
    projectId: null,
    title: '',
    description: '',
    requirements: '',
    priority: 'medium'
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'planning':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'completed':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getAutomationStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'in_development':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30';
      case 'consultation_scheduled':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New project:', newProject);
    setShowNewProjectModal(false);
    setNewProject({ name: '', description: '', category: '', goals: '' });
  };

  const handleAddAutomation = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New automation for project:', newAutomation);
    setShowAddAutomationModal(false);
    setNewAutomation({ projectId: null, title: '', description: '', requirements: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Projects</h1>
          <p className="text-gray-300 text-lg">
            Organize your automations into projects and track their collective impact
          </p>
        </div>
        <Dialog open={showNewProjectModal} onOpenChange={setShowNewProjectModal}>
          <DialogTrigger asChild>
            <Button className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              New Project
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="gradient-text text-2xl">Create New Project</DialogTitle>
              <DialogDescription className="text-gray-300">
                Group related automations together to track their collective impact
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-6 mt-4">
              <div>
                <Label htmlFor="projectName" className="text-gray-300">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Customer Experience Automation"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectCategory" className="text-gray-300">Category</Label>
                <Select value={newProject.category} onValueChange={(value) => setNewProject(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="customer_success">Customer Success</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="projectDescription" className="text-gray-300">Description</Label>
                <Textarea
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the overall goal of this project..."
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectGoals" className="text-gray-300">Success Metrics & Goals</Label>
                <Textarea
                  id="projectGoals"
                  value={newProject.goals}
                  onChange={(e) => setNewProject(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="What metrics will you use to measure success? What are your target outcomes?"
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  type="submit" 
                  className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewProjectModal(false)}
                  className="border-white/20 hover:bg-white/10 hover-scale"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Projects', value: '3', icon: FolderOpen, gradient: 'from-blue-500 to-purple-600' },
          { title: 'Live Automations', value: '6', icon: Zap, gradient: 'from-green-500 to-blue-600' },
          { title: 'Total Investment', value: '$5,582', icon: TrendingUp, gradient: 'from-purple-500 to-pink-600' },
          { title: 'Avg Success Rate', value: '98.3%', icon: Star, gradient: 'from-orange-500 to-red-600' }
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
                placeholder="Search projects..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Customer Success">Customer Success</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project, index) => (
          <Card 
            key={project.id} 
            className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CardTitle className="text-xl text-white transition-all duration-300 group-hover:gradient-text">{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      <Activity className="w-3 h-3 mr-1" />
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">{project.category}</Badge>
                  </div>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </CardDescription>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-white">${project.totalInvestment.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Investment</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs defaultValue="automations" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass-effect">
                  <TabsTrigger value="automations" className="data-[state=active]:bg-purple-600/20">
                    Automations ({project.automationsCount})
                  </TabsTrigger>
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/20">
                    Overview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="automations" className="space-y-4 mt-4">
                  {project.automations.map((automation, idx) => (
                    <div key={automation.id} className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-white">{automation.name}</h4>
                          <Badge className={getAutomationStatusColor(automation.status)}>
                            {automation.status === 'live' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {automation.status === 'in_development' && <Zap className="w-3 h-3 mr-1" />}
                            {automation.status === 'consultation_scheduled' && <Calendar className="w-3 h-3 mr-1" />}
                            {automation.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">${automation.cost}</div>
                          <div className="text-xs text-gray-400">
                            {automation.deliveredDate ? `Delivered ${new Date(automation.deliveredDate).toLocaleDateString()}` : 
                             automation.estimatedDelivery ? `Est. ${new Date(automation.estimatedDelivery).toLocaleDateString()}` :
                             automation.consultationDate ? `Consultation ${new Date(automation.consultationDate).toLocaleDateString()}` : ''}
                          </div>
                        </div>
                      </div>

                      {automation.progress && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-white">{automation.progress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${automation.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {automation.metrics && (
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="text-center p-2 glass-effect border border-white/10 rounded-lg">
                            <div className="text-sm font-bold text-blue-400">{automation.metrics.runs.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Runs</div>
                          </div>
                          <div className="text-center p-2 glass-effect border border-white/10 rounded-lg">
                            <div className="text-sm font-bold text-green-400">{automation.metrics.successRate}%</div>
                            <div className="text-xs text-gray-400">Success</div>
                          </div>
                          <div className="text-center p-2 glass-effect border border-white/10 rounded-lg">
                            <div className="text-sm font-bold text-purple-400">{automation.metrics.dataGenerated}</div>
                            <div className="text-xs text-gray-400">Generated</div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {automation.status === 'live' && (
                          <>
                            <Button size="sm" className="flex-1 btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
                              <Eye className="w-4 h-4 mr-2" />
                              View Analytics
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 hover-scale">
                              <Plus className="w-4 h-4 mr-2" />
                              Enhance
                            </Button>
                          </>
                        )}
                        {automation.status === 'in_development' && (
                          <Button variant="outline" size="sm" className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Team
                          </Button>
                        )}
                        {automation.status === 'consultation_scheduled' && (
                          <Button size="sm" className="w-full btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
                            <Calendar className="w-4 h-4 mr-2" />
                            Join Consultation
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Dialog open={showAddAutomationModal} onOpenChange={setShowAddAutomationModal}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                        onClick={() => setNewAutomation(prev => ({ ...prev, projectId: project.id }))}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Automation to Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-effect border-white/20 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="gradient-text text-xl">Add Automation to {project.name}</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Request a new automation to be added to this project
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddAutomation} className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="automationTitle" className="text-gray-300">Automation Title</Label>
                          <Input
                            id="automationTitle"
                            value={newAutomation.title}
                            onChange={(e) => setNewAutomation(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g., Customer Retention Engine"
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="automationDescription" className="text-gray-300">Description</Label>
                          <Textarea
                            id="automationDescription"
                            value={newAutomation.description}
                            onChange={(e) => setNewAutomation(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe what this automation should do..."
                            rows={3}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="automationRequirements" className="text-gray-300">Requirements</Label>
                          <Textarea
                            id="automationRequirements"
                            value={newAutomation.requirements}
                            onChange={(e) => setNewAutomation(prev => ({ ...prev, requirements: e.target.value }))}
                            placeholder="What tools should it integrate with? What specific features do you need?"
                            rows={3}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="automationPriority" className="text-gray-300">Priority</Label>
                          <Select value={newAutomation.priority} onValueChange={(value) => setNewAutomation(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-effect border-white/20">
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex space-x-3">
                          <Button 
                            type="submit" 
                            className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Project
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowAddAutomationModal(false)}
                            className="border-white/20 hover:bg-white/10 hover-scale"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Created</div>
                      <div className="text-white font-medium">{new Date(project.createdDate).toLocaleDateString()}</div>
                    </div>
                    <div className="p-4 glass-effect border border-white/10 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                      <div className="text-white font-medium">{new Date(project.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 glass-effect border border-white/10 rounded-xl">
                    <h4 className="text-white font-medium mb-2">Project Impact</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                          {project.automations.filter(a => a.status === 'live').length}
                        </div>
                        <div className="text-xs text-gray-400">Live Automations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          {project.automations.reduce((sum, a) => sum + (a.metrics?.runs || 0), 0).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">Total Runs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">
                          ${project.totalInvestment.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">Investment</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="glass-effect border-white/10">
          <CardContent className="py-12 text-center">
            <FolderOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-300 mb-6">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Create your first project to organize your automations!'}
            </p>
            {(!searchQuery && statusFilter === 'all' && categoryFilter === 'all') && (
              <Button 
                onClick={() => setShowNewProjectModal(true)}
                className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Project
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}