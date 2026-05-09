import { RouterProvider } from 'react-router';
import { router } from './routes';

export interface ProfileData {
  weight: number;
  sex: 'male' | 'female';
  tolerance: number;
  blackoutHistory: boolean;
}

export interface DrinkPlan {
  duration: number;
  standardBeer: number;
  craftIPA: number;
  shotLiquor: number;
  soloCup: number;
}

export default function App() {
  return <RouterProvider router={router} />;
}