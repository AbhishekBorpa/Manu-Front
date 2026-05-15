import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  FaThLarge, 
  FaUsers, 
  FaBox, 
  FaCog, 
  FaSignOutAlt, 
  FaChartBar, 
  FaHandshake,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const PartnerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/partner/dashboard', icon: FaThLarge },
    { name: 'My Leads', path: '/partner/leads', icon: FaUsers },
    { name: 'Inventory', path: '/partner/inventory', icon: FaBox },
    { name: 'Analytics', path: '/partner/analytics', icon: FaChartBar },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-[1000] p-3 bg-[#14532D] text-white rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[999] w-72 bg-[#0B1C2C] text-white transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="h-full flex flex-col p-6">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <FaHandshake className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tighter">ULTRA CLAP</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Partner Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-900/20' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <item.icon className={`${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold border-2 border-green-500/30">
                UP
              </div>
              <div>
                <p className="text-xs font-bold text-white">Ultra Partner</p>
                <p className="text-[10px] text-slate-500">Pro Manufacturer</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 lg:ml-0 transition-all duration-300 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
};

export default PartnerLayout;
