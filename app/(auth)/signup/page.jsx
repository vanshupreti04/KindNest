'use client';
import Signup from '../../../components/auth/Signup';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SignupPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [currentUser, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Signup />
    </main>
  );
}

export default SignupPage;