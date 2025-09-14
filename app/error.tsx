'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-4">
      <Card className="glass-effect border-white/10 max-w-md w-full text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white mb-2">Something went wrong</CardTitle>
          <CardDescription className="text-gray-300">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => reset()}
              className="flex-1 btn-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left mt-4">
              <summary className="text-sm text-gray-400 cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-xs text-red-300 bg-red-500/10 p-2 rounded overflow-auto">
                {error.message}
                {error.stack && '\n' + error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}