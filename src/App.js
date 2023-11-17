
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Game from './pages/game/Game';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import React from 'react';
import Instructions from './pages/instructions/Instructions';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
   
    {
      path: "/game",
      element: <Game/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/instructions",
      element: <Instructions/>,
    },
  ]);
  
  return (
    <div className="app">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
