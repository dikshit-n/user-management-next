import React from "react";
import { PHONE_INPUT_PROPS } from "../../../../data";
import PhoneNumber from "./phone-number-input";

export const CustomPhoneNumberInput = React.forwardRef<
  HTMLElement,
  PHONE_INPUT_PROPS
>(function NumberFormatCustom(props, ref) {
  return (
    <PhoneNumber
      {...props}
      inputProps={{
        ...props.inputProps,
        ref,
      }}
    />
  );
});
