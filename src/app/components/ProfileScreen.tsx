import { ProfileData } from '../App';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';

interface ProfileScreenProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onNext: () => void;
}

export function ProfileScreen({ data, onChange, onNext }: ProfileScreenProps) {
  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="p-6 bg-blue-600 text-white">
        <h1 className="text-2xl">Your Profile</h1>
        <p className="text-sm text-blue-100 mt-1">Tell us about your baseline</p>
      </div>

      <div className="flex-1 p-6 space-y-8">
        {/* Weight Slider */}
        <div>
          <label className="block text-sm mb-3">
            Weight: <span className="font-semibold">{data.weight} lbs</span>
          </label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-12"
            value={[data.weight]}
            onValueChange={([value]) => onChange({ ...data, weight: value })}
            min={100}
            max={300}
            step={5}
          >
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-3">
              <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-8 h-8 bg-white border-4 border-blue-600 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200" />
          </Slider.Root>
        </div>

        {/* Sex Toggle */}
        <div>
          <label className="block text-sm mb-3">Sex</label>
          <div className="flex gap-3">
            <button
              onClick={() => onChange({ ...data, sex: 'male' })}
              className={`flex-1 py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
                data.sex === 'male'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => onChange({ ...data, sex: 'female' })}
              className={`flex-1 py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
                data.sex === 'female'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Tolerance Slider */}
        <div>
          <label className="block text-sm mb-3">
            Days drank heavily this month: <span className="font-semibold">{data.tolerance}</span>
          </label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-12"
            value={[data.tolerance]}
            onValueChange={([value]) => onChange({ ...data, tolerance: value })}
            min={0}
            max={30}
            step={1}
          >
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-3">
              <Slider.Range className="absolute bg-orange-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-8 h-8 bg-white border-4 border-orange-600 rounded-full shadow-lg hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-200" />
          </Slider.Root>
        </div>

        {/* Blackout History Toggle */}
        <div>
          <label className="block text-sm mb-3">Blacked out in the past 6 months?</label>
          <div className="flex gap-3">
            <button
              onClick={() => onChange({ ...data, blackoutHistory: false })}
              className={`flex-1 py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
                !data.blackoutHistory
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              No
            </button>
            <button
              onClick={() => onChange({ ...data, blackoutHistory: true })}
              className={`flex-1 py-4 px-6 rounded-lg text-lg font-semibold transition-all ${
                data.blackoutHistory
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 p-6 border-t border-slate-200 bg-white max-w-[480px] mx-auto md:static md:max-w-none md:mt-auto">
        <button
          onClick={onNext}
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Continue to Pre-Game Plan
        </button>
      </div>
    </div>
  );
}
