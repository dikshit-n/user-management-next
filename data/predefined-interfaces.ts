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
export type {
  ButtonProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  FormControlProps,
  FormControlLabelProps,
  InputLabelProps,
  CardProps,
  BoxProps,
  InputProps,
} from "@mui/material";

// react-phone-input-2
export type { PhoneInputProps } from "react-phone-input-2";
