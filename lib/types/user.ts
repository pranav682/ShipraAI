export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  createdAt: string;
  lastLoginAt?: string;
  invitedBy?: string;
  department?: string;
  jobTitle?: string;
}

export interface UserRole {
  id: string;
  name: string;
  level: number; // 1 = Admin, 2 = Manager, 3 = Member, 4 = Viewer
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string; // create, read, update, delete, execute
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  metadata?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: UserRole;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  message?: string;
}