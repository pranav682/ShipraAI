'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Mail, 
  Phone, 
  Building, 
  Globe,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Zap,
  Lock,
  Smartphone,
  Download,
  Upload,
  AlertTriangle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';

export function SettingsContent() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    automationUpdates: true,
    billingAlerts: true,
    securityAlerts: true
  });
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    role: 'CEO',
    timezone: 'America/New_York',
    language: 'en'
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully! 🎉');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved! 🔔');
  };

  const handleGenerateApiKey = () => {
    toast.success('New API key generated! 🔑');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-gray-300 text-lg">
          Manage your account, preferences, and automation settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-effect">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600/20">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600/20">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-600/20">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-purple-600/20">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-purple-600/20">
            <Key className="w-4 h-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-500" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-300">
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 border-4 border-purple-500/50">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company" className="text-gray-300">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-gray-300">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language" className="text-gray-300">Language</Label>
                  <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-white/20">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile}
                className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Bell className="w-6 h-6 mr-2 text-yellow-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-gray-300">
                Choose how you want to be notified about automation updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium text-white">Email Notifications</div>
                      <div className="text-sm text-gray-400">Receive updates via email</div>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium text-white">Push Notifications</div>
                      <div className="text-sm text-gray-400">Browser and mobile push notifications</div>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium text-white">SMS Notifications</div>
                      <div className="text-sm text-gray-400">Text messages for critical updates</div>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Notification Types</h4>
                  
                  <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="font-medium text-white">Automation Updates</div>
                        <div className="text-sm text-gray-400">When automations complete or fail</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.automationUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, automationUpdates: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-pink-400" />
                      <div>
                        <div className="font-medium text-white">Billing Alerts</div>
                        <div className="text-sm text-gray-400">Payment and subscription updates</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.billingAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, billingAlerts: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="font-medium text-white">Security Alerts</div>
                        <div className="text-sm text-gray-400">Login attempts and security events</div>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, securityAlerts: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSaveNotifications}
                className="btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-500" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-white">Password</div>
                      <div className="text-sm text-gray-400">Last changed 30 days ago</div>
                    </div>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-white">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-400">Add an extra layer of security</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                      Not Enabled
                    </Badge>
                  </div>
                  <Button className="btn-glow bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Lock className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>

                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-white">Active Sessions</div>
                      <div className="text-sm text-gray-400">Manage your active login sessions</div>
                    </div>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                      View Sessions
                    </Button>
                  </div>
                </div>

                <div className="p-4 glass-effect border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-white">Login History</div>
                      <div className="text-sm text-gray-400">Review recent login activity</div>
                    </div>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-purple-500" />
                Billing & Subscription
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">Professional Plan</div>
                    <div className="text-sm text-gray-400">$297/month • Next billing: Feb 1, 2025</div>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                    Change Plan
                  </Button>
                  <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    Cancel Subscription
                  </Button>
                </div>
              </div>

              <div className="p-6 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">Payment Method</div>
                    <div className="text-sm text-gray-400">•••• •••• •••• 4242 • Expires 12/25</div>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-400" />
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                  Update Payment Method
                </Button>
              </div>

              <div className="p-6 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">Billing History</div>
                    <div className="text-sm text-gray-400">Download invoices and view payment history</div>
                  </div>
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  View Invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Key className="w-6 h-6 mr-2 text-orange-500" />
                API Access
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage API keys and webhook endpoints for integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">API Key</div>
                    <div className="text-sm text-gray-400">Use this key to access the Shipra AI API</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value="sk_live_1234567890abcdef1234567890abcdef"
                    readOnly
                    className="bg-white/5 border-white/20 text-white font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleGenerateApiKey}
                    className="btn-glow bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Key
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </div>

              <div className="p-6 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-lg font-semibold text-white">API Usage</div>
                    <div className="text-sm text-gray-400">Monitor your API usage and limits</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                    <div className="text-lg font-bold text-blue-400">1,247</div>
                    <div className="text-xs text-gray-400">Requests Today</div>
                  </div>
                  <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                    <div className="text-lg font-bold text-green-400">10,000</div>
                    <div className="text-xs text-gray-400">Monthly Limit</div>
                  </div>
                  <div className="text-center p-3 glass-effect border border-white/10 rounded-xl">
                    <div className="text-lg font-bold text-purple-400">12.5%</div>
                    <div className="text-xs text-gray-400">Usage This Month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}