import { useState } from 'react';
import { DrinkPlan } from '../App';
import * as Slider from '@radix-ui/react-slider';
import { Beer, Wine, Minus, Plus, FlaskConical } from 'lucide-react';

interface DrinkCounterProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  color: 'amber' | 'orange' | 'red' | 'pink';
}

function DrinkCounter({ icon, label, sublabel, count, onIncrement, onDecrement, color }: DrinkCounterProps) {
  const colorClasses = {
    amber: 'bg-amber-100 text-amber-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
    pink: 'bg-pink-100 text-pink-700',
  };

  const safeCount = typeof count === 'number' && !isNaN(count) ? count : 0;

  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>{icon}</div>
          <div>
            <div className="font-semibold">{label}</div>
            <div className="text-sm opacity-80">{sublabel}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onDecrement} disabled={safeCount === 0} className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg active:shadow-sm transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"><Minus className="w-5 h-5" /></button>
          <div className="w-12 text-center text-2xl font-semibold">{safeCount}</div>
          <button onClick={onIncrement} className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg active:shadow-sm transition-shadow flex items-center justify-center"><Plus className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}

interface PreGameScreenProps {
  data: DrinkPlan;
  onChange: (data: DrinkPlan) => void;
  onBack: () => void;
  onCalculate: () => void;
  totalDrinks: number;
}

export function PreGameScreen({ data, onChange, onBack, onCalculate, totalDrinks }: PreGameScreenProps) {
  
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  const updateDrink = (key: keyof DrinkPlan, delta: number) => {
    const currentValue = typeof data[key] === 'number' && !isNaN(data[key] as number) ? (data[key] as number) : 0;
    const newValue = Math.max(0, currentValue + delta);
    onChange({ ...data, [key]: newValue });
  };

  const safeCustomCount = typeof data.customDrinkCount === 'number' && !isNaN(data.customDrinkCount) ? data.customDrinkCount : 0;
  const safeCustomOz = typeof data.customDrinkOz === 'number' && !isNaN(data.customDrinkOz) ? data.customDrinkOz : 12;
  const safeCustomAbv = typeof data.customDrinkABV === 'number' && !isNaN(data.customDrinkABV) ? data.customDrinkABV : 5;

  return (
    <div className="flex flex-col min-h-screen pb-[180px] md:pb-8">
      
      {/* FIXED: Replaced dark purple with a light purple background and dark text to guarantee visibility */}
      <div className="p-6 bg-purple-50 border-b border-purple-100">
        <button onClick={onBack} className="text-sm mb-2 text-purple-600 hover:text-purple-800 font-bold transition-colors">← Back</button>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Pre-Game Plan</h1>
        <p className="text-sm text-slate-600 mt-1 font-medium">How long are you going out for tonight?</p>
      </div>

      <div className="flex-1 p-6 space-y-8">
        <div>
          <label className="block text-sm mb-3 font-semibold text-slate-700 uppercase tracking-wide">Duration: <span className="text-purple-600">{data.duration} hours</span></label>
          <Slider.Root className="relative flex items-center select-none touch-none w-full h-12" value={[data.duration]} onValueChange={([value]) => onChange({ ...data, duration: value })} min={1} max={12} step={1}>
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-3">
              <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-8 h-8 bg-white border-4 border-purple-600 rounded-full shadow-lg hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all cursor-grab active:cursor-grabbing" />
          </Slider.Root>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-lg mb-4 font-bold text-slate-900">What are you drinking?</h2>
          <div className="space-y-4">
            <DrinkCounter icon={<Beer className="w-6 h-6" />} label="Standard Beer" sublabel="(4.2% ABV)" count={data.standardBeer} onIncrement={() => updateDrink('standardBeer', 1)} onDecrement={() => updateDrink('standardBeer', -1)} color="amber" />
            <DrinkCounter icon={<Beer className="w-6 h-6" />} label="Craft IPA" sublabel="(7.0% ABV)" count={data.craftIPA} onIncrement={() => updateDrink('craftIPA', 1)} onDecrement={() => updateDrink('craftIPA', -1)} color="orange" />
            <DrinkCounter icon={<Wine className="w-6 h-6" />} label="Shot of Liquor" sublabel="(40% ABV)" count={data.shotLiquor} onIncrement={() => updateDrink('shotLiquor', 1)} onDecrement={() => updateDrink('shotLiquor', -1)} color="red" />
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-indigo-600"><FlaskConical className="w-6 h-6" /></div>
                  <div>
                    <div className="font-semibold text-slate-900">Custom Drink</div>
                    <div className="text-sm opacity-80 text-slate-500">Set ABV & Volume</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateDrink('customDrinkCount', -1)} disabled={safeCustomCount === 0} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"><Minus className="w-5 h-5" /></button>
                  <div className="w-12 text-center text-2xl font-semibold">{safeCustomCount}</div>
                  <button onClick={() => updateDrink('customDrinkCount', 1)} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"><Plus className="w-5 h-5" /></button>
                </div>
              </div>

              {safeCustomCount > 0 && (
                <div className="flex gap-4 pt-4 mt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Volume (oz)</label>
                    <input type="number" min="1" step="0.5" value={safeCustomOz} onChange={(e) => onChange({ ...data, customDrinkOz: Number(e.target.value) })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">ABV (%)</label>
                    <input type="number" min="1" step="1" value={safeCustomAbv} onChange={(e) => onChange({ ...data, customDrinkABV: Number(e.target.value) })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-100 border border-slate-200 rounded-lg p-5">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Standard Drinks</div>
          <div className="text-4xl font-black text-slate-800 tracking-tight">{(typeof totalDrinks === 'number' && !isNaN(totalDrinks) ? totalDrinks : 0).toFixed(1)}</div>
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 p-6 border-t border-slate-200 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] max-w-[480px] mx-auto md:static md:max-w-none md:mt-auto md:shadow-none md:bg-transparent md:border-none md:p-0 md:px-6">
        
        {/* FIXED: Native HTML Checkbox for perfect clickability */}
        <label className="flex items-start gap-3 mb-4 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedDisclaimer}
            onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
            className="w-6 h-6 shrink-0 mt-0.5 cursor-pointer accent-purple-600"
          />
          <span className="text-xs text-slate-500 leading-relaxed font-medium select-none group-hover:text-slate-700 transition-colors">
            <strong className="text-slate-700">Medical Disclaimer:</strong> I understand SafeNite provides risk estimates based on population averages and pharmacokinetics, not specific medical advice. I am responsible for my own choices and physical safety.
          </span>
        </label>

        <button 
          onClick={onCalculate} 
          disabled={!totalDrinks || totalDrinks === 0 || !acceptedDisclaimer} 
          className="w-full py-4 bg-purple-700 text-white text-lg font-bold rounded-xl shadow-md hover:bg-purple-800 active:scale-95 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100"
        >
          Calculate Risk
        </button>
      </div>
    </div>
  );
}