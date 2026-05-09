import { Link } from 'react-router';
import { BookOpen, Activity, CheckSquare, Phone, Shield, Heart } from 'lucide-react';

export function HomePage() {
  const pages = [
    {
      path: '/research',
      icon: BookOpen,
      title: 'Research',
      description: 'Learn about blackouts, alcoholism, and harm reduction',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      path: '/baseline',
      icon: Activity,
      title: 'Baseline Assessment',
      description: 'Calculate your blackout risk based on your plan',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      path: '/checklist',
      icon: CheckSquare,
      title: 'Safety Checklist',
      description: 'Complete essential safety steps before going out',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      path: '/support',
      icon: Phone,
      title: 'Support Resources',
      description: 'Access hotlines and support for addiction help',
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 md:py-16">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Shield className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-6xl">SafeNite</h1>
          </div>
          <p className="text-lg md:text-2xl text-blue-50 leading-relaxed md:max-w-3xl">
            Your evidence-based companion for safer drinking decisions and blackout prevention.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="p-6 md:py-12 bg-white border-b border-slate-200">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-start gap-3 mb-4 md:mb-6">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-3xl mb-2 md:mb-4">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed md:text-lg md:max-w-4xl">
                SafeNite combines peer-reviewed research with practical tools to help you make
                informed decisions about alcohol consumption. We focus on{' '}
                <span className="font-semibold">harm reduction</span>, not judgment.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 rounded">
            <p className="text-sm md:text-base text-slate-700">
              <span className="font-semibold">Why it matters:</span> Blackouts are a physiological
              emergency that can lead to serious harm. Understanding your personal risk factors
              empowers you to protect yourself and your friends.
            </p>
          </div>
        </div>
      </div>

      {/* Page Navigation Cards */}
      <div className="flex-1 p-6 md:py-12 space-y-4">
        <div className="md:max-w-7xl md:mx-auto">
          <h2 className="text-lg md:text-2xl mb-2 md:mb-6">Explore SafeNite</h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`block ${page.color} text-white rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg active:shadow-sm transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl md:text-2xl mb-1">{page.title}</h3>
                      <p className="text-sm md:text-base opacity-90">{page.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 md:py-8 bg-slate-100 text-center text-sm md:text-base text-slate-600">
        <p>Built with evidence-based research for harm reduction.</p>
        <p className="mt-1">If you're in crisis, call 988 (Suicide & Crisis Lifeline).</p>
      </div>
    </div>
  );
}
