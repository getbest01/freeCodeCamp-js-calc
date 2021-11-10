import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import App from "./App";

//reducer
const reducer = (state = "0", action) => {
  const lastState = state.substr(-1);
  const regExpLastString = RegExp("[+/*.-]");
  const regExpDot = RegExp("\\.", "g");
  const regExLastDigitIndex = RegExp("\\d(?!.*\\d)", "g");

  switch (action.type) {
    case "clear":
      return "0";
    case "=":
      return eval(
        lastState.search(regExpLastString) < 0 ? state : state.slice(0, -1)
      ).toString();
    case "+":
    case "/":
    case "*":
      if (lastState.search(regExpLastString) >= 0) {
        return (
          state.slice(0, state.search(regExLastDigitIndex) + 1) + action.type
        );
      } else {
        return state + action.type;
      }
    case "-":
      if (lastState.search(regExpLastString) >= 1) {
        return state.slice(0, -1) + action.type;
      } else {
        return state + action.type;
      }

    case ".":
      if (lastState.search(regExpLastString) >= 0) {
        return state.slice(0, -1) + action.payload;
      } else {
        const lastSignIndex = ["+", "-", "*", "/"]
          .map((sign) => state.lastIndexOf(sign))
          .reduce((acc, curr) => (acc > curr ? acc : curr));
        if (
          state.slice(lastSignIndex < 0 ? 0 : lastSignIndex).match(regExpDot) &&
          state.slice(lastSignIndex < 0 ? 0 : lastSignIndex).match(regExpDot)
            .length >= 1
        ) {
          return state;
        } else {
          return state + action.type;
        }
      }
    default:
      return (
        (state === "0" ? "" : state) +
        (action.payload !== undefined ? action.payload : "")
      );
  }
};

//action
const send = (inputKey) => {
  return {
    type: inputKey,
    payload: inputKey,
  };
};
//store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const handleClick = (e) => {
  store.dispatch(send(e.target.value));
};
//subscriber
store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App handleClick={handleClick} />
  </Provider>,
  document.getElementById("root")
);
