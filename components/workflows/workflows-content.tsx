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
  Eye, 
  Download, 
  MessageSquare,
  Calendar,
  BarChart3,
  Database,
  Mail,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  Rocket,
  Brain,
  FileText,
  Users,
  DollarSign,
  Target,
  Play,
  Activity
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

const deliveredWorkflows = [
  {
    id: 1,
    name: 'Customer Onboarding Sequence',
    description: 'Automated welcome emails, account setup, and first-week engagement',
    category: 'Email Marketing',
    deliveredDate: '2024-01-20',
    consultant: 'Sarah Chen',
    metrics: {
      totalRuns: 1247,
      successRate: 98.5,
      dataGenerated: '2.3K new customers',
      timesSaved: '45h/week',
      roi: '340%'
    },
    features: [
      'Personalized welcome emails',
      'Automated account verification',
      'Progressive onboarding steps',
      'Engagement tracking',
      'Churn prediction alerts'
    ]
  },
  {
    id: 2,
    name: 'AI Lead Scoring Engine',
    description: 'Machine learning model that scores and routes leads automatically',
    category: 'Sales Automation',
    deliveredDate: '2024-01-18',
    consultant: 'Mike Rodriguez',
    metrics: {
      totalRuns: 3421,
      successRate: 99.2,
      dataGenerated: '5.7K leads scored',
      timesSaved: '32h/week',
      roi: '520%'
    },
    features: [
      'Real-time lead scoring',
      'Automatic lead routing',
      'CRM integration',
      'Performance analytics',
      'Custom scoring criteria'
    ]
  },
  {
    id: 3,
    name: 'Financial Reporting Dashboard',
    description: 'Automated invoice processing and financial reporting system',
    category: 'Finance',
    deliveredDate: '2024-01-15',
    consultant: 'Alex Kim',
    metrics: {
      totalRuns: 856,
      successRate: 97.8,
      dataGenerated: '1.2K invoices processed',
      timesSaved: '28h/week',
      roi: '280%'
    },
    features: [
      'Automated invoice generation',
      'Payment tracking',
      'Financial reporting',
      'Tax compliance',
      'Expense categorization'
    ]
  }
];

const workflowTemplates = [
  {
    id: 1,
    name: 'E-commerce Order Processing',
    description: 'Complete order fulfillment automation from purchase to delivery',
    category: 'E-commerce',
    estimatedTime: '2-3 weeks',
    complexity: 'Medium',
    features: ['Order processing', 'Inventory sync', 'Shipping automation', 'Customer notifications']
  },
  {
    id: 2,
    name: 'Social Media Management',
    description: 'Automated content scheduling, engagement tracking, and analytics',
    category: 'Marketing',
    estimatedTime: '1-2 weeks',
    complexity: 'Low',
    features: ['Content scheduling', 'Engagement tracking', 'Analytics dashboard', 'Hashtag optimization']
  },
  {
    id: 3,
    name: 'HR Recruitment Pipeline',
    description: 'Automated candidate screening, interview scheduling, and onboarding',
    category: 'HR',
    estimatedTime: '3-4 weeks',
    complexity: 'High',
    features: ['Resume screening', 'Interview scheduling', 'Background checks', 'Onboarding automation']
  }
];

