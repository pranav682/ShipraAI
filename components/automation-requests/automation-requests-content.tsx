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
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Rocket,
  Brain,
  FileText,
  Mail,
  Phone,
  User,
  DollarSign,
  TrendingUp,
  Zap
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

const automationRequests = [
  {
    id: 1,
    title: 'Customer Onboarding Automation',
    description: 'Automated welcome sequence with personalized emails and account setup',
    status: 'delivered',
    requestDate: '2024-01-15',
    deliveryDate: '2024-01-22',
    category: 'Email Marketing',
    priority: 'high',
    consultant: 'Sarah Chen',
    estimatedCost: 597,
    finalCost: 597,
    complexity: 'Medium',
    integrations: ['Mailchimp', 'Salesforce', 'Slack'],
    results: {
      dataGenerated: '2.3K new customers',
      timesSaved: '45h/week',
      successRate: 98.5
    }
  },
  {
    id: 2,
    title: 'AI Lead Scoring Engine',
    description: 'Machine learning model that scores and routes leads automatically',
    status: 'delivered',
    requestDate: '2024-01-10',
    deliveryDate: '2024-01-20',
    category: 'Sales Automation',
    priority: 'high',
    consultant: 'Mike Rodriguez',
    estimatedCost: 1297,
    finalCost: 1297,
    complexity: 'High',
    integrations: ['HubSpot', 'Zapier', 'OpenAI'],
    results: {
      dataGenerated: '5.7K leads scored',
      timesSaved: '32h/week',
      successRate: 99.2
    }
  },
  {
    id: 3,
    title: 'Social Media Analytics Dashboard',
    description: 'Automated reporting for Instagram, TikTok, and LinkedIn metrics',
    status: 'in_development',
    requestDate: '2024-01-20',
    estimatedDelivery: '2024-02-05',
    category: 'Analytics',
    priority: 'medium',
    consultant: 'Alex Kim',
    estimatedCost: 897,
    complexity: 'Medium',
    integrations: ['Instagram API', 'TikTok API', 'LinkedIn API', 'Google Sheets'],
    progress: 65
  },
  {
    id: 4,
    title: 'E-commerce Inventory Sync',
    description: 'Real-time inventory synchronization between Shopify and warehouse',
    status: 'consultation_scheduled',
    requestDate: '2024-01-22',
    consultationDate: '2024-01-26',
    category: 'E-commerce',
    priority: 'high',
    consultant: 'Sarah Chen',
    estimatedCost: 1597,
    complexity: 'High',
    integrations: ['Shopify', 'WMS', 'Slack', 'Email']
  },
  {
    id: 5,
    title: 'Financial Reporting Bot',
    description: 'Automated invoice processing and financial reporting',
    status: 'requirements_gathering',
    requestDate: '2024-01-18',
    category: 'Finance',
    priority: 'medium',
    consultant: 'Mike Rodriguez',
    estimatedCost: 797,
    complexity: 'Medium',
    integrations: ['QuickBooks', 'Stripe', 'Email', 'Google Drive']
  }
];

