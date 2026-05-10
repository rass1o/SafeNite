import { useState } from 'react';
import { useNavigate } from 'react-router'; // ADDED
import { ProfileScreen } from '../components/ProfileScreen';
import { PreGameScreen } from '../components/PreGameScreen';
import { ResultsScreen } from '../components/ResultsScreen';
import { FrontLoadModal } from '../components/FrontLoadModal';
import { ChecklistPage } from '../pages/ChecklistPage';
import { ProfileData, DrinkPlan } from '../App';

export function BaselinePage() {
  const navigate = useNavigate(); // ADDED
  const [screen, setScreen] = useState<'checklist' | 'profile' | 'pregame' | 'results'>('checklist');
  const [checklistAnswers, setChecklistAnswers] = useState<Record<string, boolean | null>>({});
  const [profileData, setProfileData] = useState<ProfileData & { bingeDays: number }>({
    weight: 150,
    sex: 'male',
    bingeDays: 0, 
  });
  
  const [drinkPlan, setDrinkPlan] = useState<DrinkPlan>({
    duration: 4,
    standardBeer: 0,
    craftIPA: 0,
    shotLiquor: 0,
    soloCup: 0,
  });
  
  const [showFrontLoadModal, setShowFrontLoadModal] = useState(false);
  const [rapidFlag, setRapidFlag] = useState(0);
  const [riskPercentage, setRiskPercentage] = useState(0);

  const calculateTotalStandardDrinks = () => {
    return (
      drinkPlan.standardBeer * 0.8 +
      drinkPlan.craftIPA * 1.9 +
      drinkPlan.shotLiquor * 1.0 +
      drinkPlan.soloCup * 2.0
    );
  };

  const handleCalculate = () => {
    const totalDrinks = calculateTotalStandardDrinks();
    if (totalDrinks >= 3) {
      setShowFrontLoadModal(true);
    } else {
      calculateRisk(0);
    }
  };

  const calculateRisk = (rapidFlagValue: number) => {
    const BETA_0 = -3.641;
    const BETA_1 = 0.106;
    const GAMMA_BAC = 30;
    const PACING_COEF = 0.989;

    const totalDrinks = calculateTotalStandardDrinks();
    const userBingeDays = profileData.bingeDays || 0;
    const weightLbs = profileData.weight;
    const hoursElapsed = drinkPlan.duration;
    const genderConstant = profileData.sex === 'male' ? 0.68 : 0.55;
    
    const userAteFood = checklistAnswers['food'] === true;

    const priorLogOdds = BETA_0 + (BETA_1 * userBingeDays);

    const gramsAlcohol = totalDrinks * 14;
    const weightGrams = weightLbs * 453.592;
    let rawBac = ((gramsAlcohol) / (weightGrams * genderConstant) * 100) - (0.015 * hoursElapsed);

    if (userAteFood) {
      rawBac = rawBac * 0.75;
    }

    const finalBac = Math.max(0, rawBac);
    const acuteLogOdds = (GAMMA_BAC * finalBac) + (PACING_COEF * rapidFlagValue);
    const totalLogOdds = priorLogOdds + acuteLogOdds;
    const probability = 1 / (1 + Math.exp(-totalLogOdds));

    const finalRisk = Math.round(probability * 100);

    setRapidFlag(rapidFlagValue);
    setRiskPercentage(finalRisk);
    setScreen('results');
  };

  const handleFrontLoadResponse = (isFrontLoading: boolean) => {
    setShowFrontLoadModal(false);
    calculateRisk(isFrontLoading ? 1 : 0);
  };

  if (screen === 'checklist') {
    const isChecklistComplete = Object.keys(checklistAnswers).length === 4;

    return (
      <div>
        <ChecklistPage onAnswersChange={setChecklistAnswers} />
        <div className="px-6 pb-8 md:max-w-7xl md:mx-auto">
          <button
            onClick={() => setScreen('profile')}
            disabled={!isChecklistComplete}
            className={`w-full py-4 rounded-lg text-lg font-semibold transition-all shadow-md ${
              isChecklistComplete
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isChecklistComplete ? 'Continue to Risk Assessment →' : 'Complete checklist to continue'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0 md:min-h-screen md:bg-slate-50 md:flex md:items-center md:justify-center">
      <div className="md:w-full md:max-w-[600px] md:bg-white md:shadow-xl md:rounded-lg md:overflow-hidden md:my-8">
        {screen === 'profile' && (
          <ProfileScreen
            data={profileData}
            onChange={setProfileData}
            onNext={() => setScreen('pregame')}
          />
        )}
        {screen === 'pregame' && (
          <PreGameScreen
            data={drinkPlan}
            onChange={setDrinkPlan}
            onBack={() => setScreen('profile')}
            onCalculate={handleCalculate}
            totalDrinks={calculateTotalStandardDrinks()}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            riskPercentage={riskPercentage}
            onReset={() => {
              setScreen('checklist');
              setDrinkPlan({
                duration: 4,
                standardBeer: 0,
                craftIPA: 0,
                shotLiquor: 0,
                soloCup: 0,
              });
              setRapidFlag(0);
              setChecklistAnswers({}); 
            }}
            onStartTracking={() => {
              // Pass the exact Two-Engine state to the locked tracker route
              navigate('/tracker', {
                state: {
                  weightLbs: profileData.weight,
                  sex: profileData.sex,
                  bingeDays: profileData.bingeDays || 0,
                  userAteFood: checklistAnswers['food'] === true
                }
              });
            }}
          />
        )}
        {showFrontLoadModal && (
          <FrontLoadModal
            totalDrinks={calculateTotalStandardDrinks()}
            onResponse={handleFrontLoadResponse}
          />
        )}
      </div>
    </div>
  );
}