export function WorkflowsContent() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [customRequest, setCustomRequest] = useState({
    title: '',
    description: '',
    category: '',
    requirements: '',
    timeline: ''
  });

  const handleTemplateRequest = (template: any) => {
    setSelectedTemplate(template);
    setCustomRequest({
      title: template.name,
      description: template.description,
      category: template.category,
      requirements: `Based on ${template.name} template:\n\n${template.features.map((f: string) => `• ${f}`).join('\n')}`,
      timeline: template.estimatedTime
    });
    setShowRequestModal(true);
  };

  const handleCustomRequest = () => {
    setSelectedTemplate(null);
    setCustomRequest({
      title: '',
      description: '',
      category: '',
      requirements: '',
      timeline: ''
    });
    setShowRequestModal(true);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Workflow request:', customRequest);
    setShowRequestModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Automation Gallery</h1>
          <p className="text-gray-300 text-lg">
            Explore your delivered automations and request new custom solutions
          </p>
        </div>
        <Button 
          onClick={handleCustomRequest}
          className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Custom Automation
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Delivered Workflows */}
      <Card className="glass-effect border-white/10 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Your Live Automations
          </CardTitle>
          <CardDescription className="text-gray-300">
            Custom automations our team has built and deployed for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {deliveredWorkflows.map((workflow, index) => (
              <Card 
                key={workflow.id}
                className="glass-effect border border-white/10 hover:border-purple-500/30 hover-scale hover-glow group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 lg:mr-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:gradient-text">
                          {workflow.name}
                        </h3>
                        <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                          {workflow.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{workflow.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                          <div className="text-lg font-bold text-blue-400">{workflow.metrics.totalRuns.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Total Runs</div>
                        </div>
                        <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                          <div className="text-lg font-bold text-green-400">{workflow.metrics.successRate}%</div>
                          <div className="text-xs text-gray-400">Success Rate</div>
                        </div>
                        <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                          <div className="text-lg font-bold text-purple-400">{workflow.metrics.dataGenerated}</div>
                          <div className="text-xs text-gray-400">Data Generated</div>
                        </div>
                        <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                          <div className="text-lg font-bold text-orange-400">{workflow.metrics.timesSaved}</div>
                          <div className="text-xs text-gray-400">Time Saved</div>
                        </div>
                        <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                          <div className="text-lg font-bold text-yellow-400">{workflow.metrics.roi}</div>
                          <div className="text-xs text-gray-400">ROI</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Delivered: {new Date(workflow.deliveredDate).toLocaleDateString()}</span>
                        <span>Consultant: <span className="text-purple-300">{workflow.consultant}</span></span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      <Link href={`/workflows/${workflow.id}`}>
                        <Button size="sm" className="w-full btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
                          <Activity className="w-4 h-4 mr-2" />
                          View Runs & Analytics
                        </Button>
                      </Link>
                      <Button size="sm" className="btn-glow bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover-scale">
                        <Eye className="w-4 h-4 mr-2" />
                        Live Dashboard
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Enhancement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Templates */}
      <Card className="glass-effect border-white/10 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-500" />
            Popular Automation Templates
          </CardTitle>
          <CardDescription className="text-gray-300">
            Pre-designed automation solutions that our team can customize for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowTemplates.map((template, index) => (
              <Card 
                key={template.id}
                className="glass-effect border border-white/10 hover:border-purple-500/30 hover-scale cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleTemplateRequest(template)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      {template.category}
                    </Badge>
                    <Badge 
                      className={
                        template.complexity === 'Low' 
                          ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30'
                          : template.complexity === 'Medium'
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30'
                      }
                    >
                      {template.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white transition-all duration-300 group-hover:gradient-text">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-300">Features included:</h5>
                      <ul className="space-y-1">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {template.estimatedTime}
                      </span>
                    </div>

                    <Button className="w-full btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
                      <Plus className="w-4 h-4 mr-2" />
                      Request This Automation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="glass-effect border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">
              {selectedTemplate ? `Request: ${selectedTemplate.name}` : 'Request Custom Automation'}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {selectedTemplate 
                ? 'Our team will customize this template for your specific needs'
                : 'Tell us about the automation you need and our team will build it for you'
              }
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitRequest} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Automation Title</Label>
                <Input
                  id="title"
                  value={customRequest.title}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Customer Onboarding Flow"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Select value={customRequest.category} onValueChange={(value) => setCustomRequest(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="email_marketing">Email Marketing</SelectItem>
                    <SelectItem value="sales_automation">Sales Automation</SelectItem>
                    <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={customRequest.description}
                onChange={(e) => setCustomRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what you want this automation to accomplish..."
                rows={3}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="requirements" className="text-gray-300">Detailed Requirements</Label>
              <Textarea
                id="requirements"
                value={customRequest.requirements}
                onChange={(e) => setCustomRequest(prev => ({ ...prev, requirements: e.target.value }))}
                placeholder="What tools do you use? What's your current process? What specific features do you need?"
                rows={5}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="timeline" className="text-gray-300">Preferred Timeline</Label>
              <Select value={customRequest.timeline} onValueChange={(value) => setCustomRequest(prev => ({ ...prev, timeline: value }))}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-white/20">
                  <SelectItem value="asap">ASAP (Rush - additional fees apply)</SelectItem>
                  <SelectItem value="1-2_weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4_weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2_months">1-2 months</SelectItem>
                  <SelectItem value="flexible">Flexible timeline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Button 
                type="submit" 
                className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowRequestModal(false)}
                className="border-white/20 hover:bg-white/10 hover-scale"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}