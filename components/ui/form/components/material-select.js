import React from "react";
import {
  accessValueByString,
  convertDropDownObject,
  ignoreEmptyObject,
} from "../../../../lib";
import { Select, MenuItem, Checkbox, ListItemText } from "../../m-ui";

export const MaterialSelect = ({
  formik,
  options = [],
  labelAccessor = "label",
  valueAccessor = "value",
  isString = false,
  valueIsString = false,
  optionIsString = false,
  retriveOtherKeys = false,
  name,
  value,
  error,
  helperText,
  InputProps,
  ...rest
}) => {
  // little configuration
  if (isString) {
    valueIsString = valueIsString === undefined || valueIsString === null;
    optionIsString = optionIsString === undefined || optionIsString === null;
  }
  options = options.map((el) => ignoreEmptyObject(el)).filter((el) => el);

  // ---------------------- //

  let selectedOption = ignoreEmptyObject(
    accessValueByString(formik.values, name)
  );

  if (rest.multiple)
    selectedOption = (selectedOption || []).map((option) =>
      convertDropDownObject({
        value: option,
        valueAccessor,
        labelAccessor,
        retriveOtherKeys,
        isString: isString || valueIsString,
      })
    );
  else
    selectedOption =
      convertDropDownObject({
        value: selectedOption,
        valueAccessor,
        labelAccessor,
        isString: isString || valueIsString,
        retriveOtherKeys,
      }) || (rest.multiple ? [] : null);

  options = (options || []).map((option) =>
    convertDropDownObject({
      value: option,
      isString: isString || optionIsString,
      valueAccessor,
      labelAccessor,
      retriveOtherKeys,
    })
  );

  const onChange = (option) => {
    let value = rest.multiple
      ? (option || []).map((option) =>
          convertDropDownObject({
            value: option,
            valueAccessor,
            labelAccessor,
            isString: isString || valueIsString,
            isReverse: true,
            retriveOtherKeys,
          })
        )
      : convertDropDownObject({
          value: option,
          valueAccessor,
          labelAccessor,
          isString: isString || valueIsString,
          isReverse: true,
          retriveOtherKeys,
        });
    formik.setFieldValue(name, value);
    if (rest.onChange) rest.onChange(value);
  };

  const getValue = () => {
    if (options) {
      return rest.multiple
        ? options
            .filter((option) =>
              selectedOption.find((el) => option.value === el.value)
            )
            .map((el) => el.value)
        : selectedOption
        ? options.find((option) => option.value === selectedOption.value)?.value
        : null;
    } else {
      return rest.multiple ? [] : null;
    }
  };
  const selectedValue = getValue();

  return (
    <Select {...rest} name={name} value={selectedValue} onChange={onChange}>
      {options.map((el, index) => (
        <MenuItem key={index} value={el.value}>
          {rest.multiple ? (
            <>
              <Checkbox
                checked={
                  selectedValue
                    ? selectedValue.find((ele) => ele.value === el.value)
                    : false
                }
              />
              <ListItemText primary={el.label} />
            </>
          ) : (
            el.label
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

// yup validation examples
// yup
//   .array()
//   .min(3, "Pick at least 3 tags")
//   .nullable()
//   .required("This is required")
//   .of(
//     yup.object().shape({
//       label: yup.string().required(),
//       value: yup.string().required(),
//     })
//   )

// yup
//   .object()
//   .nullable()
//   .required("This field is required")
//   .shape({
//     label: yup.string().required("Required"),
//     value: yup.string().required("Required"),
//   })

// for more info
// https://stackoverflow.com/questions/54938382/how-do-the-yup-validation-for-react-select
