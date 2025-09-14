'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Settings,
  Trash2,
  Edit,
  Send,
  Copy,
  Eye,
  Download
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { teamMembers, roles, pendingInvitations } from '@/lib/data/team-data';
import { useAuth } from '@/lib/hooks/use-auth';
import { useActivityLogger } from '@/lib/hooks/use-activity-logger';
import { toast } from 'sonner';

export function TeamManagementContent() {
  const { user, hasPermission } = useAuth();
  const { logActivity } = useActivityLogger();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'member',
    message: '',
    department: '',
    jobTitle: ''
  });

  const canManageTeam = hasPermission('team_manage');
  const canInviteMembers = hasPermission('team_invite');
  const canRemoveMembers = hasPermission('team_remove');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role.id === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 'inactive':
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'suspended':
        return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRoleColor = (roleLevel: number) => {
    switch (roleLevel) {
      case 1: // Admin
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
      case 2: // Manager
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30';
      case 3: // Member
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border-green-500/30';
      case 4: // Viewer
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await logActivity(
        'Invited team member',
        'team',
        `Invited ${inviteForm.email} as ${roles.find(r => r.id === inviteForm.role)?.name}`,
        undefined,
        'medium'
      );
      
      toast.success(`Invitation sent to ${inviteForm.email}! 📧`);
      setShowInviteModal(false);
      setInviteForm({ email: '', role: 'member', message: '', department: '', jobTitle: '' });
    } catch (error) {
      toast.error('Failed to send invitation. Please try again.');
    }
  };

  const handleUpdateMemberRole = async (memberId: string, newRoleId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    const newRole = roles.find(r => r.id === newRoleId);
    
    if (!member || !newRole) return;
    
    try {
      await logActivity(
        'Updated member role',
        'team',
        `Changed ${member.firstName} ${member.lastName}'s role to ${newRole.name}`,
        memberId,
        'high'
      );
      
      toast.success(`${member.firstName}'s role updated to ${newRole.name}! ✅`);
    } catch (error) {
      toast.error('Failed to update member role.');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;
    
    try {
      await logActivity(
        'Removed team member',
        'team',
        `Removed ${member.firstName} ${member.lastName} from team`,
        memberId,
        'high'
      );
      
      toast.success(`${member.firstName} has been removed from the team.`);
    } catch (error) {
      toast.error('Failed to remove team member.');
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    const invitation = pendingInvitations.find(i => i.id === invitationId);
    if (!invitation) return;
    
    try {
      await logActivity(
        'Resent invitation',
        'team',
        `Resent invitation to ${invitation.email}`,
        invitationId,
        'low'
      );
      
      toast.success(`Invitation resent to ${invitation.email}! 📧`);
    } catch (error) {
      toast.error('Failed to resend invitation.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Team Management</h1>
          <p className="text-gray-300 text-lg">
            Manage your team members, roles, and permissions
          </p>
        </div>
        {canInviteMembers && (
          <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
            <DialogTrigger asChild>
              <Button className="w-fit btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-effect border-white/20 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="gradient-text text-2xl">Invite Team Member</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Send an invitation to join your team with specific role and permissions
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInviteMember} className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="colleague@company.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-gray-300">Role</Label>
                    <Select value={inviteForm.role} onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-effect border-white/20">
                        {roles.filter(role => role.level >= (user?.role.level || 4)).map(role => (
                          <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department" className="text-gray-300">Department</Label>
                    <Input
                      id="department"
                      value={inviteForm.department}
                      onChange={(e) => setInviteForm(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="e.g., Marketing, Sales, Operations"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle" className="text-gray-300">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={inviteForm.jobTitle}
                      onChange={(e) => setInviteForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                      placeholder="e.g., Marketing Manager, Sales Rep"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">Welcome Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={inviteForm.message}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Welcome to the team! We're excited to have you join us..."
                    rows={3}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button 
                    type="submit" 
                    className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover-scale"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowInviteModal(false)}
                    className="border-white/20 hover:bg-white/10 hover-scale"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Members', value: teamMembers.length.toString(), icon: Users, gradient: 'from-blue-500 to-purple-600' },
          { title: 'Active Members', value: teamMembers.filter(m => m.status === 'active').length.toString(), icon: CheckCircle, gradient: 'from-green-500 to-blue-600' },
          { title: 'Pending Invites', value: pendingInvitations.length.toString(), icon: Clock, gradient: 'from-yellow-500 to-orange-600' },
          { title: 'Admins', value: teamMembers.filter(m => m.role.level === 1).length.toString(), icon: Crown, gradient: 'from-purple-500 to-pink-600' }
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

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 glass-effect">
          <TabsTrigger value="members" className="data-[state=active]:bg-purple-600/20">
            <Users className="w-4 h-4 mr-2" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="invitations" className="data-[state=active]:bg-purple-600/20">
            <Mail className="w-4 h-4 mr-2" />
            Pending Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Filters */}
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-white/20">
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Team Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member, index) => (
              <Card 
                key={member.id}
                className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12 border-2 border-purple-500/50">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                          {member.firstName[0]}{member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-white">
                            {member.firstName} {member.lastName}
                          </h3>
                          {member.role.level === 1 && <Crown className="w-4 h-4 text-yellow-400" />}
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Badge className={getRoleColor(member.role.level)}>
                            {member.role.name}
                          </Badge>
                        </div>
                        <p className="text-gray-300">{member.email}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          {member.department && <span>{member.department}</span>}
                          {member.jobTitle && <span>• {member.jobTitle}</span>}
                          {member.lastLoginAt && (
                            <span>• Last login: {new Date(member.lastLoginAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {canManageTeam && member.id !== user?.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-white/10">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-effect border-white/20" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/20" />
                            <DropdownMenuItem 
                              className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                              onClick={() => setSelectedMember(member)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                              onClick={() => {/* Handle edit */}}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            {canRemoveMembers && (
                              <DropdownMenuItem 
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Member
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <div className="grid gap-4">
            {pendingInvitations.map((invitation, index) => (
              <Card 
                key={invitation.id}
                className="glass-effect border-white/10 hover:border-white/20 hover-scale hover-glow group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{invitation.email}</h3>
                        <Badge className={getRoleColor(invitation.role.level)}>
                          {invitation.role.name}
                        </Badge>
                        <Badge className={getStatusColor(invitation.status)}>
                          {invitation.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        <p>Invited {new Date(invitation.invitedAt).toLocaleDateString()}</p>
                        <p>Expires {new Date(invitation.expiresAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/20 hover:bg-white/10 text-gray-300 hover:text-white hover-scale"
                        onClick={() => handleResendInvitation(invitation.id)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Resend
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => {/* Handle cancel invitation */}}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pendingInvitations.length === 0 && (
            <Card className="glass-effect border-white/10">
              <CardContent className="py-12 text-center">
                <Mail className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No pending invitations</h3>
                <p className="text-gray-300 mb-6">
                  All team invitations have been accepted or expired.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}