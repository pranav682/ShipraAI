'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Permission } from '@/lib/types/user';
import { useActivityLogger } from './use-activity-logger';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@acme.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.ADMINISTRATOR,
    organizationId: 'org-1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '2',
    email: 'manager@acme.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.MANAGER,
    organizationId: 'org-1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-25T09:00:00Z'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logActivity } = useActivityLogger();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        const updatedUser = { ...foundUser, lastLoginAt: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        logActivity({
          userId: updatedUser.id,
          action: 'login',
          resource: 'authentication',
          details: { email },
          severity: 'medium'
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      logActivity({
        userId: user.id,
        action: 'logout',
        resource: 'authentication',
        details: { email: user.email },
        severity: 'low'
      });
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user || !user.isActive) return false;
    
    const rolePermissions: Record<UserRole, Permission[]> = {
      [UserRole.ADMINISTRATOR]: [
        { resource: '*', actions: ['*'] }
      ],
      [UserRole.MANAGER]: [
        { resource: 'dashboard', actions: ['read'] },
        { resource: 'automation', actions: ['create', 'read', 'update', 'execute'] },
        { resource: 'project', actions: ['create', 'read', 'update'] },
        { resource: 'team', actions: ['read', 'update'] },
        { resource: 'analytics', actions: ['read', 'export'] },
        { resource: 'billing', actions: ['read'] }
      ],
      [UserRole.TEAM_MEMBER]: [
        { resource: 'dashboard', actions: ['read'] },
        { resource: 'automation', actions: ['create', 'read'] },
        { resource: 'project', actions: ['create', 'read'] },
        { resource: 'analytics', actions: ['read'] }
      ],
      [UserRole.VIEWER]: [
        { resource: 'dashboard', actions: ['read'] },
        { resource: 'automation', actions: ['read'] },
        { resource: 'project', actions: ['read'] },
        { resource: 'analytics', actions: ['read'] }
      ]
    };

    const permissions = rolePermissions[user.role] || [];
    
    return permissions.some(permission => {
      const resourceMatch = permission.resource === '*' || permission.resource === resource;
      const actionMatch = permission.actions.includes('*') || permission.actions.includes(action);
      return resourceMatch && actionMatch;
    });
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    isLoading
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}