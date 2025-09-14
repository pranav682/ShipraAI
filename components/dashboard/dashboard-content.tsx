'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  MessageSquare, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Activity, 
  Users, 
  Zap,
  Sparkles, 
  Rocket, 
  Star, 
  Brain,
  FileText,
  BarChart3,
  Database,
  Mail,
  Phone
} from 'lucide-react';

const deliveredAutomations = [
  {
    id: 1,
    name: 'Customer Onboarding Flow',
    description: 'Automated welcome sequence with personalized emails',
    status: 'active',
    deliveredDate: '2024-01-15',
    lastRun: '2 hours ago',
    totalRuns: 1247,
    successRate: 98.5,
    dataGenerated: '2.3K records',
    type: 'Email Automation'
  },
  {
    id: 2,
    name: 'Lead Scoring Engine',
    description: 'AI-powered lead qualification and scoring system',
    status: 'active',
    deliveredDate: '2024-01-10',
    lastRun: '15 minutes ago',
    totalRuns: 3421,
    successRate: 99.2,
    dataGenerated: '5.7K leads scored',
    type: 'AI Analytics'
  },
  {
    id: 3,
    name: 'Invoice Processing Bot',
    description: 'Automated invoice generation and payment tracking',
    status: 'maintenance',
    deliveredDate: '2024-01-08',
    lastRun: '1 day ago',
    totalRuns: 856,
    successRate: 97.8,
    dataGenerated: '1.2K invoices',
    type: 'Financial Automation'
  }
];

const pendingRequests = [
  {
    id: 1,
    title: 'Social Media Analytics Dashboard',
    description: 'Need automated reporting for Instagram, TikTok, and LinkedIn metrics',
    requestDate: '2024-01-20',
    status: 'in_consultation',
    priority: 'high',
    consultationDate: '2024-01-25'
  },
  {
    id: 2,
    title: 'Inventory Sync Automation',
    description: 'Real-time inventory synchronization between Shopify and warehouse system',
    requestDate: '2024-01-18',
    status: 'requirements_gathering',
    priority: 'medium',
    estimatedDelivery: '2024-02-15'
  }
];

const stats = [
  {
    title: 'Live Automations',
    value: '12',
    change: '+3 this month',
    icon: Activity,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Data Generated',
    value: '47.2K',
    change: '+23% this week',
    icon: Database,
    gradient: 'from-green-500 to-blue-600'
  },
  {
    title: 'Time Saved',
    value: '142h',
    change: '+18% this month',
    icon: Clock,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Success Rate',
    value: '98.7%',
    change: '+0.3% improvement',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-600'
  }
];

export function DashboardContent() {
  const [selectedAutomation, setSelectedAutomation] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Your automation results are delivering incredible value 🔥
          </p>
        </div>
        <Button className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
          <Plus className="w-4 h-4 mr-2" />
          Request New Automation
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Delivered Automations */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Rocket className="w-6 h-6 mr-2 text-blue-500" />
                    Your Live Automations
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Custom automations we've built and deployed for your business
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                  View All Results
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveredAutomations.map((automation, index) => (
                  <div 
                    key={automation.id} 
                    className="flex items-center justify-between p-6 glass-effect border border-white/10 rounded-2xl hover:border-purple-500/30 hover-scale hover-glow group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-semibold text-white text-lg transition-all duration-300 group-hover:gradient-text">{automation.name}</h4>
                        <Badge 
                          className={
                            automation.status === 'active' 
                              ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30' 
                              : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30'
                          }
                        >
                          {automation.status === 'active' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {automation.status === 'active' ? 'Live' : 'Maintenance'}
                        </Badge>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">{automation.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{automation.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                        <div>
                          <span>Delivered: <span className="text-gray-300">{new Date(automation.deliveredDate).toLocaleDateString()}</span></span>
                        </div>
                        <div>
                          <span>Success Rate: <span className="text-green-400 font-medium">{automation.successRate}%</span></span>
                        </div>
                        <div>
                          <span>Last Run: <span className="text-gray-300">{automation.lastRun}</span></span>
                        </div>
                        <div>
                          <span>Data Generated: <span className="text-blue-400 font-medium">{automation.dataGenerated}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale">
                        <Eye className="w-4 h-4 mr-2" />
                        View Data
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Requests */}
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-orange-500" />
                Automation Requests
              </CardTitle>
              <CardDescription className="text-gray-300">Your requests being built by our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div key={request.id} className="p-4 glass-effect border border-white/10 rounded-xl animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-white text-sm">{request.title}</h5>
                    <Badge 
                      className={
                        request.priority === 'high' 
                          ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30' 
                          : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30'
                      }
                    >
                      {request.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{request.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  {request.consultationDate && (
                    <div className="mt-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center text-xs text-purple-300">
                        <Calendar className="w-3 h-3 mr-1" />
                        Consultation: {new Date(request.consultationDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <Button className="w-full btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <BarChart3 className="w-4 h-4 mr-3" />
                View Analytics Dashboard
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <FileText className="w-4 h-4 mr-3" />
                Download Reports
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <Mail className="w-4 h-4 mr-3" />
                Schedule Consultation
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale">
                <Phone className="w-4 h-4 mr-3" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-effect border-white/10 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { color: 'bg-green-500', text: 'Lead Scoring Engine processed 247 new leads', time: '2 hours ago' },
                  { color: 'bg-blue-500', text: 'Customer Onboarding sent 45 welcome emails', time: '3 hours ago' },
                  { color: 'bg-purple-500', text: 'New automation request submitted', time: '1 day ago' },
                  { color: 'bg-orange-500', text: 'Monthly report generated and sent', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 animate-pulse`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}