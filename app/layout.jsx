'use client';
import './globals.css';
import { AuthProvider } from '../components/auth/AuthProvider';
import { Toaster } from 'react-hot-toast'; // Add this import

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <AuthProvider>
          {children}
          {/* Add Toaster here - it won't affect your existing layout */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}