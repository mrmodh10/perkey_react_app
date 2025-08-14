import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createHashRouter, createRoutesFromElements , Route , RouterProvider } from 'react-router-dom';
import Verified from './components/VerifiedScreen';
import Home from './components/LoadingScreen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const route = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path="/Verified" element={<Verified />} />
      <Route path="/" element={<Home />} />
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);