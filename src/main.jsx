import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';

import PizzaProvider from "./context/PizzaContext.jsx";

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PizzaProvider>
        <App />
        <ToastContainer />
      </PizzaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
