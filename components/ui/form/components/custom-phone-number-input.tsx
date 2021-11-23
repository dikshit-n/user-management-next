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

{
  /* <PhoneNumber
            inputProps={{
              className: "form-control",
              placeholder: inputElementProps.placeholder,
              disabled: inputElementProps?.disabled,
              ...inputElementProps.inputProps,
            }}
            containerClass={[containerClassName, "form-input-container"].join(
              " "
            )}
            onChange={(phone) => {
              phone = filterNumbers(phone);
              if (inputElementProps.onChange) inputElementProps.onChange(phone);
              formik.setFieldValue(name, phone);
            }}
            value={value}
          /> */
}
