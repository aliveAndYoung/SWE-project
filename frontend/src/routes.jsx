import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SearchFlights from './pages/SearchFlights';
import Account from './pages/Account';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search-flights', element: <SearchFlights /> },
      { path: 'account', element: <Account /> },
    ],
  },
]);

export default router; 