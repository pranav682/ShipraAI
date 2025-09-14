'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Book, 
  Video, 
  Search,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Users,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Send,
  Star,
  ThumbsUp,
  Download,
  Eye
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Zap,
    articles: [
      { title: 'How to request your first automation', views: '2.1K', helpful: 95 },
      { title: 'Understanding automation pricing', views: '1.8K', helpful: 92 },
      { title: 'Setting up your workspace', views: '1.5K', helpful: 88 },
      { title: 'Connecting your tools and integrations', views: '1.2K', helpful: 90 }
    ]
  },
  {
    title: 'Automation Management',
    icon: Users,
    articles: [
      { title: 'Viewing automation runs and analytics', views: '3.2K', helpful: 94 },
      { title: 'Exporting automation data', views: '2.8K', helpful: 91 },
      { title: 'Troubleshooting failed runs', views: '2.1K', helpful: 89 },
      { title: 'Requesting automation enhancements', views: '1.7K', helpful: 93 }
    ]
  },
  {
    title: 'Billing & Subscriptions',
    icon: FileText,
    articles: [
      { title: 'Understanding subscription plans', views: '2.5K', helpful: 96 },
      { title: 'How automation costs are calculated', views: '2.2K', helpful: 94 },
      { title: 'Managing payment methods', views: '1.9K', helpful: 92 },
      { title: 'Downloading invoices and receipts', views: '1.4K', helpful: 90 }
    ]
  },
  {
    title: 'API & Integrations',
    icon: Book,
    articles: [
      { title: 'API authentication and setup', views: '1.8K', helpful: 87 },
      { title: 'Webhook configuration guide', views: '1.5K', helpful: 85 },
      { title: 'Available integrations list', views: '2.3K', helpful: 91 },
      { title: 'Custom integration requests', views: '1.1K', helpful: 88 }
    ]
  }
];

const faqItems = [
  {
    question: 'How long does it take to build my automation?',
    answer: 'Most automations are delivered within 1-3 weeks depending on complexity. Simple workflows (1-3 integrations) typically take 1 week, while complex AI-powered automations may take 2-3 weeks. We provide estimated timelines during consultation.'
  },
  {
    question: 'Can I modify my automation after it\'s delivered?',
    answer: 'Yes! You can request enhancements or modifications to your automations at any time. Minor tweaks are often included, while major changes are quoted separately. All automations come with 30 days of free adjustments.'
  },
  {
    question: 'What happens if my automation fails?',
    answer: 'We monitor all automations 24/7. If a failure occurs, you\'ll be notified immediately and our team will investigate. Most issues are resolved within 2 hours. We also provide detailed error logs and automatic retry mechanisms.'
  },
  {
    question: 'How do I export my automation data?',
    answer: 'You can export data from individual runs or all runs combined in CSV or JSON format. Go to your workflow details page and use the export buttons. Data includes execution logs, output metrics, and performance statistics.'
  },
  {
    question: 'Can you integrate with tools not on your list?',
    answer: 'Absolutely! We can integrate with any tool that has an API or webhook capability. Custom integrations may require additional development time and cost, which we\'ll discuss during consultation.'
  },
  {
    question: 'What\'s included in my subscription?',
    answer: 'Your subscription includes consultation calls, automation maintenance, 24/7 monitoring, and access to your dashboard. Automation development is quoted separately based on complexity and requirements.'
  }
];

