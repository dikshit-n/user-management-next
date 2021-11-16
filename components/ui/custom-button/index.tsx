import { CUSTOM_BUTTON_PROPS } from "../../../data";
import { Button } from "../m-ui";

export const CustomButton = ({
  loading,
  children,
  ...rest
}: CUSTOM_BUTTON_PROPS) => {
  return (
    <Button {...rest}>{loading ? <div>Loading...</div> : children}</Button>
  );
};
