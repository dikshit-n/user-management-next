import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ROOT_STATE } from "../../data";

export const useTypedSelector: TypedUseSelectorHook<ROOT_STATE> = useSelector;
