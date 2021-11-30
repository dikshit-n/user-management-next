import React from "react";
import { FILE_INPUT_PROPS } from "../../../../data";
import { FileInput as FileInputCustom } from "./file-input";
import { forwardRef } from "../../../../lib";

export const CustomFileInput = forwardRef<HTMLElement, FILE_INPUT_PROPS>(
  function FileInput(props, ref) {
    const { onChange, ...rest } = props;
    return (
      <FileInputCustom
        // ref={ref}
        onChange={(details: any) => {
          if (onChange) onChange(details);
          return null;
        }}
        {...rest}
      />
    );
  }
);
