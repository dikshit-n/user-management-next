import { CUSTOM_INPUT_PROPS } from "../../../../data";
import { uniqueId } from "../../../../lib";
import { FormControl, Input, InputLabel } from "../../m-ui";

export const CustomInput = ({
  label,
  inputContainerProps,
  labelProps,
  ...rest
}: CUSTOM_INPUT_PROPS) => {
  // ignoring null / undefined values
  label = label || "";
  const id = uniqueId();
  return (
    <FormControl {...inputContainerProps}>
      {label && (
        <InputLabel htmlFor={id} {...labelProps}>
          {label}
        </InputLabel>
      )}
      <Input id={id} {...rest} />
    </FormControl>
  );
};
