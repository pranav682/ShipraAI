'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuthModal } from '@/components/auth/auth-modal';
import { 
  Truck, 
  Shield, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Workflow,
  Clock,
  Lock,
  Sparkles,
  Rocket,
  Star,
  Brain,
  Cpu,
  Code,
  Database,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Webhook,
  GitBranch,
  Play,
  Zap,
  DollarSign,
  Target,
  Award,
  Lightbulb,
  HeartHandshake,
  Headphones
} from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    avatar: 'SJ',
    content: 'Shipra AI transformed our customer onboarding. We went from 6 hours of manual work to fully automated in 2 weeks. ROI was 400% in the first month.',
    rating: 5,
    company: 'TechStart Inc.'
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director, ScaleUp Co.',
    avatar: 'MC',
    content: 'The team built us a lead scoring system that increased our conversion rate by 60%. The consultation process was thorough and delivery was on time.',
    rating: 5,
    company: 'ScaleUp Co.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager, GrowthCorp',
    avatar: 'ER',
    content: 'Best investment we made this year. Our email campaigns are now fully automated and performing 3x better than our manual processes.',
    rating: 5,
    company: 'GrowthCorp'
  }
];

const stats = [
  { number: '500+', label: 'Automations Delivered', icon: Rocket },
  { number: '98.5%', label: 'Success Rate', icon: Target },
  { number: '2.3M+', label: 'Hours Saved', icon: Clock },
  { number: '150+', label: 'Happy Customers', icon: Users }
];

export function LandingPage() {
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-slide-in">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-glow">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">Shipra AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors">Pricing</button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setAuthModal('login')}
              className="hover:bg-white/10 hover-scale"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => setAuthModal('signup')}
              className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="animate-slide-up">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 hover-scale">
              <Sparkles className="w-4 h-4 mr-2" />
              🚀 AI-Powered Automation as a Service
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="gradient-text animate-pulse-slow">We Ship</span>
              <br />
              <span className="text-white">You Sell</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Skip the complexity. We design, build, and deliver custom AI workflows for your business.
              <br />
              <span className="gradient-text font-semibold">Request → Consult → Deploy → Scale</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => setAuthModal('signup')}
              >
                Get Started Free
                <Rocket className="ml-3 w-6 h-6" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-purple-400 mr-2" />
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">How We Automate Your Business</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Request Automation",
                description: "Tell us what you want to automate",
                icon: MessageSquare,
                gradient: "from-blue-500 to-purple-600"
              },
              {
                step: "02", 
                title: "We Build It",
                description: "Our team creates your custom automation",
                icon: Settings,
                gradient: "from-purple-500 to-pink-600"
              },
              {
                step: "03",
                title: "You Get Results",
                description: "Access your live automation and view results",
                icon: TrendingUp,
                gradient: "from-green-500 to-blue-600"
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className="glass-effect hover:bg-white/10 hover-scale hover-glow group animate-slide-up border-white/10 text-center relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="text-6xl font-black text-purple-500/30 mb-4">{step.step}</div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white transition-all duration-300 group-hover:gradient-text">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Simple, Transparent Pricing</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: 0,
                description: "Perfect for testing our automation service",
                features: [
                  "1 automation consultation/month",
                  "Basic automation templates",
                  "Email support"
                ],
                popular: false,
                automationQuote: "Starting at $297 per automation"
              },
              {
                name: "Professional",
                price: 297,
                description: "For businesses ready to scale with automation",
                features: [
                  "5 automation consultations/month",
                  "Priority consultation scheduling",
                  "Dedicated automation specialist",
                  "Priority support"
                ],
                popular: true,
                automationQuote: "Custom automations from $497 each"
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations with complex automation needs",
                features: [
                  "Unlimited consultations",
                  "Dedicated automation team",
                  "24/7 priority support"
                ],
                popular: false,
                automationQuote: "Volume pricing available"
              }
            ].map((plan, index) => (
              <Card 
                key={index}
                className={`glass-effect hover-scale relative overflow-hidden group animate-slide-up ${
                  plan.popular ? 'hover-glow border-purple-500/50 scale-105' : 'border-white/10 hover:border-white/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className={plan.popular ? 'pt-12' : ''}>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-black gradient-text">
                    {typeof plan.price === 'number' ? (
                      <>
                        ${plan.price}
                        <span className="text-base font-normal text-gray-400">/month</span>
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
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 btn-glow hover-scale ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                    onClick={() => setAuthModal('signup')}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="glass-effect rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Ready to automate your business?</span>
            </h2>
            <Button 
              size="lg" 
              className="text-xl px-12 py-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setAuthModal('signup')}
            >
              Get Started Free
              <Rocket className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 glass-effect">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold gradient-text text-xl">Shipra AI</span>
          </div>
          <p className="text-center text-gray-400 text-sm">
            © 2025 Shipra AI & Automation LLC. All rights reserved.
          </p>
        </div>
      </footer>

      <AuthModal 
        mode={authModal} 
        onClose={() => setAuthModal(null)} 
      />
    </div>
  );
}

          </div>
        </div>
      </footer>

      <AuthModal 
        mode={authModal} 
        onClose={() => setAuthModal(null)} 
      />
    </div>
  );
}