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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Shipra AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </button>
              <Button 
                onClick={() => setShowAuthModal('login')}
                variant="outline"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setShowAuthModal('signup')}
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
          <Badge variant="secondary" className="mb-4">
            AI-Powered Automation Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Automate Your Business with{' '}
            <span className="text-blue-600">Intelligent Workflows</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your business operations with AI-driven automation. 
            Streamline processes, reduce costs, and scale efficiently.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => setShowAuthModal('signup')}
          >
            Start Automating Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate, optimize, and scale your operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI-Powered Automation</CardTitle>
                <CardDescription>
                  Intelligent workflows that adapt and optimize automatically
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Role-based access control with comprehensive activity logging
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Real-time insights and performance metrics for your automations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Request Automation</h3>
              <p className="text-gray-600">Describe your process in plain English</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Builds Workflow</h3>
              <p className="text-gray-600">Our AI creates and optimizes your automation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Deploy & Monitor</h3>
              <p className="text-gray-600">Launch your automation and track results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-lg text-gray-600">/month</span></div>
                <CardDescription>Perfect for small teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Up to 10 automations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => setShowAuthModal('signup')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-600 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <div className="text-3xl font-bold">$99<span className="text-lg text-gray-600">/month</span></div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Unlimited automations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => setShowAuthModal('signup')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    SLA guarantee
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-lg font-semibold">Shipra AI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Intelligent automation for modern businesses
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal mode={showAuthModal} onClose={() => setShowAuthModal(null)} />
    </div>
  );
}