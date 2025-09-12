import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import VedaGlobal from "./VedaGlobal";
import Product_details from "./view/product_details";
import Admin_panel from "./view/admin_panel";

const routes = createBrowserRouter([
  {
    path:"/",
    element:<VedaGlobal/>
  },
  {
    path:"product/:id",
    element:<Product_details/>
  },
  {
    path:'admin',
    element:<Admin_panel/>
  }
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);
