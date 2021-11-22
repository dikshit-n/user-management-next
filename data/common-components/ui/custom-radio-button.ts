import {
  FormControlLabelProps,
  RadioProps,
  RadioGroupProps,
  ReactElement,
} from "../../predefined-interfaces";

export interface CUSTOM_RADIO_PROPS extends RadioProps {
  containerProps?: FormControlLabelProps;
  label?: string | number | ReactElement | null;
}

export interface CUSTOM_RADIO_MULTIPLE_PROPS extends RadioGroupProps {
  containerProps?: FormControlLabelProps;
  label?: string | number | ReactElement | null;
}
