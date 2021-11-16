import {
  FormControlLabelProps,
  CheckboxProps,
  ReactElement,
} from "../../predefined-interfaces";

export interface CUSTOM_CHECKBOX_PROPS extends CheckboxProps {
  containerProps?: FormControlLabelProps;
  label?: string | number | ReactElement | null;
}
