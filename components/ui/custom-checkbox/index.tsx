import { CUSTOM_CHECKBOX_PROPS } from "../../../data";
import { FormControlLabel, Checkbox } from "../m-ui";

export const CustomCheckbox = ({
  checked,
  onChange,
  label,
  containerProps,
  ...rest
}: CUSTOM_CHECKBOX_PROPS) => {
  // ignoring null / undefined values
  label = label || "";
  return (
    <FormControlLabel
      {...containerProps}
      control={<Checkbox checked onChange={onChange} {...rest} />}
      label={label}
    />
  );
};
