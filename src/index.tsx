import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// LOCAL
import App from "./components/app/app";
import "./index.css";
import { rootReducer } from "./services/reducers/index";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
