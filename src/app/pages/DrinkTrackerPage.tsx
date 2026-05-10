import { useState, useEffect } from 'react';
import { Plus, Minus, Phone, AlertTriangle, Clock, Droplets, TrendingUp } from 'lucide-react';

interface DrinkEntry {
  id: string;
  type: string;
  standardDrinks: number;
  time: Date;
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
  soloCup: { label: 'Solo cup', standardDrinks: 2.0, color: '#d97706', bgColor: '#fffbeb' },
  wine: { label: 'Wine', standardDrinks: 1.0, color: '#9d174d', bgColor: '#fdf2f8' },
  cocktail: { label: 'Cocktail', standardDrinks: 1.5, color: '#0f766e', bgColor: '#f0fdfa' },
};

interface TrackerProps {
  weightLbs?: number;
  sex?: 'male' | 'female';
  startTime?: Date;
}

export function DrinkTrackerPage({ weightLbs = 150, sex = 'male', startTime }: TrackerProps) {
  const [log, setLog] = useState<DrinkEntry[]>([]);
  const [sessionStart] = useState<Date>(startTime ?? new Date());
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hoursElapsed = (now.getTime() - sessionStart.getTime()) / 3600000;

  const totalStandardDrinks = log.reduce((sum, e) => sum + e.standardDrinks, 0);

  const calculateBAC = () => {
    const r = sex === 'male' ? 0.68 : 0.55;
    const weightKg = weightLbs * 0.453592;
    const gramsAlcohol = totalStandardDrinks * 14;
    const peakBAC = (gramsAlcohol / (weightKg * r * 1000)) * 100;
    return Math.max(0, peakBAC - hoursElapsed * 0.015);
  };

  const bac = calculateBAC();

  const getBACStatus = () => {
    if (bac < 0.04) return { label: 'Feeling good', color: '#16a34a', bg: '#f0fdf4', bar: '#16a34a', pct: (bac / 0.15) * 100 };
    if (bac < 0.08) return { label: 'Mild impairment', color: '#d97706', bg: '#fffbeb', bar: '#d97706', pct: (bac / 0.15) * 100 };
    if (bac < 0.15) return { label: 'Above legal limit', color: '#ea580c', bg: '#fff7ed', bar: '#ea580c', pct: (bac / 0.15) * 100 };
    return { label: 'Blackout territory', color: '#dc2626', bg: '#fef2f2', bar: '#dc2626', pct: 100 };
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

  const removeLast = () => setLog(prev => prev.slice(0, -1));

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  const timeUntilSober = Math.ceil(bac / 0.015);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">

      {/* Desktop header / Mobile compact header */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Live tracker</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold">Tonight's count</h1>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xs mb-1">Session started</div>
              <div className="text-white font-semibold">{formatTime(sessionStart)}</div>
            </div>
          </div>

          {/* BAC Display */}
          <div className="mt-6 md:mt-8 md:grid md:grid-cols-3 md:gap-6 md:items-center">
            <div className="md:col-span-2">
              <div className="text-slate-400 text-xs mb-2 uppercase tracking-wide">Estimated BAC</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl md:text-7xl font-bold" style={{ color: status.color }}>
                  {bac.toFixed(2)}
                </span>
                <span className="text-slate-400 text-lg">g/dL</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: status.color }}></div>
                <span className="font-semibold" style={{ color: status.color }}>{status.label}</span>
              </div>
              {/* BAC bar */}
              <div className="bg-slate-700 rounded-full h-3 mb-2 max-w-md">
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(status.pct, 100)}%`, background: status.color }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 max-w-md">
                <span>0.00</span>
                <span className="text-amber-400">0.08 legal limit</span>
                <span className="text-red-400">0.15+</span>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex flex-col gap-3 mt-6 md:mt-0">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-slate-400 text-xs mb-1">Total drinks</div>
                <div className="text-white text-2xl font-bold">{totalStandardDrinks.toFixed(1)}</div>
                <div className="text-slate-500 text-xs">standard drinks</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="text-slate-400 text-xs mb-1">Sober in ~</div>
                <div className="text-white text-2xl font-bold">{bac > 0 ? timeUntilSober : 0}h</div>
                <div className="text-slate-500 text-xs">at 0.015/hr metabolism</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning banner */}
      {bac >= 0.08 && (
        <div className={`${bac >= 0.15 ? 'bg-red-600' : 'bg-amber-500'} text-white px-6 py-3`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">
                {bac >= 0.15
                  ? 'Stop drinking now — you are at high risk of blackout'
                  : 'You are above the legal driving limit — do not drive'}
              </span>
            </div>
            <a href="tel:+15307523222"
              className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-white/30 transition-colors flex-shrink-0 ml-4">
              <Phone className="w-4 h-4" />
              SafeRide
            </a>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-6 md:grid md:grid-cols-2 md:gap-8">

        {/* Add drinks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Add a drink</h2>
            {log.length > 0 && (
              <button onClick={removeLast}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors">
                <Minus className="w-4 h-4" />
                Undo last
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(DRINK_TYPES).map(([key, drink]) => (
              <button
                key={key}
                onClick={() => addDrink(key)}
                className="flex items-center justify-between rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:scale-[1.02] transition-all active:scale-95 text-left"
                style={{ background: drink.bgColor }}
              >
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{drink.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{drink.standardDrinks} std drinks</div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: drink.color }}>
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </button>
            ))}
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 md:hidden">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-slate-400 text-xs mb-1">Total drinks</div>
              <div className="text-slate-900 text-2xl font-bold">{totalStandardDrinks.toFixed(1)}</div>
              <div className="text-slate-400 text-xs">standard drinks</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-slate-400 text-xs mb-1">Sober in ~</div>
              <div className="text-slate-900 text-2xl font-bold">{bac > 0 ? timeUntilSober : 0}h</div>
              <div className="text-slate-400 text-xs">estimated</div>
            </div>
          </div>

          {/* Harm reduction tip */}
          <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-900 font-semibold text-sm mb-1">Harm reduction tip</div>
                <div className="text-blue-800 text-xs leading-relaxed">
                  {bac < 0.04
                    ? 'Drink one glass of water between each alcoholic drink to slow absorption.'
                    : bac < 0.08
                    ? 'Consider switching to water for the next hour to let your BAC drop.'
                    : bac < 0.15
                    ? 'You are above the legal limit. Stop drinking and hydrate with water.'
                    : 'Stop drinking immediately. Eat food, drink water, and stay with trusted friends.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drink log */}
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
              <div className="text-slate-300 text-xs mt-1">Tap a drink above to start tracking</div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {[...log].reverse().map((entry, i) => {
                const drink = DRINK_TYPES[entry.type];
                return (
                  <div key={entry.id}
                    className={`flex items-center justify-between px-4 py-3 ${i < log.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: drink.color }} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{drink.label}</div>
                        <div className="text-xs text-slate-400">{entry.standardDrinks} std drinks</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{formatTime(entry.time)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Emergency contacts */}
          {bac >= 0.08 && (
            <div className="mt-4 space-y-2">
              <a href="tel:+15307523222"
                className="flex items-center gap-3 bg-blue-600 text-white rounded-xl px-4 py-3 hover:bg-blue-700 transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">Call SafeRide</div>
                  <div className="text-xs text-blue-200">+1-530-752-3222</div>
                </div>
              </a>
              <a href="tel:988"
                className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 hover:bg-red-100 transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">Crisis line: 988</div>
                  <div className="text-xs text-red-500">24/7 support available</div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}