'use client';
import Login from '../../../components/auth/Login';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LoginPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [currentUser, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Login />
    </main>
  );
}

export default LoginPage;