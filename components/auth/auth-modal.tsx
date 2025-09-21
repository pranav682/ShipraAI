'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Mail, Lock, User, Eye, EyeOff, Chrome, Linkedin, ArrowLeft, Sparkles, Rocket, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/lib/utils/validation';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface AuthModalProps {
  mode: 'login' | 'signup' | null;
  onClose: () => void;
}

export function AuthModal({ mode, onClose }: AuthModalProps) {
  const [step, setStep] = useState<'auth' | 'verify' | 'onboarding'>('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: ''
  });
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (mode === 'signup') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'signup') {
        setStep('verify');
        toast.success('Verification email sent! Check your inbox. 📧');
      } else {
        // Simulate successful login
        toast.success('Welcome back! Let\'s get this bread 🚀');
        onClose();
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Signed in with ${provider === 'google' ? 'Google' : 'LinkedIn'}! You\'re in 🎉`);
      onClose();
      router.push('/dashboard');
    } catch (error) {
      toast.error('Social authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('onboarding');
      toast.success('Email verified! You\'re almost there ✨');
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Welcome to Shipra AI! Your workspace is ready to slay 💜');
      onClose();
      router.push('/dashboard');
    } catch (error) {
      toast.error('Setup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!mode) return null;

  return (
    <Dialog open={!!mode} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 glass-effect border-white/20 animate-scale-in">
        {step === 'auth' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-glow animate-pulse-slow">
                  <Truck className="w-7 h-7 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold">
                {mode === 'login' ? (
                  <span className="gradient-text">Welcome back, legend</span>
                ) : (
                  <span className="gradient-text">Join the automation revolution</span>
                )}
              </DialogTitle>
              <p className="text-center text-gray-300">
                {mode === 'login' 
                  ? 'Sign in to your Shipra AI workspace and continue building'
                  : 'Start automating your workflows today - it\'s about to be iconic'
                }
              </p>
            </DialogHeader>

            <div className="p-6 pt-2">
              <div className="space-y-3 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full h-12 btn-glow border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-3" /> : <Chrome className="w-5 h-5 mr-3" />}
                  Continue with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 btn-glow border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleSocialAuth('linkedin')}
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-3" /> : <Linkedin className="w-5 h-5 mr-3" />}
                  Continue with LinkedIn
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="bg-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors ${
                          errors.firstName ? 'border-red-500' : ''
                        }`}
                        required
                        disabled={isLoading}
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors ${
                          errors.lastName ? 'border-red-500' : ''
                        }`}
                        required
                        disabled={isLoading}
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    required
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors pr-10 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Please wait...
                    </div>
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <Sparkles className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-4">
                {mode === 'login' ? (
                  <>Don't have an account? <button className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">Sign up</button></>
                ) : (
                  <>Already have an account? <button className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">Sign in</button></>
                )}
              </p>
            </div>
          </>
        )}

        {step === 'verify' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm neon-glow">
                  <Mail className="w-10 h-10 text-green-400" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold gradient-text">Check your email</DialogTitle>
              <p className="text-center text-gray-300">
                We've sent a verification link to<br />
                <strong className="text-purple-400">{formData.email}</strong>
              </p>
            </DialogHeader>

            <div className="p-6 pt-2 space-y-4">
              <Button 
                onClick={handleVerification} 
                className="w-full btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    I've verified my email
                    <Star className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 transition-colors" disabled={isLoading}>
                Resend verification email
              </Button>

              <Button 
                variant="ghost" 
                className="w-full hover:bg-white/5 transition-colors"
                onClick={() => setStep('auth')}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign up
              </Button>
            </div>
          </>
        )}

        {step === 'onboarding' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-glow">
                  <User className="w-7 h-7 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold gradient-text">Welcome to Shipra AI!</DialogTitle>
              <p className="text-center text-gray-300">
                Let's set up your workspace and get you started
              </p>
            </DialogHeader>

            <div className="p-6 pt-2">
              <form onSubmit={handleOnboarding} className="space-y-4">
                <div>
                  <Label htmlFor="company" className="text-gray-300">Company name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Acme Inc."
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300">What's your vibe? (Pick your main use case)</Label>
                  <div className="grid gap-3">
                    <Card className="cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 glass-effect border-white/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Marketing Automation</div>
                            <div className="text-sm text-gray-400">Email campaigns, lead nurturing</div>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                            <Rocket className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 glass-effect border-white/20">
                      <CardContent className="p-4">
                        <div>
                          <div className="font-medium text-white">Sales Operations</div>
                          <div className="text-sm text-gray-400">CRM sync, deal tracking</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 glass-effect border-white/20">
                      <CardContent className="p-4">
                        <div>
                          <div className="font-medium text-white">Data Processing</div>
                          <div className="text-sm text-gray-400">ETL, reporting, analytics</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Setting up workspace...
                    </div>
                  ) : (
                    <>
                      Complete Setup
                      <Rocket className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}