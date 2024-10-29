import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer, { filterReducer } from "./reducers/anecdoteReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { store } from "./reducers/store";

// const store = configureStore({
//   reducer: {
//     notes: reducer,
//     filter: filterReducer,
//   },
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
