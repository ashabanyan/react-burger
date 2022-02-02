import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// LOCAL
import App from "./components/app/app";
import "./index.css";
import { initStore } from "./redux/store";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
