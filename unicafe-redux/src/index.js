import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterRecuder from "./reducer";

const counterStore = createStore(counterRecuder);

const App = () => {
  return (
    <div>
      <h3>Unicafe</h3>
      <button type="button" onClick={e => counterStore.dispatch({ type: "GOOD" })}>
        Good
      </button>
      <button type="button" onClick={e => counterStore.dispatch({ type: "OK" })}>
        Ok
      </button>
      <button type="button" onClick={e => counterStore.dispatch({ type: "BAD" })}>
        Bad
      </button>
      <button type="button" onClick={e => counterStore.dispatch({ type: "ZERO" })}>
        Reset
      </button>
      <br />
      Good: {counterStore.getState().good}
      <br />
      Ok: {counterStore.getState().ok}
      <br />
      Bad: {counterStore.getState().bad}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const RenderApp = () => {
    root.render(<App />)
}

RenderApp();

counterStore.subscribe(RenderApp);
