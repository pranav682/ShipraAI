import { User, UserRole, Permission, ActivityLog, TeamInvitation } from '@/lib/types/user';

// Default permissions
export const permissions: Permission[] = [
  // Dashboard permissions
  { id: 'dashboard_view', name: 'View Dashboard', resource: 'dashboard', action: 'read' },
  
  // Automation permissions
  { id: 'automation_view', name: 'View Automations', resource: 'automation', action: 'read' },
  { id: 'automation_create', name: 'Request Automations', resource: 'automation', action: 'create' },
  { id: 'automation_execute', name: 'Execute Automations', resource: 'automation', action: 'execute' },
  { id: 'automation_delete', name: 'Delete Automations', resource: 'automation', action: 'delete' },
  
  // Project permissions
  { id: 'project_view', name: 'View Projects', resource: 'project', action: 'read' },
  { id: 'project_create', name: 'Create Projects', resource: 'project', action: 'create' },
  { id: 'project_update', name: 'Update Projects', resource: 'project', action: 'update' },
  { id: 'project_delete', name: 'Delete Projects', resource: 'project', action: 'delete' },
  
  // Analytics permissions
  { id: 'analytics_view', name: 'View Analytics', resource: 'analytics', action: 'read' },
  { id: 'analytics_export', name: 'Export Analytics', resource: 'analytics', action: 'export' },
  
  // Billing permissions
  { id: 'billing_view', name: 'View Billing', resource: 'billing', action: 'read' },
  { id: 'billing_manage', name: 'Manage Billing', resource: 'billing', action: 'update' },
  
  // Team permissions
  { id: 'team_view', name: 'View Team', resource: 'team', action: 'read' },
  { id: 'team_invite', name: 'Invite Members', resource: 'team', action: 'create' },
  { id: 'team_manage', name: 'Manage Members', resource: 'team', action: 'update' },
  { id: 'team_remove', name: 'Remove Members', resource: 'team', action: 'delete' },
  
  // Settings permissions
  { id: 'settings_view', name: 'View Settings', resource: 'settings', action: 'read' },
  { id: 'settings_update', name: 'Update Settings', resource: 'settings', action: 'update' },
  
  // Audit permissions
  { id: 'audit_view', name: 'View Audit Logs', resource: 'audit', action: 'read' },
  { id: 'audit_export', name: 'Export Audit Logs', resource: 'audit', action: 'export' },
];

// Default roles
export const roles: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrator',
    level: 1,
    permissions: permissions // Admin has all permissions
  },
  {
    id: 'manager',
    name: 'Manager',
    level: 2,
    permissions: permissions.filter(p => 
      !['billing_manage', 'team_remove', 'settings_update'].includes(p.id)
    )
  },
  {
    id: 'member',
    name: 'Team Member',
    level: 3,
    permissions: permissions.filter(p => 
      ['dashboard_view', 'automation_view', 'automation_create', 'automation_execute', 
       'project_view', 'project_create', 'analytics_view', 'settings_view'].includes(p.id)
    )
  },
  {
    id: 'viewer',
    name: 'Viewer',
    level: 4,
    permissions: permissions.filter(p => 
      ['dashboard_view', 'automation_view', 'project_view', 'analytics_view'].includes(p.id)
    )
  }
];

// Sample team members
export const teamMembers: User[] = [
  {
    id: '1',
    email: 'john.doe@acme.com',
    firstName: 'John',
    lastName: 'Doe',
    role: roles[0], // Admin
    status: 'active',
    permissions: roles[0].permissions,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-25T10:30:00Z',
    department: 'Operations',
    jobTitle: 'CEO'
  },
  {
    id: '2',
    email: 'sarah.johnson@acme.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: roles[1], // Manager
    status: 'active',
    permissions: roles[1].permissions,
    createdAt: '2024-01-05T00:00:00Z',
    lastLoginAt: '2024-01-25T09:15:00Z',
    invitedBy: '1',
    department: 'Marketing',
    jobTitle: 'Marketing Manager'
  },
  {
    id: '3',
    email: 'mike.wilson@acme.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: roles[2], // Member
    status: 'active',
    permissions: roles[2].permissions,
    createdAt: '2024-01-10T00:00:00Z',
    lastLoginAt: '2024-01-24T16:45:00Z',
    invitedBy: '1',
    department: 'Sales',
    jobTitle: 'Sales Representative'
  },
  {
    id: '4',
    email: 'emily.davis@acme.com',
    firstName: 'Emily',
    lastName: 'Davis',
    role: roles[3], // Viewer
    status: 'pending',
    permissions: roles[3].permissions,
    createdAt: '2024-01-20T00:00:00Z',
    invitedBy: '2',
    department: 'Finance',
    jobTitle: 'Financial Analyst'
  }
];

// Sample activity logs
export const activityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john.doe@acme.com',
    action: 'Created automation request',
    resource: 'automation',
    resourceId: 'auto-001',
    details: 'Created "Customer Onboarding Flow" automation request',
    timestamp: '2024-01-25T10:30:00Z',
    severity: 'medium'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@acme.com',
    action: 'Exported analytics data',
    resource: 'analytics',
    details: 'Exported monthly performance report',
    timestamp: '2024-01-25T09:15:00Z',
    severity: 'low'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john.doe@acme.com',
    action: 'Invited team member',
    resource: 'team',
    resourceId: '4',
    details: 'Invited emily.davis@acme.com as Viewer',
    timestamp: '2024-01-20T14:20:00Z',
    severity: 'medium'
  },
  {
    id: '4',
    userId: '3',
    userName: 'Mike Wilson',
    userEmail: 'mike.wilson@acme.com',
    action: 'Viewed automation details',
    resource: 'automation',
    resourceId: 'auto-001',
    details: 'Viewed "Customer Onboarding Flow" automation details',
    timestamp: '2024-01-24T16:45:00Z',
    severity: 'low'
  },
  {
    id: '5',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john.doe@acme.com',
    action: 'Updated billing settings',
    resource: 'billing',
    details: 'Updated payment method',
    timestamp: '2024-01-23T11:30:00Z',
    severity: 'high'
  }
];

// Sample pending invitations
export const pendingInvitations: TeamInvitation[] = [
  {
    id: '1',
    email: 'alex.brown@acme.com',
    role: roles[2], // Member
    invitedBy: '1',
    invitedAt: '2024-01-24T10:00:00Z',
    expiresAt: '2024-01-31T10:00:00Z',
    status: 'pending',
    message: 'Welcome to the team! You\'ll be working on automation projects.'
  }
];