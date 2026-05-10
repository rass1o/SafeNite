import { AlertTriangle } from 'lucide-react';

interface FrontLoadModalProps {
  totalDrinks: number;
  onResponse: (isFrontLoading: boolean) => void;
}

export function FrontLoadModal({ totalDrinks, onResponse }: FrontLoadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 md:px-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 md:p-10 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
          </div>

          <h2 className="text-2xl md:text-3xl mb-4">Wait.</h2>

          <p className="text-slate-700 mb-6 text-lg md:text-xl">
            You planned{' '}
            <span className="font-semibold text-orange-600">{totalDrinks.toFixed(1)} standard drinks</span>.
          </p>

          <p className="text-slate-700 md:text-lg mb-8">
            Are you <span className="font-semibold">front-loading</span>?
            <br />
            <span className="text-sm md:text-base text-slate-500">
              (Planning to consume all of this in your first hour?)
            </span>
          </p>

          <div className="flex gap-3 w-full">
            <button onClick={() => onResponse(false)} className="flex-1 py-4 px-6 rounded-lg text-lg md:text-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 transition-colors">
              No
            </button>
            <button onClick={() => onResponse(true)} className="flex-1 py-4 px-6 rounded-lg text-lg md:text-xl font-semibold bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 transition-colors">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}