export function AutomationRequestsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    requirements: '',
    timeline: '',
    budget: '',
    tools: ''
  });

  const filteredRequests = automationRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'in_development':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30';
      case 'consultation_scheduled':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
      case 'requirements_gathering':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'in_development':
        return <Zap className="w-3 h-3 mr-1" />;
      case 'consultation_scheduled':
        return <Calendar className="w-3 h-3 mr-1" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'Medium':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'High':
        return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New automation request:', newRequest);
    setShowRequestModal(false);
    setNewRequest({ 
      title: '', 
      description: '', 
      category: '', 
      priority: 'medium', 
      requirements: '',
      timeline: '',
      budget: '',
      tools: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Automation Requests</h1>
          <p className="text-gray-300 text-lg">
            Submit new automation requests and track their progress
          </p>
        </div>
        <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
          <DialogTrigger asChild>
            <Button className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Request New Automation
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="gradient-text text-2xl">Request New Automation</DialogTitle>
              <DialogDescription className="text-gray-300">
                Tell us about your automation needs and our team will provide a custom quote
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitRequest} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">Automation Title</Label>
                  <Input
                    id="title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Customer Onboarding Flow"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">Category</Label>
                  <Select value={newRequest.category} onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="email_marketing">Email Marketing</SelectItem>
                      <SelectItem value="sales_automation">Sales Automation</SelectItem>
                      <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                      <SelectItem value="finance">Finance & Accounting</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Brief Description</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe what you want to automate..."
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-gray-300">Detailed Requirements</Label>
                <Textarea
                  id="requirements"
                  value={newRequest.requirements}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="What tools do you use? What's your current process? What specific features do you need? What results do you want to achieve?"
                  rows={5}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tools" className="text-gray-300">Current Tools & Integrations</Label>
                  <Input
                    id="tools"
                    value={newRequest.tools}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, tools: e.target.value }))}
                    placeholder="e.g., Salesforce, Mailchimp, Slack, Google Sheets"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-gray-300">Budget Range (Optional)</Label>
                  <Select value={newRequest.budget} onValueChange={(value) => setNewRequest(prev => ({ ...prev, budget: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="under_500">Under $500</SelectItem>
                      <SelectItem value="500_1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000_2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500_5000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="over_5000">Over $5,000</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeline" className="text-gray-300">Preferred Timeline</Label>
                  <Select value={newRequest.timeline} onValueChange={(value) => setNewRequest(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="asap">ASAP (Rush - additional fees apply)</SelectItem>
                      <SelectItem value="1_week">Within 1 week</SelectItem>
                      <SelectItem value="2_weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="1_month">Within 1 month</SelectItem>
                      <SelectItem value="flexible">Flexible timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-gray-300">Priority Level</Label>
                  <Select value={newRequest.priority} onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="low">Low - Nice to have</SelectItem>
                      <SelectItem value="medium">Medium - Important</SelectItem>
                      <SelectItem value="high">High - Business critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Requests', value: '5', icon: FileText, gradient: 'from-blue-500 to-purple-600' },
          { title: 'Delivered', value: '2', icon: CheckCircle, gradient: 'from-green-500 to-blue-600' },
          { title: 'In Progress', value: '2', icon: Zap, gradient: 'from-yellow-500 to-orange-600' },
          { title: 'Total Investment', value: '$3,388', icon: DollarSign, gradient: 'from-purple-500 to-pink-600' }
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
                placeholder="Search automation requests..."
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
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in_development">In Development</SelectItem>
                <SelectItem value="consultation_scheduled">Consultation</SelectItem>
                <SelectItem value="requirements_gathering">Requirements</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                <SelectItem value="Sales Automation">Sales Automation</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRequests.map((request, index) => (
          <Card 
            key={request.id} 
            className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CardTitle className="text-xl text-white transition-all duration-300 group-hover:gradient-text">{request.title}</CardTitle>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">{request.category}</Badge>
                    <Badge className={getComplexityColor(request.complexity)}>
                      {request.complexity}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    {request.description}
                  </CardDescription>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-white">
                    ${request.finalCost || request.estimatedCost}
                  </div>
                  <div className="text-sm text-gray-400">
                    {request.finalCost ? 'Final Cost' : 'Estimated'}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Progress for in-development items */}
                {request.status === 'in_development' && request.progress && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Development Progress</span>
                      <span className="text-white font-medium">{request.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${request.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Delivered automation results */}
                {request.status === 'delivered' && request.results && (
                  <div className="grid grid-cols-3 gap-4 p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{request.results.successRate}%</div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{request.results.dataGenerated}</div>
                      <div className="text-xs text-gray-400">Data Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{request.results.timesSaved}</div>
                      <div className="text-xs text-gray-400">Time Saved</div>
                    </div>
                  </div>
                )}

                {/* Integrations */}
                {request.integrations && (
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Integrations:</div>
                    <div className="flex flex-wrap gap-2">
                      {request.integrations.map((integration, idx) => (
                        <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation info */}
                {request.consultationDate && (
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <div className="flex items-center text-sm text-purple-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      Consultation: {new Date(request.consultationDate).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Dates and consultant */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                    {request.deliveryDate && (
                      <span>Delivered: {new Date(request.deliveryDate).toLocaleDateString()}</span>
                    )}
                    {request.estimatedDelivery && (
                      <span>Est. Delivery: {new Date(request.estimatedDelivery).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span className="text-purple-300">{request.consultant}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 pt-2">
                  {request.status === 'delivered' && (
                    <>
                      <Button size="sm" className="flex-1 btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 hover-scale">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Enhancement
                      </Button>
                    </>
                  )}
                  {request.status === 'in_development' && (
                    <Button variant="outline" size="sm" className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact {request.consultant}
                    </Button>
                  )}
                  {request.status === 'consultation_scheduled' && (
                    <Button size="sm" className="w-full btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
                      <Calendar className="w-4 h-4 mr-2" />
                      Join Consultation
                    </Button>
                  )}
                  {request.status === 'requirements_gathering' && (
                    <Button variant="outline" size="sm" className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                      <FileText className="w-4 h-4 mr-2" />
                      Provide Additional Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <Card className="glass-effect border-white/10">
          <CardContent className="py-12 text-center">
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No automation requests found</h3>
            <p className="text-gray-300 mb-6">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Ready to automate your first process? Let\'s get started!'}
            </p>
            {(!searchQuery && statusFilter === 'all' && categoryFilter === 'all') && (
              <Button 
                onClick={() => setShowRequestModal(true)}
                className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Your First Automation
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}