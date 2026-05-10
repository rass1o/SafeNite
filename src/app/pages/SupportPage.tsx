import { Phone, Heart, LifeBuoy, Headphones, Shield, MessageCircle, Info } from 'lucide-react';

interface Hotline {
  name: string;
  number: string;
  description: string;
  icon: React.ElementType;
  available: string;
  color: string;
}

const hotlines: Hotline[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    number: '988',
    description:
      'Free and confidential support for people in distress, 24/7 crisis counseling and prevention services.',
    icon: LifeBuoy,
    available: '24/7',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    name: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description:
      'Free, confidential treatment referral and information service for substance abuse and mental health (in English and Spanish).',
    icon: Headphones,
    available: '24/7',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Alcoholics Anonymous',
    number: '1-212-870-3400',
    description:
      'Connect to local AA meetings and support groups. AA is a fellowship of people who share their experience to solve their common problem with alcohol.',
    icon: Shield,
    available: 'Mon-Fri 9am-5pm ET',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    name: 'Crisis Text Line',
    number: '741741',
    description:
      'Text HOME to 741741 for free, 24/7 crisis support. Connect with a trained crisis counselor via text message.',
    icon: MessageCircle,
    available: '24/7',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    name: 'UC Davis SafeRide',
    number: '1-530-752-3222',
    description:
      'Free, safe transportation for UC Davis students who need a ride home. Available during academic year evenings and weekends.',
    icon: Phone,
    available: 'Check campus schedule',
    color: 'bg-amber-600 hover:bg-amber-700',
  },
];

export function SupportPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-600 to-pink-600 text-white p-6 md:py-12 shadow-md">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl font-bold">Support</h1>
          </div>
          <p className="text-sm md:text-lg text-rose-100 font-medium">
            You're not alone. Help is available.
          </p>
        </div>
      </div>

      <div className="p-6 md:py-12 space-y-12">
        <div className="md:max-w-7xl md:mx-auto space-y-12">
          
          {/* Motivational Message Card */}
          <section className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-rose-100 border-b border-rose-200 p-6 flex items-center gap-3">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-700" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">Recovery is Possible</h2>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <p className="text-slate-700 md:text-lg leading-relaxed mb-4">
                  If you're struggling with alcohol or substance use, know that{' '}
                  <span className="font-bold text-rose-700">seeking help is a sign of strength, not weakness</span>
                  . Addiction is a medical condition, not a moral failing.
                </p>
                <p className="text-slate-700 md:text-lg leading-relaxed">
                  Thousands of people recover every year with proper support. The first step is often
                  the hardest, but you don't have to take it alone.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-3 md:text-xl text-amber-900">Signs You May Need Support</h3>
                <ul className="text-sm md:text-base text-amber-900 space-y-2 ml-2">
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> You drink more or longer than you intend to</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> You've tried to cut down but can't</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> Drinking is causing problems in your relationships or academics</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> You need more alcohol to feel the same effect (tolerance)</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> You experience withdrawal symptoms when not drinking</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5">•</span> You've had multiple blackouts</li>
                </ul>
                <div className="mt-5 pt-4 border-t border-amber-200">
                  <p className="text-sm md:text-base text-amber-900 font-bold">
                    If you checked even one box, please reach out to a resource below.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hotlines */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Crisis & Support Hotlines</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hotlines.map((hotline) => {
                const Icon = hotline.icon;
                const telNumber = hotline.number.replace(/[^0-9]/g, '');

                return (
                  <div
                    key={hotline.number}
                    className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg md:text-xl text-slate-900">{hotline.name}</h3>
                          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                            Available: {hotline.available}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">{hotline.description}</p>
                    </div>

                    <div className="p-6 pt-0">
                      <a
                        href={`tel:+${telNumber}`}
                        className={`w-full py-4 px-6 ${hotline.color} text-white text-lg md:text-xl font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-3`}
                      >
                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
                        {hotline.number}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-100 border-b border-blue-200 p-6 flex items-center gap-3">
              <Info className="w-6 h-6 md:w-8 md:h-8 text-blue-700" />
              <h3 className="font-bold text-xl md:text-2xl text-slate-900">Additional Campus Resources</h3>
            </div>
            <div className="p-6 md:p-8 bg-white">
              <ul className="text-sm md:text-base text-slate-700 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">•</span>
                  <div><span className="font-bold text-slate-900">UC Davis Student Health & Counseling:</span> CAPS provides free mental health and substance use counseling.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">•</span>
                  <div><span className="font-bold text-slate-900">Campus Violence Prevention Program:</span> Support for survivors of assault or violence.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">•</span>
                  <div><span className="font-bold text-slate-900">Academic Advising:</span> Can help if substance use is affecting your studies.</div>
                </li>
              </ul>
            </div>
          </section>

          {/* Bottom Message */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center p-8 md:p-12 rounded-2xl shadow-lg">
            <p className="text-xl md:text-3xl font-bold mb-3 tracking-tight">
              Your life has value. Your story isn't over.
            </p>
            <p className="text-base md:text-lg text-purple-100 font-medium">
              These resources exist because people care and want to help. Please use them.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}