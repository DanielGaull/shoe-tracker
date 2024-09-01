import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoeList from './pages/ShoeList/ShoeList.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoeList />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
