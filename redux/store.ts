import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

var updatedStore: any = undefined;

export const store = {
  // create store
  configureStore: () => {
    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
    updatedStore = store;
    return store;
  },

  // helper function to get the current store in any js/ts file (out of a react component)
  getStore: () => updatedStore?.getState() || {},
};

export const wrapper = createWrapper(store.configureStore);
