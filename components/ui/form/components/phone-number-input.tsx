import React from "react";
import PhoneInput from "react-phone-input-2";
import { PHONE_INPUT_PROPS } from "../../../../data";
import "react-phone-input-2/lib/style.css";

const PhoneNumber = ({
  onChange = () => {},
  value,
  ...rest
}: PHONE_INPUT_PROPS) => {
  let alteredValue = `${value || ""}`;
  if (alteredValue) {
    alteredValue = alteredValue.toString();
  }

  let inputProps: any = {
    disabled: false,
    ...rest.inputProps,
  };
  if (rest.required) {
    inputProps = {
      ...inputProps,
      pattern: ".{6,}",
      title: "The Phone number is required",
    };
  }

  console.log(inputProps);

  return (
    <PhoneInput
      {...rest}
      inputProps={inputProps}
      country="ae"
      disableDropdown={rest.disabled || inputProps.disabled}
      value={alteredValue}
      onChange={onChange}
    />
  );
};

export default PhoneNumber;
