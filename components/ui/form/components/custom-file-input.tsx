import React from "react";
import { FILE_INPUT_PROPS } from "../../../../data";
import { FileInput } from "./file-input";
import { forwardRef } from "../../../../lib";

export const CustomFileInput = forwardRef<HTMLElement, FILE_INPUT_PROPS>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...rest } = props;
    return (
      <FileInput
        ref={ref}
        onChange={(details: any) => {
          if (onChange) onChange(details);
          return null;
        }}
        {...rest}
      />
    );
  }
);
