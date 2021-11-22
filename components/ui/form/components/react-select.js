import React from "react";
import Select from "react-select";
import {
  accessValueByString,
  convertDropDownObject,
  ignoreEmptyObject,
} from "../../../Utility/ObjectUtils";

export const ReactSelect = ({
  fieldProps = {},
  formik,
  options = [],
  className = "",
  labelAccessor = "label",
  valueAccessor = "value",
  isString = false,
  valueIsString = false,
  optionIsString = false,
  retriveOtherKeys = false,
}) => {
  // little configuration
  if (isString) {
    valueIsString = valueIsString === undefined || valueIsString === null;
    optionIsString = optionIsString === undefined || optionIsString === null;
  }
  options = options.map((el) => ignoreEmptyObject(el)).filter((el) => el);

  // ---------------------- //

  let selectedOption = ignoreEmptyObject(
    accessValueByString(formik.values, fieldProps.name)
  );

  if (fieldProps.isMulti)
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
      }) || (fieldProps.isMulti ? [] : null);

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
    let value = fieldProps.isMulti
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
    formik.setFieldValue(fieldProps.name, value);
    if (fieldProps.onChange) fieldProps.onChange(value);
  };

  const getValue = () => {
    if (options) {
      return fieldProps.isMulti
        ? options.filter((option) =>
            selectedOption.find((el) => option.value === el.value)
          )
        : selectedOption
        ? options.find((option) => option.value === selectedOption.value)
        : null;
    } else {
      return fieldProps.isMulti ? [] : null;
    }
  };

  return (
    <Select
      closeMenuOnSelect={!fieldProps.isMulti}
      {...fieldProps}
      name={fieldProps.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={fieldProps.isMulti}
      className={className}
      classNamePrefix="react-select"
    />
  );
};

export default ReactSelect;

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
