import React from "react";
import { PHONE_INPUT_PROPS } from "../../../../data";
import PhoneNumber from "./phone-number-input";
import { forwardRef } from "../../../../lib";

export const CustomPhoneNumberInput = forwardRef<
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
