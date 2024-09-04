import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.tsx';
import ShoeList from './pages/ShoeList/ShoeList.tsx';
import EditShoe from './pages/ModifyShoe/EditShoe.tsx';
import ActivityList from './pages/ActivityList/ActivityList.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShoeList />,
  },
  {
    path: '/create-shoe',
    element: <EditShoe isNew />,
  },
  {
    path: '/edit-shoe/:shoeId',
    element: <EditShoe />,
  },
  {
    path: '/activities',
    element: <ActivityList />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </StrictMode>,
)
