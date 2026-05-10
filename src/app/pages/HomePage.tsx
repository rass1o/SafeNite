import { Link } from 'react-router';
import { Shield, BookOpen, Activity, Phone, ArrowRight, CheckSquare, Heart, Award, Compass, ChevronRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">
 
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Sammy Hamster Mascot */}
        <img
          src="/sammyhamster.png"
          alt="SafeNite hamster knight mascot"
          className="hidden lg:block absolute right-6 bottom-0 w-[280px] xl:w-[350px] z-0 opacity-90 pointer-events-none select-none drop-shadow-2xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Safety is the first step...<br />
                <span className="text-blue-300">to having a great night!</span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed mb-8 font-medium">
                SafeNite is a real-time web app that uses science to predict your personal risk of blacking out. We run the complex math in the background so you can pace yourself, stay safe, and actually remember your night.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/baseline"
                  className="bg-slate-50 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors flex items-center gap-2 justify-center shadow-lg"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/research"
                  className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4 mt-12 md:mt-0">
              {[
                { value: '1 in 6', label: 'college students experience blackouts annually' },
                { value: '51%', label: 'of blackout episodes involve rapid consumption' },
                { value: '3x', label: 'higher injury risk during blackout episodes' },
                { value: '26.7%', label: 'of young adults reported binge drinking just in the past month' },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200 leading-snug font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* 2. RESTRUCTURED CONTENT */}
      <div className="p-6 md:py-16 space-y-12">
        <div className="md:max-w-7xl md:mx-auto space-y-12">

          {/* Mission Card */}
          <section className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-purple-100 border-b border-purple-200 p-6 flex items-center gap-3">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-purple-700" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">Our Mission</h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
                <div className="md:col-span-1 relative overflow-hidden rounded-xl h-72 mb-8 md:mb-0 border border-slate-200 shadow-md">
                  <img
                    src="/milkshake.jpg"
                    alt="Friends supporting each other during a night out"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Harm reduction, not judgment
                  </h3>
                  
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    SafeNite takes real medical research and turns it into easy-to-use tools that help you make smart choices while drinking. We're not here to tell you to stop having fun—we just want to keep you safe.
                  </p>
                  
                  <div className="bg-slate-100 border-l-4 border-purple-600 p-5 rounded-r-xl shadow-inner">
                    <p className="text-slate-800 font-medium leading-relaxed">
                      <strong>Why it matters:</strong> Blacking out puts you in a highly vulnerable and dangerous position. Knowing your personal limits before you cross them empowers you to protect yourself and look out for your friends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works wrapper */}
          <section className="pt-4">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900">How It Works</h2>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8 space-y-8 md:space-y-0">
              
              {/* Step 1 Card */}
              <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-green-100 border-b border-green-200 p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">1</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Safety Checklist</h3>
                </div>
                <div className="p-6 md:p-8 flex-1">
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    Before going out, run through our 4-point safety checklist covering transportation, your itinerary, who you're with, and whether you've eaten. Each answer gives you evidence-based guidance tailored to your situation.
                  </p>
                  <ul className="space-y-3">
                    {['Safe ride home planned', 'Itinerary shared with someone trusted', 'Going with people you trust', 'Ate a meal before drinking'].map(item => (
                      <li key={item} className="flex items-start gap-3 text-slate-800 font-medium">
                        <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 2 Card */}
              <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-blue-100 border-b border-blue-200 p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">2</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Risk Assessment</h3>
                </div>
                <div className="p-6 md:p-8 flex-1">
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    Enter your weight, biological sex, drinking history, and planned drinks. SafeNite uses the Widmark equation — the same model used by medical professionals — to calculate your personalized blackout risk percentage.
                  </p>
                  <ul className="space-y-3">
                    {['Widmark BAC equation', 'Recent drinking patterns', 'Front-loading detection', 'Clear risk percentage output'].map(item => (
                      <li key={item} className="flex items-start gap-3 text-slate-800 font-medium">
                        <span className="w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            <div className="text-center mt-10">
              <Link to="/baseline" className="bg-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-colors inline-flex items-center gap-3 shadow-md">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          {/* Explore Section */}
          <section className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Explore SafeNite</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Activity, label: 'Baseline Assessment', desc: 'Calculate your personalized blackout risk.', path: '/baseline', color: 'text-blue-700', hoverColor: 'hover:border-blue-400' },
                { icon: BookOpen, label: 'Research', desc: 'See the clinical science and mathematical models powering our algorithms.', path: '/research', color: 'text-purple-700', hoverColor: 'hover:border-purple-400' },
                { icon: CheckSquare, label: 'Safety Checklist', desc: 'Complete essential safety steps first.', path: '/baseline', color: 'text-green-700', hoverColor: 'hover:border-green-400' },
                { icon: Phone, label: 'Support Resources', desc: 'Access hotlines and addiction support.', path: '/support', color: 'text-rose-600', hoverColor: 'hover:border-rose-400' },
              ].map(({ icon: Icon, label, desc, path, color, hoverColor }) => (
                <Link key={label} to={path} className={`bg-slate-50 border border-slate-200 p-5 rounded-xl flex items-start gap-4 transition-all hover:shadow-md ${hoverColor} group`}>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                      {label} <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quote Card */}
          <section className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
            <div className="bg-violet-100 border-b border-violet-200 p-6 flex items-center gap-3">
              <Award className="w-6 h-6 md:w-8 md:h-8 text-violet-700" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">For Students, By Students</h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="md:grid md:grid-cols-3 md:gap-12 items-center">
                <div className="md:col-span-1 relative overflow-hidden rounded-xl h-72 mb-8 md:mb-0 border border-slate-200 shadow-md">
                  <img
                    src="/walkingfriends.jpg"
                    alt="Friends supporting each other during a night out"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-6">
                    "Real friends don't let friends black out alone. Real apps don't either."
                  </blockquote>
                  <p className="text-slate-700 text-lg leading-relaxed font-medium">
                    SafeNite was built for college students, by people who understand the culture — not to eliminate fun, but to make sure everyone gets home safe. Because the best nights are the ones you remember.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}