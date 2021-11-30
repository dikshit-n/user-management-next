import { useState } from "react";
import randomId from "uniqid";
import RecursiveContainer from "./recursive-container";
import {
  isRequiredField,
  accessValueByString,
  filterNumbers,
} from "../../../lib";
import Avatar from "../avatar";
import RadioMultiple from "./components/radio-multiple";
// import ColorPicker from "../../UI/ColorPicker/ColorPicker";
import {
  MaterialSelect,
  CustomNumberInput,
  CustomPhoneNumberInput,
  FileInput,
} from "./components";
import { CustomRadio } from "../custom-radio";
import {
  TextField,
  InputAdornment,
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
  FormLabel,
  FormControlLabel,
  FormControl,
  MobileDatePicker,
  DateTimePicker,
  TimePicker,
  Checkbox,
  FormHelperText,
} from "../m-ui";

export const Field = ({
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
          {/* <Label htmlFor={inputElementProps.id || id}>
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
          {error && touched && <div className="form-input-error">{error}</div>} */}
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
        <>
          <FormLabel error={error && touched}>{rest.label}</FormLabel>
          <FileInput
            {...rest}
            {...fileInputProps}
            {...specialInputProps}
            name={name}
            value={value}
            onChange={(file) => {
              if (rest.onChange) rest.onChange(file);
              formik.setFieldValue(name, file);
            }}
          />
          {error && touched && <FormHelperText>{error}</FormHelperText>}
        </>
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
        <MobileDatePicker
          {...specialInputProps}
          value={value}
          onChange={(date) => {
            if (rest.onChange) rest.onChange(date);
            formik.setFieldValue(name, date);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...rest}
              onChange={undefined}
              helperText={error || rest.helperText}
            />
          )}
        />
      );
    case "time":
      return (
        <TimePicker
          {...specialInputProps}
          value={value}
          onChange={(date) => {
            if (rest.onChange) rest.onChange(date);
            formik.setFieldValue(name, date);
          }}
          renderInput={(params) => (
            <TextField
              {...rest}
              onChange={undefined}
              {...params}
              helperText={error || rest.helperText}
            />
          )}
        />
      );
    case "date-time":
      return (
        <DateTimePicker
          {...specialInputProps}
          value={value}
          onChange={(date) => {
            if (rest.onChange) rest.onChange(date);
            formik.setFieldValue(name, date);
          }}
          renderInput={(params) => (
            <TextField
              {...rest}
              onChange={undefined}
              {...params}
              helperText={error || rest.helperText}
            />
          )}
        />
      );
    case "checkbox":
      return (
        <FormControl
          required
          error={error && touched}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
          {...restInputCustomizationProps.formControlProps}
        >
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
    case "radio": //
      return (
        <>
          <CustomRadio
            defaultValue=""
            checked={value}
            onChange={(event) => {
              if (rest.onChange) rest.onChange(event);
              formik.setFieldValue(name, !value);
            }}
            containerProps={restInputCustomizationProps.formControlLabelProps}
          />
        </>
      );
    case "radio-multiple": //
      return (
        <>
          <RadioMultiple
            onChange={(event) => {
              if (rest.onChange) rest.onChange(event);
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
          <FormLabel required={isRequired} error={error && touched}>
            {label}
          </FormLabel>
          <Avatar
            initialImage={value}
            {...rest}
            onEditEnd={(image) => {
              if (rest && rest.onChange) rest.onChange(image);
              formik.setFieldValue(name, image);
            }}
            deleteImage={() => {
              if (rest && rest.onChange) rest.onChange(null);
              formik.setFieldValue(name, null);
            }}
          />
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "component":
      return component;
    default:
      return (
        <TextField
          {...rest}
          type={type || "text"}
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
  }
};
