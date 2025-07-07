export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Simple sidebar without component */}
      <aside className="w-48 bg-gray-100 p-4 border-r">
        <h2 className="font-bold mb-4">Dashboards</h2>
        <nav className="space-y-2">
          <a href="/dashboard/admin" className="block p-2 hover:bg-gray-200 rounded">Admin</a>
          <a href="/dashboard/donor" className="block p-2 hover:bg-gray-200 rounded">Donor</a>
          <a href="/dashboard/ngo" className="block p-2 hover:bg-gray-200 rounded">NGO</a>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}