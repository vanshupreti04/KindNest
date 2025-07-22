'use client';
import { useAuth } from '../../../components/auth/AuthProvider';
import React from 'react';

function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Admin Overview</h2>
          <p className="text-gray-600">Manage your platform settings and users</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Donor Portal</h2>
          <p className="text-gray-600">View and manage your donations</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">NGO Dashboard</h2>
          <p className="text-gray-600">Manage your organization's profile</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">View your recent interactions</p>
        </div>
      </div>
      
      {currentUser && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Account</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {currentUser.email}</p>
            <p><span className="font-medium">Provider:</span> {currentUser.providerData[0]?.providerId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;