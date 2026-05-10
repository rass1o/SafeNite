import { Link } from 'react-router';
import { Shield, BookOpen, Activity, Phone, ArrowRight, CheckSquare, Users, Award, Heart } from 'lucide-react';
 
export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
 
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-blue-300" />
                <span className="text-blue-300 text-lg font-semibold tracking-wide uppercase">SafeNite</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Drink smarter.<br />
                <span className="text-blue-300">Stay safer.</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Your evidence-based companion for safer drinking decisions and blackout prevention. Built on peer-reviewed research, not judgment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/baseline"
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors flex items-center gap-2 justify-center">
                  Start Risk Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/research"
                  className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors text-center">
                  Learn More
                </Link>
              </div>
            </div>
            {/* Stats */}
            <div className="hidden md:grid grid-cols-2 gap-4 mt-12 md:mt-0">
              {[
                { value: '1 in 6', label: 'college students experience blackouts annually' },
                { value: '51%', label: 'of blackout episodes involve rapid consumption' },
                { value: '3x', label: 'higher injury risk during blackout episodes' },
                { value: '26.7%', label: 'of young adults reported binge drinking just in the past month' },
              ].map((stat) => (
                <div key={stat.value} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-200 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* Mission Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-80 md:h-96 flex items-center justify-center mb-10 md:mb-0 border border-blue-200">
              <div className="text-center text-blue-400">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium opacity-70">[ Mission Image ]</p>
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-6">
                Harm reduction, not judgment
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                SafeNite combines peer-reviewed research with practical tools to help you make informed decisions about alcohol consumption. We believe awareness saves lives.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl">
                <p className="text-blue-900 font-medium leading-relaxed">
                  <strong>Why it matters:</strong> Blackouts are a physiological emergency that can lead to serious harm. Understanding your personal risk factors empowers you to protect yourself and your friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3">Two steps to a safer night</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              SafeNite guides you through a safety checklist and personalized risk assessment before you go out.
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-10">
            {/* Step 1 */}
            <div className="relative bg-green-50 rounded-2xl p-8 border border-green-200 mb-6 md:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">1</div>
                <CheckSquare className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Safety Checklist</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Before going out, run through our 4-point safety checklist covering transportation, your itinerary, who you're with, and whether you've eaten. Each answer gives you evidence-based guidance tailored to your situation.
              </p>
              <ul className="space-y-2">
                {['Safe ride home planned', 'Itinerary shared with someone trusted', 'Going with people you trust', 'Ate a meal before drinking'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Step 2 */}
            <div className="relative bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">2</div>
                <Activity className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">Risk Assessment</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Enter your weight, biological sex, drinking history, and planned drinks. SafeNite uses the Widmark equation — the same model used by medical professionals — to calculate your personalized blackout risk percentage.
              </p>
              <ul className="space-y-2">
                {['Widmark BAC equation', 'Tolerance & history adjustments', 'Front-loading detection', 'Clear risk percentage output'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/baseline"
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-3">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* Explore Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Explore SafeNite</span>
            <h2 className="text-4xl font-bold mt-3">Everything you need</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Activity, label: 'Baseline Assessment', desc: 'Calculate your personalized blackout risk', path: '/baseline', color: 'bg-blue-600' },
              { icon: BookOpen, label: 'Research', desc: 'Learn about blackouts and harm reduction', path: '/research', color: 'bg-purple-600' },
              { icon: CheckSquare, label: 'Safety Checklist', desc: 'Complete essential safety steps first', path: '/baseline', color: 'bg-green-600' },
              { icon: Phone, label: 'Support Resources', desc: 'Access hotlines and addiction support', path: '/support', color: 'bg-red-600' },
            ].map(({ icon: Icon, label, desc, path, color }) => (
              <Link key={label} to={path}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-1 group">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* Image + Quote Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            {/* Image placeholder */}
            <div className="md:col-span-1 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-72 flex items-center justify-center mb-8 md:mb-0 border border-slate-200">
              <div className="text-center text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium opacity-70">[ Community Image ]</p>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <Award className="w-10 h-10 text-blue-600 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-6">
                "Real friends don't let friends black out alone. Real apps don't either."
              </blockquote>
              <p className="text-slate-500 leading-relaxed">
                SafeNite was built for college students, by people who understand the culture — not to eliminate fun, but to make sure everyone gets home safe. Because the best nights are the ones you remember.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold text-lg">SafeNite</span>
          </div>
          <p className="text-sm mb-2">Built with evidence-based research for harm reduction.</p>
          <p className="text-sm font-semibold text-slate-300">If you're in crisis, call <span className="text-blue-400">988</span> (Suicide & Crisis Lifeline).</p>
        </div>
      </footer>
 
    </div>
  );
}