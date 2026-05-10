import { RouterProvider } from 'react-router';
import { router } from './routes';

export interface ProfileData {
  weight: number;
  sex: 'male' | 'female';
  // Notice we completely removed tolerance and blackoutHistory here!
}

export interface DrinkPlan {
  duration: number;
  standardBeer: number;
  craftIPA: number;
  shotLiquor: number;
  customDrinkCount: number; 
  customDrinkABV: number;   
  customDrinkOz: number;    
}

export default function App() {
  return <RouterProvider router={router} />;
}