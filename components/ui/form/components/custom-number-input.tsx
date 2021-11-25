import React from "react";
import NumberFormat from "react-number-format";
import { NumberFormatPropsBase } from "../../../../data";
import { forwardRef } from "../../../../lib";

export const CustomNumberInput = forwardRef<
  NumberFormat,
  NumberFormatPropsBase
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...rest } = props;
  return (
    <NumberFormat
      {...rest}
      getInputRef={ref}
      onValueChange={(details: any) => {
        if (onChange) onChange(details);
      }}
    />
  );
});
