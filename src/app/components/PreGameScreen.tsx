import { DrinkPlan } from '../App';
import * as Slider from '@radix-ui/react-slider';
import { Beer, Wine, Flame, Minus, Plus } from 'lucide-react';

interface PreGameScreenProps {
  data: DrinkPlan;
  onChange: (data: DrinkPlan) => void;
  onBack: () => void;
  onCalculate: () => void;
  totalDrinks: number;
}

export function PreGameScreen({ data, onChange, onBack, onCalculate, totalDrinks }: PreGameScreenProps) {
  const updateDrink = (key: keyof DrinkPlan, delta: number) => {
    const newValue = Math.max(0, (data[key] as number) + delta);
    onChange({ ...data, [key]: newValue });
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="p-6 bg-purple-600 text-white">
        <button onClick={onBack} className="text-sm mb-2 hover:underline">← Back</button>
        <h1 className="text-2xl">Your Pre-Game Plan</h1>
        <p className="text-sm text-purple-100 mt-1">How long are you going out for tonight?</p>
      </div>

      <div className="flex-1 p-6 space-y-8">
        <div>
          <label className="block text-sm mb-3">Duration: <span className="font-semibold">{data.duration} hours</span></label>
          <Slider.Root className="relative flex items-center select-none touch-none w-full h-12" value={[data.duration]} onValueChange={([value]) => onChange({ ...data, duration: value })} min={1} max={12} step={1}>
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-3">
              <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-8 h-8 bg-white border-4 border-purple-600 rounded-full shadow-lg hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-200" />
          </Slider.Root>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-lg mb-4">What are you drinking?</h2>
          <div className="space-y-4">
            <DrinkCounter icon={<Beer className="w-6 h-6" />} label="Standard Beer" sublabel="(4.2% ABV)" count={data.standardBeer} onIncrement={() => updateDrink('standardBeer', 1)} onDecrement={() => updateDrink('standardBeer', -1)} color="amber" />
            <DrinkCounter icon={<Beer className="w-6 h-6" />} label="Craft IPA" sublabel="(7.0% ABV)" count={data.craftIPA} onIncrement={() => updateDrink('craftIPA', 1)} onDecrement={() => updateDrink('craftIPA', -1)} color="orange" />
            <DrinkCounter icon={<Wine className="w-6 h-6" />} label="Shot of Liquor" sublabel="(40% ABV)" count={data.shotLiquor} onIncrement={() => updateDrink('shotLiquor', 1)} onDecrement={() => updateDrink('shotLiquor', -1)} color="red" />
            <DrinkCounter icon={<Flame className="w-6 h-6" />} label="Solo Cup Heavy Pour" sublabel="(Mixed drink)" count={data.soloCup} onIncrement={() => updateDrink('soloCup', 1)} onDecrement={() => updateDrink('soloCup', -1)} color="pink" />
          </div>
        </div>

        <div className="bg-slate-100 rounded-lg p-4">
          <div className="text-sm text-slate-600">Total Standard Drinks</div>
          <div className="text-3xl mt-1">{totalDrinks.toFixed(1)}</div>
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 p-6 border-t border-slate-200 bg-white max-w-[480px] mx-auto md:static md:max-w-none md:mt-auto">
        <button onClick={onCalculate} disabled={totalDrinks === 0} className="w-full py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700 active:bg-purple-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
          Calculate Risk
        </button>
      </div>
    </div>
  );
}

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
          <button onClick={onDecrement} disabled={count === 0} className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg active:shadow-sm transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"><Minus className="w-5 h-5" /></button>
          <div className="w-12 text-center text-2xl font-semibold">{count}</div>
          <button onClick={onIncrement} className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg active:shadow-sm transition-shadow flex items-center justify-center"><Plus className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}