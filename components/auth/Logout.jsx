'use client';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Logout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      // Force full page reload to clear all state and ensure fresh load of home page
      window.location.href = '/'; // This will do a complete refresh to root
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-3 py-1 rounded transition ${
        isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600 text-white'
      }`}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default Logout;