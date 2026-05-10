import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, ArrowLeft, ChevronDown, Calculator } from 'lucide-react';

interface MathBreakdown {
  totalDrinks: number;
  estimatedBAC: number;
  ateFood: boolean;
  frontLoaded: boolean;
  bingeDays: number;
}

interface ResultsScreenProps {
  riskPercentage: number;
  breakdown: MathBreakdown | null; // ADDED
  onReset: () => void;
  onStartTracking: () => void;
}

export function ResultsScreen({ riskPercentage, breakdown, onReset, onStartTracking }: ResultsScreenProps) {
  let riskTier = 'low';
  if (riskPercentage >= 30) riskTier = 'moderate';
  if (riskPercentage >= 75) riskTier = 'high';

  const config = {
    low: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, title: 'Low Risk', message: 'Your predicted physiological risk of an alcohol-induced blackout is low based on this plan. Remember to pace yourself and stay hydrated.' },
    moderate: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, title: 'Elevated Risk', message: 'You have a significant risk of experiencing a blackout. Consider slowing your drinking pace, eating food, or reducing your total alcohol intake.' },
    high: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertOctagon, title: 'Critical Risk', message: 'WARNING: This drinking plan carries a severely high probability of an alcohol-induced blackout. You are strongly advised to reconsider this plan for your physical safety.' }
  };

  const activeConfig = config[riskTier as keyof typeof config];
  const Icon = activeConfig.icon;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-slate-900 text-white p-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Risk Assessment</h2>
        <p className="text-slate-300 text-sm md:text-base">Physiological blackout probability</p>
      </div>

      <div className="flex-1 p-6 space-y-8 flex flex-col justify-center items-center overflow-y-auto">
        <div className={`relative flex items-center justify-center w-56 h-56 rounded-full border-[12px] shadow-lg flex-shrink-0 ${activeConfig.border} ${activeConfig.bg}`}>
          <span className={`text-7xl font-black tracking-tighter ${activeConfig.color}`}>{riskPercentage}%</span>
        </div>

        <div className={`w-full p-6 rounded-xl border-2 ${activeConfig.border} ${activeConfig.bg} text-center space-y-3`}>
          <div className="flex justify-center mb-4"><Icon className={`w-12 h-12 ${activeConfig.color}`} /></div>
          <h3 className={`text-2xl font-bold ${activeConfig.color}`}>{activeConfig.title}</h3>
          <p className="text-slate-700 text-lg leading-relaxed font-medium">{activeConfig.message}</p>
        </div>

        {/* ADDED: Math Breakdown Accordion */}
        {breakdown && (
          <div className="w-full">
            <details className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  How was this calculated?
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 pt-0 border-t border-slate-200 text-sm text-slate-600 space-y-4 mt-4">
                <p>Your score is powered by a two-engine pharmacokinetic and behavioral algorithm.</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-lg leading-none mt-0.5">•</span>
                    <div>
                      <strong className="text-slate-800">The Alcohol:</strong> You planned {breakdown.totalDrinks.toFixed(1)} standard drinks. Based on your weight and biological sex, this pushes your estimated Blood Alcohol Content (BAC) to ~{breakdown.estimatedBAC.toFixed(2)} g/dL. This is the primary driver of your risk.
                    </div>
                  </li>
                  
                  {breakdown.frontLoaded && (
                    <li className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5 text-red-500">•</span>
                      <div>
                        <strong className="text-red-700">Pacing Penalty:</strong> Because you are front-loading (taking shots/chugging), the algorithm applied a severe acute risk multiplier. Alcohol will hit your bloodstream faster than your liver can process it.
                      </div>
                    </li>
                  )}

                  {breakdown.ateFood ? (
                    <li className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5 text-green-500">•</span>
                      <div>
                        <strong className="text-green-700">Protective Factors:</strong> Eating food beforehand reduced your peak BAC absorption rate by 25%, significantly lowering your risk probability.
                      </div>
                    </li>
                  ) : (
                    <li className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5 text-amber-500">•</span>
                      <div>
                        <strong className="text-amber-700">Empty Stomach:</strong> You did not eat food. Drinking on an empty stomach accelerates alcohol absorption, spiking your risk.
                      </div>
                    </li>
                  )}

                  {breakdown.bingeDays > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5">•</span>
                      <div>
                        <strong className="text-slate-800">Historical Baseline:</strong> Your history of binge drinking ({breakdown.bingeDays} days this month) adds an underlying behavioral risk before you even take your first sip.
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </details>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
        <button 
          onClick={onStartTracking} 
          className="w-full bg-purple-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-purple-700 transition-colors shadow-md"
        >
          Start Live Tracking
        </button>
        <button 
          onClick={onReset} 
          className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-700 py-3 rounded-lg text-base font-semibold hover:bg-slate-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Recalculate Plan
        </button>
      </div>
    </div>
  );
}