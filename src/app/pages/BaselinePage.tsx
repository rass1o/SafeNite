import { useState } from 'react';
import { ProfileScreen } from '../components/ProfileScreen';
import { PreGameScreen } from '../components/PreGameScreen';
import { ResultsScreen } from '../components/ResultsScreen';
import { FrontLoadModal } from '../components/FrontLoadModal';
import { ProfileData, DrinkPlan } from '../App';

export function BaselinePage() {
  const [screen, setScreen] = useState<'profile' | 'pregame' | 'results'>('profile');
  const [profileData, setProfileData] = useState<ProfileData>({
    weight: 150,
    sex: 'male',
    tolerance: 0,
    blackoutHistory: false,
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
    const totalDrinks = calculateTotalStandardDrinks();

    // Widmark BAC calculation
    const r = profileData.sex === 'male' ? 0.68 : 0.55;
    const gramsAlcohol = totalDrinks * 14; // 14g per standard drink
    const weightKg = profileData.weight * 0.453592; // lbs to kg

    // Peak BAC
    let peakBAC = (gramsAlcohol / (weightKg * r * 1000)) * 100;

    // Metabolic decay (0.015 BAC/hour)
    const decayedBAC = Math.max(0, peakBAC - drinkPlan.duration * 0.015);

    // Risk calculation with modifiers
    let baseRisk = decayedBAC * 35; // Base conversion to percentage

    // Tolerance penalty
    const tolerancePenalty = (profileData.tolerance / 30) * 15;
    baseRisk += tolerancePenalty;

    // History penalty
    if (profileData.blackoutHistory) {
      baseRisk += 20;
    }

    // Rapid consumption penalty
    if (rapidFlagValue === 1) {
      baseRisk *= 0.916; // The specified penalty weight
    }

    // Cap at 0-100%
    const finalRisk = Math.min(100, Math.max(0, baseRisk));

    setRapidFlag(rapidFlagValue);
    setRiskPercentage(Math.round(finalRisk));
    setScreen('results');
  };

  const handleFrontLoadResponse = (isFrontLoading: boolean) => {
    setShowFrontLoadModal(false);
    calculateRisk(isFrontLoading ? 1 : 0);
  };

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
            setScreen('profile');
            setDrinkPlan({
              duration: 4,
              standardBeer: 0,
              craftIPA: 0,
              shotLiquor: 0,
              soloCup: 0,
            });
            setRapidFlag(0);
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
