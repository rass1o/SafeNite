import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Plus, Minus, Phone, Clock, Droplets, Utensils, Users, Car, ShieldAlert, FlaskConical } from 'lucide-react';

interface DrinkEntry {
  id: string;
  type: string;
  standardDrinks: number;
  time: Date;
  label?: string; // Added to support custom labels
}

interface DrinkType {
  label: string;
  standardDrinks: number;
  color: string;
  bgColor: string;
}

const DRINK_TYPES: Record<string, DrinkType> = {
  beer: { label: 'Beer', standardDrinks: 0.8, color: '#2563eb', bgColor: '#eff6ff' },
  craftIPA: { label: 'Craft IPA', standardDrinks: 1.9, color: '#7c3aed', bgColor: '#f5f3ff' },
  shot: { label: 'Shot', standardDrinks: 1.0, color: '#dc2626', bgColor: '#fef2f2' },
  wine: { label: 'Wine', standardDrinks: 1.0, color: '#9d174d', bgColor: '#fdf2f8' },
  cocktail: { label: 'Cocktail', standardDrinks: 1.5, color: '#0f766e', bgColor: '#f0fdfa' },
};

export function DrinkTrackerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const engineState = location.state as { weightLbs: number, sex: string, bingeDays: number, userAteFood: boolean } | null;

  const [log, setLog] = useState<DrinkEntry[]>([]);
  const [sessionStart] = useState<Date>(new Date());
  const [now, setNow] = useState<Date>(new Date());
  
  // NEW: State for the custom drink inputs
  const [customOz, setCustomOz] = useState<number>(12);
  const [customAbv, setCustomAbv] = useState<number>(5.0);

  useEffect(() => {
    if (!engineState) navigate('/baseline');
  }, [engineState, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!engineState) return null;
  const { weightLbs, sex, bingeDays, userAteFood } = engineState;

  const hoursElapsed = (now.getTime() - sessionStart.getTime()) / 3600000;
  const totalStandardDrinks = log.reduce((sum, e) => sum + e.standardDrinks, 0);

  const calculateProbabilityAndBAC = () => {
    const BETA_0 = -3.641;
    const BETA_1 = 0.106;
    const GAMMA_BAC = 30;
    const priorLogOdds = BETA_0 + (BETA_1 * bingeDays);
    const r = sex === 'male' ? 0.68 : 0.55;
    const weightKg = weightLbs * 0.453592;
    const gramsAlcohol = totalStandardDrinks * 14;
    
    let rawBac = ((gramsAlcohol / (weightKg * r * 1000)) * 100) - (hoursElapsed * 0.015);
    if (userAteFood) rawBac *= 0.75;

    const finalBac = Math.max(0, rawBac);
    const acuteLogOdds = GAMMA_BAC * finalBac;
    const totalLogOdds = priorLogOdds + acuteLogOdds;
    const probability = 1 / (1 + Math.exp(-totalLogOdds));

    return { bac: finalBac, probability };
  };

  const { bac, probability } = calculateProbabilityAndBAC();
  const isCriticalRisk = probability >= 0.75;

  const getBACStatus = () => {
    if (probability < 0.30) return { label: 'Safe Pacing', color: '#16a34a', bg: '#f0fdf4', bar: '#16a34a', pct: (probability / 0.75) * 100 };
    if (probability < 0.75) return { label: 'Elevated Risk', color: '#ea580c', bg: '#fff7ed', bar: '#ea580c', pct: (probability / 0.75) * 100 };
    return { label: 'Critical Blackout Risk', color: '#dc2626', bg: '#fef2f2', bar: '#dc2626', pct: 100 };
  };

  const status = getBACStatus();

  const addDrink = (type: string) => {
    const drink = DRINK_TYPES[type];
    setLog(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      type,
      standardDrinks: drink.standardDrinks,
      time: new Date(),
    }]);
  };

  // NEW: Calculate and add custom drink
  const addCustomDrink = () => {
    const stdDrinks = (customOz * (customAbv / 100)) / 0.6;
    setLog(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      type: 'custom',
      label: `Custom (${customAbv}% / ${customOz}oz)`,
      standardDrinks: stdDrinks,
      time: new Date(),
    }]);
  };

  const removeLast = () => setLog(prev => prev.slice(0, -1));
  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const timeUntilSober = Math.ceil(bac / 0.015);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      {/* Header (Remains exactly the same) */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Live coach</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold">Real-time Risk</h1>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xs mb-1">Session started</div>
              <div className="text-white font-semibold">{formatTime(sessionStart)}</div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 md:grid md:grid-cols-3 md:gap-6 md:items-center">
            <div className="md:col-span-2">
              <div className="text-slate-400 text-xs mb-2 uppercase tracking-wide">Physiological Probability</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl md:text-7xl font-bold" style={{ color: status.color }}>
                  {Math.round(probability * 100)}%
                </span>
                <span className="text-slate-400 text-lg">AIB Risk</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: status.color }}></div>
                <span className="font-semibold" style={{ color: status.color }}>{status.label}</span>
              </div>
              <div className="bg-slate-700 rounded-full h-3 mb-2 max-w-md">
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(status.pct, 100)}%`, background: status.color }}
                />
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-3 mt-6 md:mt-0">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-slate-400 text-xs mb-1">Total drinks</div>
                <div className="text-white text-2xl font-bold">{totalStandardDrinks.toFixed(1)}</div>
                <div className="text-slate-500 text-xs">standard drinks</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-slate-400 text-xs mb-1">Sober in ~</div>
                <div className="text-white text-2xl font-bold">{bac > 0 ? timeUntilSober : 0}h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 md:grid md:grid-cols-2 md:gap-8">
        <div>
          {/* THE BIG BUTTON UI */}
          {!isCriticalRisk ? (
            <div className="mb-8">
               <button onClick={() => addDrink('beer')} className="w-full py-8 md:py-12 bg-blue-600 text-white rounded-3xl shadow-lg active:scale-95 transition-transform flex flex-col items-center justify-center gap-2">
                 <Plus className="w-10 h-10" />
                 <span className="text-3xl font-black tracking-tight">Quick Add Drink</span>
                 <span className="text-blue-200 text-sm font-medium">Standard 1.0 Equivalent</span>
               </button>
               {log.length > 0 && (
                 <div className="flex justify-end mt-3">
                   <button onClick={removeLast} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors">
                     <Minus className="w-4 h-4" /> Undo last entry
                   </button>
                 </div>
               )}
            </div>
          ) : (
            <div className="bg-red-50 border-l-8 border-red-600 rounded-2xl p-6 shadow-md mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
               <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-black text-red-900 tracking-tight">ACTION REQUIRED</h3>
               </div>
               <p className="text-red-800 font-medium mb-6 text-lg leading-snug">
                 Your physiological risk has crossed the 75% critical threshold. Stop drinking alcohol to prevent an AIB. Execute your harm reduction plan:
               </p>
               <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-red-100">
                     <Utensils className="w-6 h-6 text-red-600 flex-shrink-0"/> <span className="font-bold text-slate-800">Switch to water and eat immediately.</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-red-100">
                     <Users className="w-6 h-6 text-red-600 flex-shrink-0"/> <span className="font-bold text-slate-800">Locate and stay with your trusted friends.</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-red-100">
                     <Car className="w-6 h-6 text-red-600 flex-shrink-0"/> <span className="font-bold text-slate-800">Confirm your safe ride home.</span>
                  </div>
               </div>
            </div>
          )}

          {!isCriticalRisk && (
            <div className="mb-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Specific Drinks</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(DRINK_TYPES).map(([key, drink]) => (
                    <button key={key} onClick={() => addDrink(key)} className="flex flex-col items-center justify-center rounded-xl p-3 border border-slate-200 hover:scale-105 transition-transform active:scale-95" style={{ background: drink.bgColor }}>
                      <div className="font-semibold text-slate-900 text-sm mb-1">{drink.label}</div>
                      <div className="text-xs text-slate-500 font-medium">{drink.standardDrinks}x</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEW: Custom Drink Logger */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-700">Add Custom Drink</h3>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vol (oz)</label>
                    <input type="number" step="0.5" value={customOz} onChange={(e) => setCustomOz(Number(e.target.value))} className="w-full p-2 rounded border border-slate-300 outline-none focus:border-indigo-500 font-medium"/>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ABV (%)</label>
                    <input type="number" step="0.5" value={customAbv} onChange={(e) => setCustomAbv(Number(e.target.value))} className="w-full p-2 rounded border border-slate-300 outline-none focus:border-indigo-500 font-medium"/>
                  </div>
                  <button onClick={addCustomDrink} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 active:scale-95 transition-transform">
                    Add
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 mt-6 md:mt-0">
            <Clock className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-bold text-slate-900">Tonight's log</h2>
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{log.length}</span>
          </div>

          {log.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Droplets className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <div className="text-slate-400 text-sm">No drinks logged yet</div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {[...log].reverse().map((entry, i) => {
                const drink = entry.type === 'custom' ? null : DRINK_TYPES[entry.type];
                return (
                  <div key={entry.id} className={`flex items-center justify-between px-4 py-3 ${i < log.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: drink?.color || '#4f46e5' }} />
                      <div>
                        {/* Dynamic label to support the custom text */}
                        <div className="text-sm font-semibold text-slate-900">{entry.label || drink?.label}</div>
                        <div className="text-xs text-slate-400">{entry.standardDrinks.toFixed(1)} std drinks</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{formatTime(entry.time)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {probability >= 0.30 && (
            <div className="mt-4 space-y-2">
              <a href="tel:+15307523222" className="flex items-center gap-3 bg-blue-600 text-white rounded-xl px-4 py-3 hover:bg-blue-700 transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">Call SafeRide</div>
                  <div className="text-xs text-blue-200">+1-530-752-3222</div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}