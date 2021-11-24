import { Checkbox, FormControlLabel, FormControl, FormLabel } from "../../m-ui";

export const CheckboxMultiple = ({
  restInputCustomizationProps = {},
  name,
  value,
  rest = {},
}) => {
  return (
    <FormControl
      required
      error={error && touched}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
      {...restInputCustomizationProps.formControlProps}
    >
      <FormLabel
        component="legend"
        {...restInputCustomizationProps.formLabelProps}
      >
        {rest.label}
      </FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={(event) => {
              if (rest.onChange) rest.onChange(event);
              formik.setFieldValue(name, !value);
            }}
            name={name}
            value={value}
            {...rest}
          />
        }
        {...restInputCustomizationProps.formControlLabelProps}
        defaultValue=""
        onChange={undefined}
      />
    </FormControl>
  );
};
