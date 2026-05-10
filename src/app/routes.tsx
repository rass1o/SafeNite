import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { BaselinePage } from './pages/BaselinePage';
import { DrinkTrackerPage } from './pages/DrinkTrackerPage';
import { SupportPage } from './pages/SupportPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'research', Component: ResearchPage },
      { path: 'baseline', Component: BaselinePage },
      { path: 'tracker', Component: DrinkTrackerPage },
      { path: 'support', Component: SupportPage },
    ],
  },
]);
