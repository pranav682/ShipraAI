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

const integrationTools = [
  { name: 'n8n', icon: Workflow, color: 'from-red-500 to-pink-500', position: { top: '15%', left: '10%' } },
  { name: 'Apify', icon: Database, color: 'from-blue-500 to-purple-500', position: { top: '25%', right: '15%' } },
  { name: 'Zapier', icon: Truck, color: 'from-orange-500 to-yellow-500', position: { top: '45%', left: '8%' } },
  { name: 'Make', icon: Settings, color: 'from-purple-500 to-indigo-500', position: { top: '60%', right: '12%' } },
  { name: 'Webhook', icon: Webhook, color: 'from-green-500 to-teal-500', position: { top: '75%', left: '15%' } },
  { name: 'API', icon: Code, color: 'from-cyan-500 to-blue-500', position: { top: '35%', right: '8%' } },
  { name: 'AI', icon: Brain, color: 'from-pink-500 to-purple-500', position: { top: '55%', left: '20%' } },
  { name: 'Analytics', icon: BarChart3, color: 'from-indigo-500 to-purple-500', position: { top: '20%', left: '25%' } }
];

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    // In a real app, this would open a video modal or redirect to a demo page
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleContactSales = () => {
    // In a real app, this would open a contact form or redirect to a contact page
    window.open('mailto:sales@shipra.ai?subject=Sales Inquiry', '_blank');
  };

  const handleSocialLink = (platform: string) => {
    const urls = {
      twitter: 'https://twitter.com/shipraai',
      linkedin: 'https://linkedin.com/company/shipraai',
      github: 'https://github.com/shipraai'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Integration Tools Background - Safely positioned behind all content */}
      <div className="integration-bg">
        {integrationTools.map((tool, index) => (
          <div key={tool.name}>
            <div
              className="integration-node"
              style={{
                ...tool.position,
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            {index < integrationTools.length - 1 && (
              <div
                className="integration-line"
                style={{
                  top: `${parseInt(tool.position.top || '0')}%`,
                  left: tool.position.left ? `${parseInt(tool.position.left)}%` : 'auto',
                  right: tool.position.right ? `${parseInt(tool.position.right)}%` : 'auto',
                  width: '120px',
                  animationDelay: `${index * 0.8}s`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Animated background particles - Safely positioned behind all content */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower gradient - Safely positioned behind all content */}
      <div
        className="fixed pointer-events-none z-0 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
      />

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
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
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
                className="text-xl px-12 py-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale hover-glow"
                onClick={() => setAuthModal('signup')}
              >
                Request Your First Automation
                <Rocket className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-6 border-purple-500/50 hover:bg-purple-500/10 hover-scale"
                onClick={handleWatchDemo}
              >
                <Play className="mr-3 w-6 h-6" />
                Watch Demo
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
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">How We Automate Your Business</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Our expert team handles everything from consultation to deployment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Request Automation",
                description: "Tell us what you want to automate through our simple request form",
                icon: MessageSquare,
                gradient: "from-blue-500 to-purple-600"
              },
              {
                step: "02", 
                title: "Expert Consultation",
                description: "Our automation specialists analyze your needs and design the perfect solution",
                icon: Users,
                gradient: "from-purple-500 to-pink-600"
              },
              {
                step: "03",
                title: "We Build It",
                description: "Our team creates your custom automation using the latest AI and integration tools",
                icon: Settings,
                gradient: "from-pink-500 to-red-600"
              },
              {
                step: "04",
                title: "You Get Results",
                description: "Access your live automation, view analytics, and download results from your dashboard",
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

      {/* Features Grid */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">What You Get</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Professional automation solutions delivered to your dashboard
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Workflows",
                description: "Custom automations built with the latest AI technology and machine learning capabilities.",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and SOC 2 compliance. Your data stays protected at all times.",
                gradient: "from-green-500 to-blue-600"
              },
              {
                icon: Globe,
                title: "500+ Tool Integrations",
                description: "We connect any tool with an API - Slack, Gmail, Salesforce, CRMs, databases, and more.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Live dashboards showing your automation performance, data generated, and ROI metrics.",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: Clock,
                title: "24/7 Monitoring",
                description: "Your automations run continuously with instant alerts and automatic error handling.",
                gradient: "from-pink-500 to-purple-600"
              },
              {
                icon: TrendingUp,
                title: "Scalable Results",
                description: "Start small and scale up. Our automations grow with your business needs.",
                gradient: "from-indigo-500 to-blue-600"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="glass-effect hover:bg-white/10 hover-scale hover-glow group animate-slide-up border-white/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white transition-all duration-300 group-hover:gradient-text">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">What Our Customers Say</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Real results from real businesses using our automation solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-white/10 hover-glow animate-slide-up">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-purple-400 text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Simple, Transparent Pricing</span>
            </h2>
            <p className="text-gray-300 text-xl">
              Pay for results, not complexity
            </p>
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
                  "Email support",
                  "Dashboard access",
                  "Basic analytics"
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
                  "Advanced automation templates",
                  "Dedicated automation specialist",
                  "Advanced analytics & reporting",
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
                  "24/7 priority support",
                  "Custom integrations",
                  "SLA guarantees",
                  "On-site consultation available"
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
                    onClick={() => plan.name === 'Enterprise' ? handleContactSales() : setAuthModal('signup')}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-gray-300 text-xl">
              Everything you need to know about our automation service
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to build my automation?",
                answer: "Most automations are delivered within 1-3 weeks depending on complexity. Simple workflows (1-3 integrations) typically take 1 week, while complex AI-powered automations may take 2-3 weeks. We provide estimated timelines during consultation."
              },
              {
                question: "What if my automation doesn't work as expected?",
                answer: "All automations come with 30 days of free adjustments and lifetime support. We monitor all automations 24/7 and provide immediate fixes for any issues. Our success rate is 98.5%."
              },
              {
                question: "Can you integrate with tools not on your list?",
                answer: "Yes! We can integrate with any tool that has an API or webhook capability. Custom integrations may require additional development time, which we'll discuss during consultation."
              },
              {
                question: "How much do automations cost?",
                answer: "Automation costs vary based on complexity, integrations, and requirements. Simple automations start at $297, while complex AI-powered solutions can range from $1,000-$3,000+. We provide detailed quotes after consultation."
              },
              {
                question: "Do I need technical knowledge to use your service?",
                answer: "Not at all! We handle all the technical work. You just need to describe what you want to automate, and we'll build it for you. Our dashboard is designed for non-technical users."
              },
              {
                question: "What happens to my data?",
                answer: "Your data is encrypted and secure. We're SOC 2 compliant and follow enterprise-grade security practices. We only access data necessary for automation functionality and never share it with third parties."
              }
            ].map((faq, index) => (
              <Card 
                key={index}
                className="glass-effect border-white/10 hover:border-purple-500/30 hover-scale animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="glass-effect rounded-3xl p-12 hover-glow animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Ready to automate your business?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of businesses already scaling with our custom automation solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-xl px-12 py-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale hover-glow"
                onClick={() => setAuthModal('signup')}
              >
                Request Your First Automation
                <Rocket className="ml-3 w-6 h-6" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="text-xl px-12 py-6 border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                onClick={handleContactSales}
              >
                <Headphones className="mr-3 w-6 h-6" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 glass-effect">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold gradient-text">Shipra AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We ship custom automation solutions so you can focus on selling and growing your business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><button onClick={handleContactSales} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Shipra AI & Automation LLC. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
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