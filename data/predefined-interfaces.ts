// https://www.typescriptlang.org/docs/handbook/modules.html#importing-types -- reference for how to re-export a type

// next
export type { NextPage } from "next/types/index";
export type { AppProps } from "next/app";

// react
export type {
  FC,
  ReactElement,
  HTMLAttributes,
  FormEvent,
  ChangeEvent,
} from "react";

// material-ui
export type { ButtonProps } from "@mui/material/Button/Button";
export type { CheckboxProps } from "@mui/material/Checkbox/Checkbox";
export type { RadioProps } from "@mui/material/Radio/Radio";
export type { RadioGroupProps } from "@mui/material/RadioGroup/RadioGroup";
export type { FormControlProps } from "@mui/material/FormControl/FormControl";
export type { FormControlLabelProps } from "@mui/material/FormControlLabel/FormControlLabel";
export type { InputLabelProps } from "@mui/material/InputLabel/InputLabel";
export type { CardProps } from "@mui/material/Card/Card";
export type { BoxProps } from "@mui/material/Box/Box";
export type { InputProps } from "@mui/material/Input/Input";

export type { MobileDatePickerProps } from "@mui/lab/MobileDatePicker/MobileDatePicker";

// react-phone-input-2
export type { PhoneInputProps } from "react-phone-input-2";

// papaparse
export type { ParseLocalConfig } from "papaparse";

// react-number-format
export type { NumberFormatPropsBase } from "react-number-format";
