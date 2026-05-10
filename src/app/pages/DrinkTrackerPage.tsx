import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Plus, Minus, Phone, Clock, Droplets, Utensils, Users, Car, ShieldAlert, FlaskConical, Trash2 } from 'lucide-react';

interface DrinkEntry {
  id: string;
  type: string;
  standardDrinks: number;
  time: Date;
  label?: string;
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

  // 1. LocalStorage for Engine State (fixes refresh bug)
  const [engineState, setEngineState] = useState<{ weightLbs: number, sex: string, bingeDays: number, userAteFood: boolean } | null>(() => {
    if (location.state) {
      localStorage.setItem('safenite_engine', JSON.stringify(location.state));
      return location.state;
    }
    const saved = localStorage.getItem('safenite_engine');
    if (saved) return JSON.parse(saved);
    return null;
  });

  // 2. LocalStorage for Session Start (keeps the timer accurate after refresh)
  const [sessionStart] = useState<Date>(() => {
    const saved = localStorage.getItem('safenite_start');
    if (saved) return new Date(saved);
    const now = new Date();
    localStorage.setItem('safenite_start', now.toISOString());
    return now;
  });

  const [now, setNow] = useState<Date>(new Date());
  
  // 3. LocalStorage for the Drink Log
  const [log, setLog] = useState<DrinkEntry[]>(() => {
    const saved = localStorage.getItem('safenite_log');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((e: any) => ({ ...e, time: new Date(e.time) }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [customOz, setCustomOz] = useState<number>(12);
  const [customAbv, setCustomAbv] = useState<number>(5.0);

  // Sync log to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('safenite_log', JSON.stringify(log));
  }, [log]);

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
  
  // NEW: Function to clear local storage and end the session safely
  const handleEndSession = () => {
    if(window.confirm("Are you sure you want to end your night? This will clear your live tracker history.")) {
      localStorage.removeItem('safenite_engine');
      localStorage.removeItem('safenite_start');
      localStorage.removeItem('safenite_log');
      navigate('/baseline');
    }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const timeUntilSober = Math.ceil(bac / 0.015);

  return (
    <div className="min-h-screen bg-slate-100 pb-24 md:pb-8">
      
      {/* Header */}
      <div className="bg-slate-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Live coach</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Real-time Risk</h1>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xs mb-1 font-semibold uppercase tracking-wider">Session started</div>
              <div className="text-white font-bold">{formatTime(sessionStart)}</div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 md:grid md:grid-cols-3 md:gap-8 md:items-center">
            <div className="md:col-span-2">
              <div className="text-slate-400 text-xs mb-2 font-bold uppercase tracking-wider">Physiological Probability</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl md:text-7xl font-black tracking-tighter" style={{ color: status.color }}>
                  {Math.round(probability * 100)}%
                </span>
                <span className="text-slate-400 text-lg font-medium">AIB Risk</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: status.color }}></div>
                <span className="font-bold tracking-wide" style={{ color: status.color }}>{status.label}</span>
              </div>
              <div className="bg-slate-800 rounded-full h-3 mb-2 max-w-md overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(status.pct, 100)}%`, background: status.color }}
                />
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-4 mt-6 md:mt-0">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-inner">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total drinks</div>
                <div className="text-white text-3xl font-black">{totalStandardDrinks.toFixed(1)}</div>
                <div className="text-slate-500 text-xs font-medium mt-1">standard equivalent</div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-inner">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Sober in ~</div>
                <div className="text-white text-3xl font-black">{bac > 0 ? timeUntilSober : 0}<span className="text-xl">h</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 md:grid md:grid-cols-2 md:gap-10">
        <div>
          {/* THE BIG BUTTON UI */}
          {!isCriticalRisk ? (
            <div className="mb-10">
               <button onClick={() => addDrink('beer')} className="w-full py-8 md:py-12 bg-blue-600 text-white rounded-3xl shadow-[0_8px_30px_rgb(37,99,235,0.3)] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 border border-blue-500 hover:bg-blue-700">
                 <Plus className="w-12 h-12 mb-1" />
                 <span className="text-3xl font-black tracking-tight">Quick Add Drink</span>
                 <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Standard 1.0 Equivalent</span>
               </button>
               {log.length > 0 && (
                 <div className="flex justify-end mt-4">
                   <button onClick={removeLast} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                     <Minus className="w-4 h-4" /> Undo last entry
                   </button>
                 </div>
               )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 md:p-8 shadow-lg mb-10 animate-in slide-in-from-bottom-4 fade-in duration-500 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
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
            <div className="mb-6 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Specific Drinks</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(DRINK_TYPES).map(([key, drink]) => (
                    <button key={key} onClick={() => addDrink(key)} className="flex flex-col items-center justify-center rounded-2xl p-4 border border-slate-200 hover:shadow-md transition-all active:scale-95 bg-white" style={{ borderLeftColor: drink.color, borderLeftWidth: '4px' }}>
                      <div className="font-bold text-slate-900 text-sm mb-1">{drink.label}</div>
                      <div className="text-xs text-slate-500 font-bold uppercase">{drink.standardDrinks}x std</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Drink Logger */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">Add Custom Drink</h3>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Vol (oz)</label>
                    <input type="number" step="0.5" value={customOz} onChange={(e) => setCustomOz(Number(e.target.value))} className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-bold text-slate-800 bg-slate-50 transition-all"/>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ABV (%)</label>
                    <input type="number" step="1" value={customAbv} onChange={(e) => setCustomAbv(Number(e.target.value))} className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-bold text-slate-800 bg-slate-50 transition-all"/>
                  </div>
                  <button onClick={addCustomDrink} className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm">
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5 mt-8 md:mt-0">
            <Clock className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-bold text-slate-900">Tonight's log</h2>
            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">{log.length}</span>
          </div>

          {log.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-slate-300" />
              </div>
              <div className="text-slate-500 font-medium">No drinks logged yet.<br/>Your night starts here.</div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              {[...log].reverse().map((entry, i) => {
                const drink = entry.type === 'custom' ? null : DRINK_TYPES[entry.type];
                return (
                  <div key={entry.id} className={`flex items-center justify-between px-5 py-4 ${i < log.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors`}>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ background: drink?.color || '#4f46e5' }} />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{entry.label || drink?.label}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{entry.standardDrinks.toFixed(1)} std drinks</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{formatTime(entry.time)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {probability >= 0.30 && (
            <div className="space-y-3 mb-8">
              <a href="tel:+15307523222" className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 hover:bg-amber-100 transition-colors group">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-900">Call UC Davis SafeRide</div>
                  <div className="text-xs font-semibold text-amber-700 mt-0.5">+1-530-752-3222</div>
                </div>
              </a>
            </div>
          )}

          {/* NEW: End Session Button */}
          <div className="pt-6 border-t border-slate-200">
             <button onClick={handleEndSession} className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-xl font-bold hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all">
                <Trash2 className="w-5 h-5" />
                End Night & Clear Data
             </button>
             <p className="text-center text-xs text-slate-400 font-medium mt-3 px-4">
               Ending your night will clear your active BAC calculation and drink log from your device.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}