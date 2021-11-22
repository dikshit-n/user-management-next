import { CUSTOM_RADIO_PROPS } from "../../../data";
import { FormControlLabel, Radio } from "../m-ui";

export const CustomRadio = ({
  checked,
  onChange,
  label,
  containerProps,
  ...rest
}: CUSTOM_RADIO_PROPS) => {
  // ignoring null / undefined values
  label = label || "";
  return (
    <FormControlLabel
      {...containerProps}
      control={<Radio checked onChange={onChange} {...rest} />}
      label={label}
    />
  );
};
