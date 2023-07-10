import "./styles/styles.pcss";
import { initApp } from "./services/initApp";
import { initRouter } from "./core/router";
import { store } from "./core/store";

window.addEventListener("DOMContentLoaded", async () => {
  store.on("changed", (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      initRouter(store);
    }
    console.log(
      "%cstore updated",
      "background: #222; color: #bada55",
      nextState
    );
  });

  store.dispatch(initApp);
});
