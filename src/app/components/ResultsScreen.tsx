import { Phone, RotateCcw, AlertCircle } from 'lucide-react';

interface ResultsScreenProps {
  riskPercentage: number;
  onReset: () => void;
}

export function ResultsScreen({ riskPercentage, onReset }: ResultsScreenProps) {
  const isHighRisk = riskPercentage >= 60;

  const getRiskColor = () => {
    if (riskPercentage < 30) return 'text-green-600';
    if (riskPercentage < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLabel = () => {
    if (riskPercentage < 30) return 'Low Risk';
    if (riskPercentage < 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className={`flex flex-col min-h-screen pb-32 ${isHighRisk ? 'bg-red-50' : 'bg-white'}`}>
      <div className={`p-6 ${isHighRisk ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
        <h1 className="text-2xl">Your Risk Assessment</h1>
        <p className="text-sm mt-1 opacity-90">Based on your profile and plan</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        {/* Risk Gauge */}
        <div className="text-center mb-8">
          <div className={`text-8xl mb-4 ${getRiskColor()}`}>{riskPercentage}%</div>
          <div className={`text-2xl ${getRiskColor()}`}>{getRiskLabel()}</div>
        </div>

        {/* Visual Risk Bar */}
        <div className="w-full max-w-sm mb-12">
          <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                riskPercentage < 30
                  ? 'bg-green-600'
                  : riskPercentage < 60
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${Math.min(100, riskPercentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* High Risk Intervention */}
        {isHighRisk && (
          <div className="w-full max-w-sm space-y-6">
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-900">
                Your physiological risk level is elevated. Please consider safer transportation
                options.
              </p>
            </div>

            {/* Safe Ride Button */}
            <a
              href="tel:+15307523222"
              className="block w-full py-6 px-6 bg-red-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-red-700 active:bg-red-800 transition-colors flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Call UC Davis Safe Ride
            </a>

            {/* Compassionate Nudge */}
            <p className="text-center text-sm text-slate-700 px-4">
              Not comfortable using SafeRide?{' '}
              <span className="font-semibold">
                Please text a roommate or friend to come get you.
              </span>{' '}
              Your physiological risk level is too high to navigate alone tonight.
            </p>
          </div>
        )}

        {/* Low/Moderate Risk Message */}
        {!isHighRisk && (
          <div className="w-full max-w-sm">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-slate-700">
                {riskPercentage < 30
                  ? 'Your risk appears manageable based on the current plan. Still, please drink water, pace yourself, and stay with friends.'
                  : 'Moderate risk detected. Consider slowing down, drinking water between drinks, and having a plan to get home safely.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 p-6 border-t border-slate-200 bg-white max-w-[480px] mx-auto md:static md:max-w-none md:mt-auto">
        <button
          onClick={onReset}
          className="w-full py-4 bg-slate-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-700 active:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Start New Assessment
        </button>
      </div>
    </div>
  );
}
