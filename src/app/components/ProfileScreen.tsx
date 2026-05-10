import React from 'react';
import { User, Activity, CalendarDays, AlertTriangle, Scale } from 'lucide-react';
import { ProfileData } from '../App';

interface ExtendedProfileData extends ProfileData {
  bingeDays: number;
}

interface ProfileScreenProps {
  data: ExtendedProfileData;
  onChange: (data: ExtendedProfileData) => void;
  onNext: () => void;
}

export function ProfileScreen({ data, onChange, onNext }: ProfileScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-slate-900 text-white p-6 md:py-8">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold">Your Profile</h2>
        </div>
        <p className="text-slate-300 text-sm md:text-base">This data ensures accurate physiological risk calculations.</p>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Scale className="w-4 h-4 text-slate-500" /> Weight (lbs)</label>
            <input type="number" min="80" max="400" value={data.weight || ''} onChange={(e) => onChange({ ...data, weight: Number(e.target.value) })} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g., 150" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><User className="w-4 h-4 text-slate-500" /> Sex at Birth</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button onClick={() => onChange({ ...data, sex: 'male' })} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${data.sex === 'male' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Male</button>
              <button onClick={() => onChange({ ...data, sex: 'female' })} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${data.sex === 'female' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Female</button>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CalendarDays className="w-4 h-4 text-blue-500" /> Binge Drinking Frequency</label>
          <p className="text-xs text-slate-500">How many days in the past 30 days did you consume 4+ drinks (female) or 5+ drinks (male)?</p>
          <div className="flex items-center gap-4">
            <input type="range" min="0" max="30" value={data.bingeDays} onChange={(e) => onChange({ ...data, bingeDays: Number(e.target.value) })} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            <span className="w-12 text-center font-bold text-lg text-slate-700">{data.bingeDays}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <button onClick={onNext} disabled={!data.weight} className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Continue to Drinks →
        </button>
      </div>
    </div>
  );
}