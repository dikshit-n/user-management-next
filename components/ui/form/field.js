import { useState } from "react";
import {
  Input,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import randomId from "uniqid";
import ReactDatetime from "react-datetime";
import RecursiveContainer from "./recursive-container";
import { isRequiredField } from "../../Utility/validation";
import { accessValueByString } from "../../Utility/ObjectUtils";
import { filterNumbers } from "../../Utility/numberUtils";
import Avatar from "../../UI/Avatar";
import RadioMultiple from "./components/radio-multiple";
import ColorPicker from "../../UI/ColorPicker/ColorPicker";
import { FileInput } from "./components/file-input";
import {
  TextField,
  InputAdornment,
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../m-ui";
import { isDateAfter, isDateBefore } from "../../Utility/dateUtils";
import { CustomRadio } from "../custom-radio";
import { MaterialSelect } from "./components/material-select";
import { CustomNumberInput } from "./components/custom-number-input";
import { CustomPhoneNumberInput } from "./components/custom-phone-number-input";

const Field = ({
  formik,
  type = "",
  name = "",
  validationSchema,
  inputCustomizationProps: {
    addon = null,
    component,
    options = [],
    children = [],
    ...restInputCustomizationProps // props that are created for input customization or input return value customization goes here...
  } = {},
  specialInputProps = {}, // the props that should be provided for a custom component we are using other than material UI (eg. react-number-format)
  ...rest
}) => {
  const id = randomId();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const isRequired =
    validationSchema &&
    (isRequiredField(validationSchema, name) || rest.required);
  const error =
    formik.errors && accessValueByString(formik.errors, name)?.toString();

  let value = accessValueByString(formik.values, name);
  if (type === "date") value = value && new Date(value);
  const touched = accessValueByString(formik.touched, name);
  const addonPosition = addon ? addon.position : "end";

  switch (type) {
    case "text":
      return (
        <TextField
          {...rest}
          type={type}
          // fullWidth
          name={name}
          error={error && touched}
          helperText={error || rest.helperText}
          onChange={formik.handleChange}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "password":
      return (
        <TextField
          {...rest}
          type={passwordOpen ? "text" : "password"}
          // fullWidth
          name={name}
          error={error && touched}
          helperText={error || rest.helperText}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position={addonPosition}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordOpen((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge={addonPosition}
                >
                  {passwordOpen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                {addon && addonPosition === "end" && addon.component}
              </InputAdornment>
            ),
            startAdornment: addonPosition === "start" && addon && (
              <InputAdornment position="start">
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "select":
      return (
        <MaterialSelect
          {...restInputCustomizationProps}
          labelAccessor={restInputCustomizationProps.labelAccessor}
          valueAccessor={restInputCustomizationProps.valueAccessor}
          isString={restInputCustomizationProps.isString}
          valueIsString={restInputCustomizationProps.valueIsString}
          optionIsString={restInputCustomizationProps.optionIsString}
          retriveOtherKeys={restInputCustomizationProps.retriveOtherKeys}
          name={name}
          value={value}
          formik={formik}
          options={options}
          error={error && touched}
          helperText={error || rest.helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position={addonPosition}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordOpen((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge={addonPosition}
                >
                  {passwordOpen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                {addon && addonPosition === "end" && addon.component}
              </InputAdornment>
            ),
            startAdornment: addonPosition === "start" && addon && (
              <InputAdornment position="start">
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "color": //
      return (
        <div
          className={["form-input-container-with-label", containerProps.label]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={inputElementProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FormGroup
            className={[containerClassName, "form-input-container"]
              .filter((el) => el)
              .join(" ")}
          >
            {addon && addonType === "prepend" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
            <ColorPicker
              name={name}
              value={value}
              onChange={(color) => formik.setFieldValue(name, color)}
              disabled={rest.inputElementProps?.disabled}
            />
            {addon && addonType === "append" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
          </FormGroup>
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "number":
      return (
        <TextField
          {...rest}
          // fullWidth
          name={name}
          error={error && touched}
          value={value}
          helperText={error || rest.helperText}
          onChange={(detail) => formik.setFieldValue(name, detail.value)}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            // CUSTOM_NUMBER_FORMAT_PROPS
            inputComponent: (numberInputProps) => (
              <CustomNumberInput
                {...numberInputProps}
                thousandSeparator={restInputCustomizationProps.isCommaSeperated}
                displayType="number"
                {...specialInputProps}
                id={specialInputProps.id || id}
                // renderText={(value, props) => <div {...props}>{value}</div>}
              />
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "phone":
      return (
        <TextField
          {...rest}
          // fullWidth
          name={name}
          error={error && touched}
          value={value}
          helperText={error || rest.helperText}
          onChange={(phone) => {
            phone = filterNumbers(phone);
            if (rest.onChange) rest.onChange(phone);
            formik.setFieldValue(name, phone);
          }}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            // CUSTOM_NUMBER_FORMAT_PROPS
            inputComponent: (phoneNumberInputProps) => (
              <CustomPhoneNumberInput
                {...phoneNumberInputProps}
                {...specialInputProps}
                inputProps={{
                  // className: "form-control",
                  placeholder: rest.placeholder,
                  disabled: rest.disabled,
                  ...specialInputProps.inputProps,
                }}
              />
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "file":
      return (
        <div
          className={["form-input-container-with-label", containerProps.label]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={inputElementProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FileInput
            {...rest}
            name={name}
            inputElementProps={inputElementProps}
            onChange={(file) => {
              if (inputElementProps.onChange) inputElementProps.onChange(file);
              formik.setFieldValue(name, file);
            }}
            value={value}
          />
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "array":
      return children.length > 0 ? (
        <RecursiveContainer
          formContainer={rest.formContainer}
          className={rest.className}
          config={children || []}
          formik={formik}
          validationSchema={validationSchema}
        />
      ) : null;
    case "field-array":
      return component;
    case "date":
      return (
        <div
          className={[containerClassName, "form-input-container"].join(" ")}
          style={{ marginBottom: 10 }}
        >
          <Label>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <ReactDatetime
            timeFormat={false}
            value={value}
            closeOnSelect
            dateFormat="DD/MM/YYYY"
            {...inputElementProps}
            isValidDate={(currentDate) => {
              currentDate = new Date(currentDate);
              if (
                currentDate &&
                (inputElementProps.maxDate || inputElementProps.minDate)
              ) {
                if (inputElementProps.maxDate)
                  return isDateBefore({
                    date: currentDate,
                    maxDate: inputElementProps.maxDate,
                  });
                if (inputElementProps.minDate)
                  return isDateAfter({
                    date: currentDate,
                    minDate: inputElementProps.minDate,
                  });
              }
              return true;
            }}
            name={name}
            onChange={(date) => {
              if (inputElementProps.onChange) inputElementProps.onChange(date);
              formik.setFieldValue(name, date);
            }}
            inputProps={{
              className: "form-control",
              placeholder: inputElementProps.placeholder || "Choose Date",
              disabled: inputElementProps?.disabled,
              ...inputElementProps.inputProps,
            }}
          />
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "checkbox":
      return (
        <FormGroup className={containerClassName} check>
          <Label check>
            <Input
              defaultValue=""
              type="checkbox"
              checked={value}
              onChange={(event) => {
                if (inputElementProps.onChange)
                  inputElementProps.onChange(event);
                formik.setFieldValue(name, !value);
              }}
            />
            {label}
            {isRequired && <span className="required-indicator">*</span>}
            <span className="form-check-sign" />
          </Label>
        </FormGroup>
      );
    case "radio":
      return (
        <>
          <CustomRadio
            defaultValue=""
            checked={value}
            onChange={(event) => {
              if (inputElementProps.onChange) inputElementProps.onChange(event);
              formik.setFieldValue(name, !value);
            }}
          />
          {isRequired && <span className="required-indicator">*</span>}
          <span className="form-check-sign" />
        </>
      );
    case "radio-multiple":
      return (
        <>
          <RadioMultiple
            onChange={(event) => {
              if (inputElementProps.onChange) inputElementProps.onChange(event);
              formik.setFieldValue(name, event.target.value);
            }}
            label={label}
            value={value}
            children={children}
            name={name}
          />
        </>
      );
    case "image":
      return (
        <div className={containerProps.label}>
          <Label>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <div className={containerClassName}>
            <Avatar
              initialImage={value}
              {...inputElementProps}
              onEditEnd={(image) => {
                if (inputElementProps && inputElementProps.onChange)
                  inputElementProps.onChange(image);
                formik.setFieldValue(name, image);
              }}
              deleteImage={() => {
                if (inputElementProps && inputElementProps.onChange)
                  inputElementProps.onChange(null);
                formik.setFieldValue(name, null);
              }}
            />
          </div>
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "component":
      return component;
    default:
      return (
        <div
          className={["form-input-container-with-label", containerProps.label]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={inputElementProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FormGroup
            className={[containerClassName, "form-input-container"]
              .filter((el) => el)
              .join(" ")}
          >
            {addon && addonType === "prepend" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
            <Input
              {...inputElementProps}
              value={value}
              type={type || "text"}
              name={name}
              onChange={formik.handleChange}
              id={inputElementProps.id || id}
            />
            {addon && addonType === "append" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
          </FormGroup>

          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
  }
};

export default Field;