export function HelpContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    attachments: []
  });

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket:', contactForm);
    toast.success('Support ticket submitted! We\'ll get back to you within 24 hours. 🎫');
    setShowContactModal(false);
    setContactForm({ subject: '', category: '', priority: 'medium', message: '', attachments: [] });
  };

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Help & Support</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Get help with your automations, find answers to common questions, or contact our support team
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            title: 'Contact Support', 
            description: 'Get help from our team', 
            icon: MessageSquare, 
            action: () => setShowContactModal(true),
            gradient: 'from-blue-500 to-purple-600' 
          },
          { 
            title: 'Schedule Call', 
            description: 'Book a consultation', 
            icon: Calendar, 
            action: () => toast.info('Redirecting to calendar...'),
            gradient: 'from-green-500 to-blue-600' 
          },
          { 
            title: 'Video Tutorials', 
            description: 'Watch how-to guides', 
            icon: Video, 
            action: () => toast.info('Opening video library...'),
            gradient: 'from-purple-500 to-pink-600' 
          },
          { 
            title: 'API Docs', 
            description: 'Developer resources', 
            icon: Book, 
            action: () => toast.info('Opening API documentation...'),
            gradient: 'from-orange-500 to-red-600' 
          }
        ].map((item, index) => (
          <Card 
            key={index} 
            className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={item.action}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:scale-110`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2 transition-all duration-300 group-hover:gradient-text">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search help articles, FAQs, and guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Help Categories */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Book className="w-6 h-6 mr-2 text-blue-500" />
                Help Articles
              </CardTitle>
              <CardDescription className="text-gray-300">
                Browse our comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {(searchQuery ? filteredCategories : helpCategories).map((category, index) => (
                  <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    </div>
                    <div className="grid gap-3">
                      {category.articles.map((article, articleIndex) => (
                        <div 
                          key={articleIndex}
                          className="flex items-center justify-between p-4 glass-effect border border-white/10 rounded-xl hover:border-purple-500/30 hover-scale cursor-pointer group"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-white transition-all duration-300 group-hover:gradient-text">
                              {article.title}
                            </h4>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {article.views} views
                              </span>
                              <span className="flex items-center">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {article.helpful}% helpful
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-green-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-gray-300">
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="glass-effect border border-white/10 rounded-xl px-4 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AccordionTrigger className="text-white hover:text-purple-300 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Options */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Contact Support</CardTitle>
              <CardDescription className="text-gray-300">
                Get personalized help from our team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <div className="font-medium text-white">Live Chat</div>
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  Average response time: 2 minutes
                </div>
                <Button 
                  size="sm" 
                  className="w-full btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => toast.info('Opening live chat...')}
                >
                  Start Chat
                </Button>
              </div>

              <div className="p-4 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div className="font-medium text-white">Email Support</div>
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  Average response time: 4 hours
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                  onClick={() => setShowContactModal(true)}
                >
                  Send Email
                </Button>
              </div>

              <div className="p-4 glass-effect border border-white/10 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div className="font-medium text-white">Phone Support</div>
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  Enterprise customers only
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                  onClick={() => toast.info('Scheduling phone call...')}
                >
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Automation Platform</span>
                <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Services</span>
                <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Delivery</span>
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Degraded
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white mt-3"
                onClick={() => toast.info('Opening status page...')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Status Page
              </Button>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                onClick={() => toast.info('Opening video tutorials...')}
              >
                <Video className="w-4 h-4 mr-3" />
                Video Tutorials
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                onClick={() => toast.info('Downloading user guide...')}
              >
                <Download className="w-4 h-4 mr-3" />
                User Guide (PDF)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                onClick={() => toast.info('Opening API documentation...')}
              >
                <Book className="w-4 h-4 mr-3" />
                API Documentation
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                onClick={() => toast.info('Opening community forum...')}
              >
                <Users className="w-4 h-4 mr-3" />
                Community Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="glass-effect border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">Contact Support</DialogTitle>
            <DialogDescription className="text-gray-300">
              Send us a message and we'll get back to you within 24 hours
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitTicket} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Select value={contactForm.category} onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="automation_issue">Automation Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="integration">Integration Help</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority" className="text-gray-300">Priority</Label>
                <Select value={contactForm.priority} onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="text-gray-300">Subject</Label>
              <Input
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-gray-300">Message</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please provide as much detail as possible about your issue or question..."
                rows={6}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                type="submit" 
                className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowContactModal(false)}
                className="border-white/20 hover:bg-white/10 hover-scale"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}