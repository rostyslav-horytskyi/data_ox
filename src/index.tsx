import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from './components/App';
import { AppProvider } from "./components/AppContext/AppContext";
import store from "./store";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
