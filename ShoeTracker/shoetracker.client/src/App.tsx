import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.tsx';
import ShoeList from './pages/ShoeList/ShoeList.tsx';
import EditShoe from './pages/ModifyShoe/EditShoe.tsx';
import ActivityList from './pages/ActivityList/ActivityList.tsx';
import EditActivity from './pages/ModifyActivity/EditActivity.tsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.tsx';
import AccountCreated from './pages/CreateAccount/AccountCreated.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            {
                path: '/shoes',
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
            {
                path: '/create-activity',
                element: <EditActivity isNew />,
            }
        ]
    },
    {
        path: '/create-account',
        element: <CreateAccount />,
    },
    {
        path: '/account-created',
        element: <AccountCreated />,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
  ]);
  

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
