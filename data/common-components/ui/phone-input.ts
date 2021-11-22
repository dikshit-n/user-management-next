import { PhoneInputProps } from "../../predefined-interfaces";

export interface PHONE_INPUT_PROPS extends Omit<PhoneInputProps, "value"> {
  value?: string | number | null;
  required?: boolean | null;
  pattern?: string | null;
}
