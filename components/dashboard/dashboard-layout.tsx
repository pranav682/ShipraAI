'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Workflow, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Truck,
  HelpCircle,
  LogOut,
  User,
  Sparkles,
  MessageSquare,
  FileText,
  BarChart3,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageSquare, label: 'Automation Requests', href: '/automation-requests' },
  { icon: FolderOpen, label: 'Projects', href: '/projects' },
  { icon: Workflow, label: 'Automation Gallery', href: '/workflows' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Shield, label: 'Audit Logs', href: '/audit' },
  { icon: CreditCard, label: 'Billing', href: '/billing' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleNotificationClick = () => {
    // Handle notification click
    console.log('Notifications clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 glass-effect border-r border-white/10 transform transition-all duration-300 ease-in-out z-50",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center space-x-3 animate-slide-in">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-glow">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold gradient-text">Shipra AI</div>
                <div className="text-xs text-gray-400">Automation Platform</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.label} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-12 hover-scale animate-slide-in",
                        isActive 
                          ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 neon-glow" 
                          : "hover:bg-white/10 text-gray-300 hover:text-white"
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <Link href="/help">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-12 text-gray-300 hover:text-white hover:bg-white/10 hover-scale"
                  onClick={() => setSidebarOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Help & Support
                </Button>
              </Link>
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 rounded-2xl glass-effect">
              <Avatar className="w-10 h-10 border-2 border-purple-500/50">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">John Doe</div>
                <div className="text-xs text-gray-400 truncate">john@acme.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="glass-effect border-b border-white/10 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10 hover-scale"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search automations, projects..." 
                className="pl-10 w-64 hidden sm:block bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <Badge className="hidden sm:flex bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Professional Plan
            </Badge>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-gray-300 hover:text-white hover:bg-white/10 hover-scale"
              onClick={handleNotificationClick}
            >
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10 hover-scale">
                  <Avatar className="h-10 w-10 border-2 border-purple-500/50">
                    <AvatarImage src="/avatar.jpg" alt="@johndoe" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-effect border-white/20" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">John Doe</p>
                    <p className="text-xs leading-none text-gray-400">john@acme.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/20" />
                <Link href="/profile">
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/billing">
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem 
                  className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <div className="animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}