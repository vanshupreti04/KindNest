'use client';
import { useAuth } from '../../../components/auth/AuthProvider';
import React from 'react';
import Link from 'next/link';

function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col overflow-hidden">
      
      <div className="flex-1 flex flex-col items-center justify-start pt-20 p-6 bg-gray-50">
      
        <h1 className="text-5xl font-bold text-gray-800 mb-12">Continue As</h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* NGO Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64">
            <div className="flex flex-col items-center justify-center flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">NGO</h2>
              <p className="text-gray-600 text-center mb-6">
                Continue your journey as an NGO partner. Manage your campaigns, track donations, and make an impact.
              </p>
            </div>
            <Link 
              href="/dashboard/register-ngo" 
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors"
            >
              Continue
            </Link>
          </div>

          {/* Donor Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64">
            <div className="flex flex-col items-center justify-center flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Donor</h2>
              <p className="text-gray-600 text-center mb-6">
                Continue your support. Discover NGOs, track your donations, and see the difference you're making.
              </p>
            </div>
            <Link 
              href="/dashboard/register-donor"  
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-center transition-colors"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;