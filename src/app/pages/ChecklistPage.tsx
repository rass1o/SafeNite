import { useState } from 'react';
import { CheckSquare, Car, Map, Users, Utensils, CheckCircle2, XCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  question: string;
  icon: React.ElementType;
  yesInfo: {
    title: string;
    content: string;
    type: 'positive' | 'info';
  };
  noInfo: {
    title: string;
    content: string;
    type: 'warning' | 'danger';
  };
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'transportation',
    question: 'Do you have a way of getting back home?',
    icon: Car,
    yesInfo: {
      title: 'Great planning!',
      content:
        'Having a safe ride home is crucial. Whether it\'s a designated driver, rideshare app, or SafeRide, you\'ve taken an important step. Keep the contact info saved in your phone and confirm the plan with your group before drinking.',
      type: 'positive',
    },
    noInfo: {
      title: 'This is a critical safety issue',
      content:
        'NEVER drink without a safe transportation plan. Download Uber/Lyft now, save the UC Davis SafeRide number (+1-530-752-3222), or arrange a designated driver. Impaired driving and walking home alone are the two most dangerous outcomes of a night out.',
      type: 'danger',
    },
  },
  {
    id: 'itinerary',
    question: 'Do you have an itinerary for your night?',
    icon: Map,
    yesInfo: {
      title: 'Smart approach',
      content:
        'Having a plan helps you stay in control. Share your itinerary with a trusted friend or roommate who\'s not going out. Include locations, expected timeline, and when you plan to be home. This creates accountability and helps if someone needs to check on you.',
      type: 'info',
    },
    noInfo: {
      title: 'Consider making a loose plan',
      content:
        'Spontaneity is fun, but having zero plan increases risk. At minimum, decide: (1) Where you\'re starting, (2) Rough timeline for the night, (3) When you need to be home. Text this info to a roommate. Wandering between random locations while intoxicated puts you in vulnerable situations.',
      type: 'warning',
    },
  },
  {
    id: 'trusted_people',
    question: 'Are the people you\'re going with trusted?',
    icon: Users,
    yesInfo: {
      title: 'Your safety network',
      content:
        'Going out with people you trust is one of the most important protective factors. Make a buddy system pact: check on each other throughout the night, intervene if someone is too intoxicated, and ensure everyone gets home safely. Real friends don\'t let friends black out alone.',
      type: 'positive',
    },
    noInfo: {
      title: 'High risk situation',
      content:
        'Going out with people you don\'t trust well is extremely dangerous when drinking. Blackouts leave you vulnerable to harm, and strangers or acquaintances may not look out for you. Strongly reconsider this plan. If you must go, tell a trusted friend exactly where you\'ll be and check in hourly.',
      type: 'danger',
    },
  },
  {
    id: 'food',
    question: 'Did you eat before drinking?',
    icon: Utensils,
    yesInfo: {
      title: 'Excellent harm reduction',
      content:
        'Eating before drinking—especially carbohydrate-rich foods—slows alcohol absorption and reduces peak BAC. This lowers blackout risk and hangover severity. Keep hydrating throughout the night: alternate each alcoholic drink with a glass of water. Your body will thank you tomorrow.',
      type: 'positive',
    },
    noInfo: {
      title: 'Stop and eat NOW',
      content:
        'Drinking on an empty stomach dramatically increases blackout risk. Alcohol absorbs faster, leading to rapid BAC spikes. Eat a substantial meal with carbs and protein before your first drink. Toast, pasta, rice, or a burger work great. Also, drink a full glass of water right now and continue hydrating.',
      type: 'danger',
    },
  },
];

export function ChecklistPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const handleAnswer = (id: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const completedCount = Object.values(answers).filter((a) => a !== null).length;
  const allCompleted = completedCount === checklistItems.length;

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 md:py-12">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <CheckSquare className="w-8 h-8 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl">Safety Checklist</h1>
          </div>
          <p className="text-sm md:text-lg text-green-100">
            Complete before going out or drinking
          </p>
          <div className="mt-4 bg-green-700 rounded-full h-2 md:h-3 md:max-w-2xl">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
            />
          </div>
          <p className="text-xs md:text-sm text-green-100 mt-2">
            {completedCount} of {checklistItems.length} completed
          </p>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="p-6 md:py-12 space-y-6">
        <div className="md:max-w-7xl md:mx-auto md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6 md:space-y-0">
        {checklistItems.map((item, index) => {
          const Icon = item.icon;
          const answer = answers[item.id];
          const info = answer === true ? item.yesInfo : answer === false ? item.noInfo : null;

          return (
            <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden md:h-fit">
              {/* Question */}
              <div className="bg-slate-50 p-4 md:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-slate-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg md:text-xl">
                    {index + 1}. {item.question}
                  </h3>
                </div>

                {/* Answer Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(item.id, true)}
                    className={`flex-1 py-3 px-4 rounded-lg text-base md:text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      answer === true
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-green-600'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(item.id, false)}
                    className={`flex-1 py-3 px-4 rounded-lg text-base md:text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      answer === false
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-red-600'
                    }`}
                  >
                    <XCircle className="w-5 h-5 md:w-6 md:h-6" />
                    No
                  </button>
                </div>
              </div>

              {/* Contextual Information */}
              {info && (
                <div
                  className={`p-4 md:p-6 ${
                    info.type === 'positive'
                      ? 'bg-green-50 border-t-4 border-green-600'
                      : info.type === 'info'
                      ? 'bg-blue-50 border-t-4 border-blue-600'
                      : info.type === 'warning'
                      ? 'bg-yellow-50 border-t-4 border-yellow-600'
                      : 'bg-red-50 border-t-4 border-red-600'
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 md:text-lg ${
                      info.type === 'positive'
                        ? 'text-green-900'
                        : info.type === 'info'
                        ? 'text-blue-900'
                        : info.type === 'warning'
                        ? 'text-yellow-900'
                        : 'text-red-900'
                    }`}
                  >
                    {info.title}
                  </h4>
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      info.type === 'positive'
                        ? 'text-green-800'
                        : info.type === 'info'
                        ? 'text-blue-800'
                        : info.type === 'warning'
                        ? 'text-yellow-800'
                        : 'text-red-800'
                    }`}
                  >
                    {info.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

      {/* Completion Message */}
      {allCompleted && (
        <div className="mx-6 mb-6 md:mx-auto md:max-w-7xl bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl mb-2">✓ Checklist Complete</h3>
          <p className="text-sm md:text-base">
            You've reviewed all safety items. Remember: these are minimum precautions, not
            guarantees. Stay aware, look out for your friends, and don't hesitate to call for help
            if needed.
          </p>
        </div>
      )}
    </div>
  );
}
