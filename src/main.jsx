import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import {Provider} from 'react-redux';
import store from "./store.js";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
    <App />
    </Provider>
  
 
);
