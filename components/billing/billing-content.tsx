'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Zap, 
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Star,
  MessageSquare,
  Users,
  Clock,
  Brain,
  Settings,
  FileText,
  Phone
} from 'lucide-react';

const subscriptionPlans = [
  {
    name: 'Starter',
    price: 0,
    period: 'month',
    description: 'Perfect for testing our automation service',
    features: [
      '1 automation consultation/month',
      'Basic automation templates',
      'Email support',
      'Dashboard access',
      'Basic analytics'
    ],
    current: false,
    automationQuote: 'Starting at $297 per automation'
  },
  {
    name: 'Professional',
    price: 297,
    period: 'month',
    description: 'For businesses ready to scale with automation',
    features: [
      '5 automation consultations/month',
      'Priority consultation scheduling',
      'Advanced automation templates',
      'Dedicated automation specialist',
      'Advanced analytics & reporting',
      'Priority support'
    ],
    current: true,
    popular: true,
    automationQuote: 'Custom automations from $497 each'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with complex automation needs',
    features: [
      'Unlimited consultations',
      'Dedicated automation team',
      '24/7 priority support',
      'Custom integrations',
      'SLA guarantees',
      'On-site consultation available'
    ],
    current: false,
    automationQuote: 'Volume pricing available'
  }
];

const recentAutomations = [
  {
    id: 'AUTO-001',
    name: 'Customer Onboarding Flow',
    consultationDate: '2024-01-10',
    deliveryDate: '2024-01-20',
    cost: 497.00,
    status: 'delivered',
    complexity: 'Medium'
  },
  {
    id: 'AUTO-002',
    name: 'Lead Scoring Engine',
    consultationDate: '2024-01-05',
    deliveryDate: '2024-01-18',
    cost: 897.00,
    status: 'delivered',
    complexity: 'High'
  },
  {
    id: 'AUTO-003',
    name: 'Social Media Analytics',
    consultationDate: '2024-01-22',
    estimatedDelivery: '2024-02-05',
    estimatedCost: 697.00,
    status: 'in_development',
    complexity: 'Medium'
  }
];

const pricingFactors = [
  {
    factor: 'Complexity Level',
    description: 'Simple workflows start at $297, complex AI integrations can reach $2000+',
    icon: Brain
  },
  {
    factor: 'Integration Count',
    description: 'Each additional tool integration adds $50-200 depending on complexity',
    icon: Settings
  },
  {
    factor: 'Custom Logic',
    description: 'Advanced conditional logic and AI features increase development time',
    icon: Zap
  },
  {
    factor: 'Timeline Requirements',
    description: 'Rush delivery (under 1 week) includes 50% expedite fee',
    icon: Clock
  }
];

export function BillingContent() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Billing & Automation Costs</h1>
        <p className="text-muted-foreground">
          Manage your subscription and view automation project costs
        </p>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Subscription */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <span>Current Subscription</span>
                    <Badge className="bg-primary/10 text-primary">Professional</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Next billing date: February 1, 2025 • Includes 5 consultations/month
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$297</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                  Change Plan
                </Button>
                <Button variant="ghost" className="text-red-400 hover:text-red-300">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Usage */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">This Month's Usage</CardTitle>
              <CardDescription className="text-gray-300">
                Your consultation and automation activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center text-gray-300">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                      Consultations Used
                    </span>
                    <span className="font-medium text-white">3 / 5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    2 consultations remaining this month
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center text-gray-300">
                      <Settings className="w-4 h-4 mr-2 text-green-600" />
                      Automations Delivered
                    </span>
                    <span className="font-medium text-white">2 completed</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    1 automation currently in development
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center text-gray-300">
                      <DollarSign className="w-4 h-4 mr-2 text-purple-600" />
                      Automation Costs This Month
                    </span>
                    <span className="font-medium text-white">$1,394</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 delivered automations + 1 in development
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Consultation Available</h4>
                    <p className="text-sm text-blue-700">
                      You have 2 consultations remaining this month. Schedule your next automation project!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method & Recent Automations */}
        <div className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border border-white/20 rounded-xl">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/25</div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Recent Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAutomations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                    <div>
                      <div className="font-medium text-white text-sm">{automation.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {automation.status === 'delivered' 
                          ? `Delivered ${new Date(automation.deliveryDate!).toLocaleDateString()}`
                          : `Est. delivery ${new Date(automation.estimatedDelivery!).toLocaleDateString()}`
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white text-sm">
                        ${automation.status === 'delivered' ? automation.cost : automation.estimatedCost}
                      </div>
                      <Badge 
                        className={
                          automation.status === 'delivered'
                            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30'
                            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30'
                        }
                      >
                        {automation.status === 'delivered' ? 'Delivered' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Model Explanation */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">How Automation Pricing Works</CardTitle>
          <CardDescription className="text-gray-300">
            Every automation is custom-built for your specific needs. Pricing is determined during consultation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Pricing Factors</h3>
              {pricingFactors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <factor.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{factor.factor}</h4>
                    <p className="text-sm text-gray-300">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Typical Price Ranges</h3>
              <div className="space-y-3">
                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">Simple Automation</span>
                    <span className="text-green-400 font-bold">$297 - $597</span>
                  </div>
                  <p className="text-sm text-gray-300">Basic workflows, 1-3 integrations, standard logic</p>
                </div>
                
                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">Advanced Automation</span>
                    <span className="text-blue-400 font-bold">$597 - $1,297</span>
                  </div>
                  <p className="text-sm text-gray-300">Complex workflows, 4-8 integrations, conditional logic</p>
                </div>
                
                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">AI-Powered Automation</span>
                    <span className="text-purple-400 font-bold">$1,297 - $2,997</span>
                  </div>
                  <p className="text-sm text-gray-300">Machine learning, AI analysis, custom algorithms</p>
                </div>
                
                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">Enterprise Solution</span>
                    <span className="text-orange-400 font-bold">$2,997+</span>
                  </div>
                  <p className="text-sm text-gray-300">Custom integrations, enterprise security, SLA</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Subscription Plans</CardTitle>
              <CardDescription className="text-gray-300">
                Choose your consultation tier - automation costs are quoted separately
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className={`relative glass-effect ${
                plan.current ? 'border-primary shadow-lg' : 
                plan.popular ? 'border-primary/50' : 'border-white/20'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-white">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold gradient-text">
                    {typeof plan.price === 'number' ? (
                      <>
                        ${billingPeriod === 'yearly' ? plan.price * 10 : plan.price}
                        <span className="text-base font-normal text-gray-400">
                          /{billingPeriod === 'yearly' ? 'year' : plan.period}
                        </span>
                      </>
                    ) : (
                      plan.price
                    )}
                  </div>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                  <div className="text-sm text-purple-400 font-medium">
                    {plan.automationQuote}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.current ? 'secondary' : 'default'}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 
                     plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold gradient-text mb-4">Ready for Your Next Automation?</h3>
          <p className="text-gray-300 mb-6">
            Schedule a consultation to discuss your automation needs and get a custom quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
              <Phone className="w-4 h-4 mr-2" />
              Contact Sales Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}