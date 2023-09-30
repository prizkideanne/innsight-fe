import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./shared/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./shared/context/ModalContext";
import GlobalModal from "./shared/components/GlobalModal";
import ScrollToTop from "./shared/components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Toaster />
            <GlobalModal />
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
