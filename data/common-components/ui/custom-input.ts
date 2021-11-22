import {
  InputProps,
  ReactElement,
  InputLabelProps,
  FormControlProps,
} from "../../predefined-interfaces";

export interface CUSTOM_INPUT_PROPS extends InputProps {
  containerProps?: FormControlProps;
  labelProps?: InputLabelProps;
  label?: string | number | ReactElement | null;
}
