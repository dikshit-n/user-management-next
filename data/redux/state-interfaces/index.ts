// interfaces for the redux initial state

import { rootReducer } from "../../../../redux";

// interface for root redux state
export type ROOT_STATE = ReturnType<typeof rootReducer>;

export * from "./auth";
