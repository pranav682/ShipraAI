import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Truck } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-300 text-lg">Loading your automation dashboard...</p>
      </div>
    </div>
  );
}