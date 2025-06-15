import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css';
// import { WalletProvider } from './providers/WalletProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
