import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { BaselinePage } from './pages/BaselinePage';
import { SupportPage } from './pages/SupportPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'research', Component: ResearchPage },
      { path: 'baseline', Component: BaselinePage },
      { path: 'support', Component: SupportPage },
    ],
  },
]);
