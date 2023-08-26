import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";

import "./styles/index.css";
import App from "./pages/App";
import reducer from "./reducers";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Printer from "./pages/Printer";
import ErrorPage from "./pages/ErrorPage";

const localStorageSaver =
  (store: any) => (next: Function) => (action: { type: string }) => {
    let result = next(action);

    if (action.type.startsWith("puzzle")) {
      localStorage.setItem(
        "puzzles",
        JSON.stringify(store.getState().puzzle.present.puzzles)
      );
    }

    return result;
  };

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(localStorageSaver))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/print",
    element: <Printer />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
