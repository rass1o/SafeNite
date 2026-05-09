import { Phone, Heart, LifeBuoy, Headphones, Shield, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen pb-20 md:pb-0 md:bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-pink-600 text-white p-6 md:py-12">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl">Support</h1>
          </div>
          <p className="text-sm md:text-lg text-red-100">
            You're not alone. Help is available.
          </p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="p-6 md:py-12 bg-white border-b border-slate-200">
        <div className="md:max-w-7xl md:mx-auto">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-4 md:p-6 rounded">
            <h2 className="text-xl md:text-3xl mb-3">Recovery is Possible</h2>
            <p className="text-slate-700 md:text-lg leading-relaxed mb-3">
              If you're struggling with alcohol or substance use, know that{' '}
              <span className="font-semibold">seeking help is a sign of strength, not weakness</span>
              . Addiction is a medical condition, not a moral failing.
            </p>
            <p className="text-slate-700 md:text-lg leading-relaxed">
              Thousands of people recover every year with proper support. The first step is often
              the hardest, but you don't have to take it alone.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-4 md:p-6 rounded">
            <h3 className="font-semibold mb-2 md:text-lg text-amber-900">Signs You May Need Support</h3>
            <ul className="text-sm md:text-base text-amber-900 space-y-1 ml-4">
              <li>• You drink more or longer than you intend to</li>
              <li>• You've tried to cut down but can't</li>
              <li>• Drinking is causing problems in your relationships or academics</li>
              <li>• You need more alcohol to feel the same effect (tolerance)</li>
              <li>• You experience withdrawal symptoms when not drinking</li>
              <li>• You've had multiple blackouts</li>
            </ul>
            <p className="text-sm md:text-base text-amber-900 mt-3 font-semibold">
              If you checked even one box, please reach out to a resource below.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Hotlines */}
      <div className="p-6 md:py-12 space-y-4">
        <div className="md:max-w-7xl md:mx-auto">
          <h2 className="text-lg md:text-2xl mb-4 md:mb-6">Crisis & Support Hotlines</h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {hotlines.map((hotline) => {
          const Icon = hotline.icon;
          const telNumber = hotline.number.replace(/[^0-9]/g, '');

          return (
            <div
              key={hotline.number}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg md:text-xl">{hotline.name}</h3>
                    <p className="text-sm md:text-base text-slate-600 mt-1">{hotline.description}</p>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      Available: {hotline.available}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:+${telNumber}`}
                  className={`w-full py-4 px-6 ${hotline.color} text-white text-lg md:text-xl font-semibold rounded-lg shadow-md hover:shadow-lg active:shadow-sm transition-all flex items-center justify-center gap-3`}
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  {hotline.number}
                </a>
              </div>
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="p-6 md:py-12">
        <div className="md:max-w-7xl md:mx-auto">
        <div className="bg-slate-100 p-4 md:p-6 rounded-lg">
          <h3 className="font-semibold mb-3 md:text-lg">Additional Campus Resources</h3>
          <ul className="text-sm md:text-base text-slate-700 space-y-2 ml-4">
            <li>
              • <span className="font-semibold">UC Davis Student Health & Counseling:</span> CAPS
              provides free mental health and substance use counseling
            </li>
            <li>
              • <span className="font-semibold">Campus Violence Prevention Program:</span> Support
              for survivors of assault or violence
            </li>
            <li>
              • <span className="font-semibold">Academic Advising:</span> Can help if substance use
              is affecting your studies
            </li>
          </ul>
        </div>
        </div>
      </div>

      {/* Bottom Message */}
      <div className="p-6 md:py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
        <p className="text-lg md:text-2xl mb-2">
          Your life has value. Your story isn't over.
        </p>
        <p className="text-sm md:text-base text-purple-100">
          These resources exist because people care and want to help. Please use them.
        </p>
      </div>
    </div>
  );
}
