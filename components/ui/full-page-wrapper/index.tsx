import { BoxProps } from "../../../data";
import { Box } from "../../ui";
import classes from "../../../assets/scss/ui-components.module.scss";

export const FullPageWrapper = ({ children, className, ...rest }: BoxProps) => {
  return (
    <Box
      {...rest}
      className={[classes["full-page-wrapper"], className].join(" ")}
    >
      {children}
    </Box>
  );
};
