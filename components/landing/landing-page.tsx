'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CircleCheck as CheckCircle, Zap, Users, ChartBar as BarChart3, Shield } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Header */}
      <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Shipra AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <Button 
                onClick={() => setShowAuthModal('login')}
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setShowAuthModal('signup')}
                className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="sm"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
            AI-Powered Automation Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Automate Your Business with{' '}
            <span className="gradient-text">Intelligent Workflows</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your business operations with AI-driven automation. 
            Streamline processes, reduce costs, and scale efficiently.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
            onClick={() => setShowAuthModal('signup')}
          >
            Start Automating Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to automate, optimize, and scale your operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">AI-Powered Automation</CardTitle>
                <CardDescription className="text-gray-300">
                  Intelligent workflows that adapt and optimize automatically
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Team Collaboration</CardTitle>
                <CardDescription className="text-gray-300">
                  Role-based access control with comprehensive activity logging
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Advanced Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time insights and performance metrics for your automations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple 3-Step Process
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 neon-glow">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Request Automation</h3>
              <p className="text-gray-300">Describe your process in plain English</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 neon-glow">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Builds Workflow</h3>
              <p className="text-gray-300">Our AI creates and optimizes your automation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 neon-glow">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Deploy & Monitor</h3>
              <p className="text-gray-300">Launch your automation and track results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="glass-effect border-white/10 hover:border-white/20 hover-scale">
              <CardHeader>
                <CardTitle className="text-white">Starter</CardTitle>
                <div className="text-3xl font-bold text-white">$29<span className="text-lg text-gray-400">/month</span></div>
                <CardDescription className="text-gray-300">Perfect for small teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Up to 10 automations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => setShowAuthModal('signup')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-purple-500/50 hover:border-purple-500 hover-scale relative neon-glow">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-white">Professional</CardTitle>
                <div className="text-3xl font-bold text-white">$99<span className="text-lg text-gray-400">/month</span></div>
                <CardDescription className="text-gray-300">For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Unlimited automations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => setShowAuthModal('signup')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-white/10 hover:border-white/20 hover-scale">
              <CardHeader>
                <CardTitle className="text-white">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-white">Custom</div>
                <CardDescription className="text-gray-300">For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-300">SLA guarantee</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold gradient-text">Shipra AI</span>
          </div>
          <p className="text-gray-300 mb-4">
            Intelligent automation for modern businesses
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-300">
            <button className="hover:text-purple-300 transition-colors">Privacy Policy</button>
            <button className="hover:text-purple-300 transition-colors">Terms of Service</button>
            <button className="hover:text-purple-300 transition-colors">Contact</button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal mode={showAuthModal} onClose={() => setShowAuthModal(null)} />
    </div>
  );
}