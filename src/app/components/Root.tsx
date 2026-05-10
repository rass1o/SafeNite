import { Outlet, Link, useLocation } from 'react-router';
import { Home, BookOpen, Activity, Phone, Shield, Droplets } from 'lucide-react';

export function Root() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/research', icon: BookOpen, label: 'Research' },
    { path: '/baseline', icon: Activity, label: 'Baseline' },
    { path: '/tracker', icon: Droplets, label: 'Tracker' },
    { path: '/support', icon: Phone, label: 'Support' },
  ];

  return (
    <div className="size-full bg-slate-50">
      {/* Desktop: Top Navigation */}
      <nav className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src="/safenite-logo.png" alt="SafeNite" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-semibold">SafeNite</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="flex gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile: Container with max-width */}
      <div className="md:hidden size-full flex items-center justify-center">
        <div className="w-full max-w-[480px] min-h-screen bg-white shadow-lg flex flex-col">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>

          {/* Mobile: Bottom Navigation */}
          <nav className="border-t border-slate-200 bg-white">
            <div className="flex justify-around">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop: Full-width content */}
      <div className="hidden md:block">
        <Outlet />
      </div>
    </div>
  );
}
