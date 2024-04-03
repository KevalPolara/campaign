import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import CampaignDetails from "./components/CampaignDetails";
import CampaignForm from "./components/CampaignForm";
import CapaignOwner from "./components/CampaignOwner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/campaign_owner" element={<CapaignOwner />} />
      <Route path="/create_campaign" element={<CampaignForm />}></Route>
      <Route path="/campaign_details" element={<CampaignDetails />}></Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
