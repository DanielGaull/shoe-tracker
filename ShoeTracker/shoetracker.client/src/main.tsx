import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ShoeList from './pages/ShoeList/ShoeList.tsx';
import EditShoe from './pages/ModifyShoe/EditShoe.tsx';

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
    path: '/edit-shot/:shoeId',
    element: <EditShoe />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
