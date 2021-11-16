// interface for the dispatch function in react-redux
export interface dispatch {
  data: { type: string; payload?: any };
}

export * from "./action-types-variables";
export * from "./payload-interfaces";
export * from "./state-interfaces";
