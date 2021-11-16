// https://www.typescriptlang.org/docs/handbook/modules.html#importing-types -- reference for how to re-export a type

// next
export type { NextPage } from "next/types/index";
export type { AppProps } from "next/app";

// react
export type { FC, ReactElement } from "react";

// material-ui
export type {
  ButtonProps,
  CheckboxProps,
  FormControlLabelProps,
} from "@mui/material";
