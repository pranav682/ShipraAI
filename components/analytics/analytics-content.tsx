'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock, 
  Database, 
  Zap,
  Download,
  Calendar,
  Filter,
  Eye,
  DollarSign,
  Users,
  Target,
  Sparkles
} from 'lucide-react';

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Analytics</h1>
          <p className="text-gray-300 text-lg">
            Track your automation performance and business impact
          </p>
        </div>
        <Button className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
          <Download className="w-4 h-4 mr-2" />
          Export Report
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Automations', value: '12', icon: Zap, gradient: 'from-blue-500 to-purple-600' },
          { title: 'Data Processed', value: '47.2K', icon: Database, gradient: 'from-green-500 to-blue-600' },
          { title: 'Time Saved', value: '142h', icon: Clock, gradient: 'from-purple-500 to-pink-600' },
          { title: 'ROI Generated', value: '340%', icon: TrendingUp, gradient: 'from-orange-500 to-red-600' }
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

      {/* Analytics Content */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-gray-300">
            Detailed insights into your automation performance
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard Coming Soon</h3>
            <p className="text-gray-300 mb-6">
              We're building comprehensive analytics to help you track your automation ROI and performance metrics.
            </p>
            <Button className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
              <Eye className="w-4 h-4 mr-2" />
              Request Analytics Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}