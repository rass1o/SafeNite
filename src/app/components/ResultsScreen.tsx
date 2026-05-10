import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

interface ResultsScreenProps {
  riskPercentage: number;
  onReset: () => void;
}

export function ResultsScreen({ riskPercentage, onReset }: ResultsScreenProps) {
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

      <div className="flex-1 p-6 space-y-10 flex flex-col justify-center items-center">
        <div className={`relative flex items-center justify-center w-56 h-56 rounded-full border-[12px] shadow-lg ${activeConfig.border} ${activeConfig.bg}`}>
          <span className={`text-7xl font-black tracking-tighter ${activeConfig.color}`}>{riskPercentage}%</span>
        </div>

        <div className={`w-full p-6 rounded-xl border-2 ${activeConfig.border} ${activeConfig.bg} text-center space-y-3`}>
          <div className="flex justify-center mb-4"><Icon className={`w-12 h-12 ${activeConfig.color}`} /></div>
          <h3 className={`text-2xl font-bold ${activeConfig.color}`}>{activeConfig.title}</h3>
          <p className="text-slate-700 text-lg leading-relaxed font-medium">{activeConfig.message}</p>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <button onClick={onReset} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-lg text-lg font-semibold hover:bg-slate-900 transition-colors shadow-md">
          <ArrowLeft className="w-5 h-5" /> Assess Another Plan
        </button>
      </div>
    </div>
  );
}