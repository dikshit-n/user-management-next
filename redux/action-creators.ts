import * as authActions from "./auth/actions";

// store all actions in one variable
const actionCreators = {
  ...authActions,
};

// then export it as single variable
export { actionCreators };
