import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { WalletProvider } from './providers/WalletProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <WalletProvider> */}
  
    <App />
  
    {/* </WalletProvider> */}
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
