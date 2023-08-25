import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import "./styles/index.css";
import App from "./pages/App";
import reducer from "./reducers";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Printer from "./pages/Printer";
import ErrorPage from "./pages/ErrorPage";

const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
