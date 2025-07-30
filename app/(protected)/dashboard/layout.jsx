'use client';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Logout from '../../../components/auth/Logout';
import Link from 'next/link';

function DashboardLayout({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden"> {/* Prevent scrolling */}
      {/* Sidebar */}
      <aside className="w-48 bg-gray-100 p-4 border-r flex flex-col h-screen sticky top-0"> {/* Fixed height */}
        <h2 className="font-bold mb-4 text-lg">KindNest</h2> {/* Changed title */}
        <nav className="space-y-2 flex-1">
          <Link 
            href="/dashboard/settings" 
            className="block p-2 hover:bg-gray-200 rounded transition-colors"
          >
            Settings
          </Link>
        </nav>
        
        {/* User info and logout at bottom */}
        <div className="mt-auto pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
          <p className="font-medium text-gray-800 truncate" title={currentUser.email}>
            {currentUser.email}
          </p>
          <Logout className="mt-2 w-full text-left p-2 hover:bg-gray-200 rounded transition-colors" />
        </div>
      </aside>
      
      {/* Main content (no-scroll if needed) */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto"> 
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;