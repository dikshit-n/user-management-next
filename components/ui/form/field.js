import { useState } from "react";
import {
  Input,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  InputGroup,
} from "reactstrap";
import randomId from "uniqid";
import ReactDatetime from "react-datetime";
import RecursiveContainer from "./recursive-container";
import { isRequiredField } from "../../Utility/validation";
import { accessValueByString } from "../../Utility/ObjectUtils";
import { filterNumbers } from "../../Utility/numberUtils";
import ReactSelect from "./components/react-select";
import NumberFormat from "react-number-format";
import PhoneNumber from "./components/phone-number";
import Avatar from "../../UI/Avatar";
import RadioMultiple from "./components/radio-multiple";
import ColorPicker from "../../UI/ColorPicker/ColorPicker";
import FileInput from "./components/file-input";
import { isDateAfter, isDateBefore } from "../../Utility/dateUtils";
import { CustomRadio } from "../custom-radio";

const Field = ({
  formik,
  type = "",
  fieldProps = {},
  name = "",
  label,
  addon = null,
  addonType = "prepend",
  addonProps = {},
  containerClassName = "",
  containerClassNameWithLabel = "",
  children = [],
  options = [],
  validationSchema,
  component,
  isCommaSeperated = true,
  ...rest
}) => {
  const id = randomId();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const isRequired =
    validationSchema &&
    (isRequiredField(validationSchema, name) || rest.isRequired);
  const error =
    formik.errors && accessValueByString(formik.errors, name)?.toString();

  let value = accessValueByString(formik.values, name);
  if (type === "date") value = value && new Date(value);
  const touched = accessValueByString(formik.touched, name);

  switch (type) {
    case "text":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
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
              {...fieldProps}
              value={value}
              name={name}
              onChange={formik.handleChange}
              id={fieldProps.id || id}
              type="text"
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
    case "password":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FormGroup
            className={[containerClassName, "form-input-container"].join(" ")}
          >
            <InputGroup>
              <Input
                {...fieldProps}
                value={value}
                name={name}
                onChange={formik.handleChange}
                id={fieldProps.id || id}
                type={passwordOpen ? "text" : "password"}
              />
              <InputGroupAddon {...addonProps} addonType="append">
                <InputGroupText>
                  <i
                    onClick={() => setPasswordOpen((prev) => !prev)}
                    className={`fas fa-${passwordOpen ? "eye" : "eye-slash"}`}
                    style={passwordOpen ? { color: "blue" } : {}}
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "select":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FormGroup
            className={[containerClassName, "form-input-container"].join(" ")}
          >
            {/* <InputGroup> */}
            {addon && addonType === "prepend" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
            <ReactSelect
              value={value}
              labelAccessor={rest.labelAccessor}
              valueAccessor={rest.valueAccessor}
              isString={rest.isString}
              valueIsString={rest.valueIsString}
              optionIsString={rest.optionIsString}
              retriveOtherKeys={rest.retriveOtherKeys}
              fieldProps={{ ...fieldProps, id: fieldProps.id || id, name }}
              formik={formik}
              options={options}
              className={[fieldProps.className, "react-select primary"]
                .filter((el) => el)
                .join(" ")}
            />
            {addon && addonType === "append" && (
              <InputGroupAddon {...addonProps} addonType={addonType}>
                <InputGroupText>{addon}</InputGroupText>
              </InputGroupAddon>
            )}
            {/* </InputGroup> */}
          </FormGroup>

          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "color":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
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
              disabled={rest.fieldProps?.disabled}
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
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
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
            <NumberFormat
              thousandSeparator={isCommaSeperated}
              {...fieldProps}
              className={["form-control", fieldProps.className]
                .filter((el) => el)
                .join(" ")}
              displayType="number"
              onValueChange={(detail) =>
                formik.setFieldValue(name, detail.value)
              }
              value={value}
              id={fieldProps.id || id}
              // renderText={(value, props) => <div {...props}>{value}</div>}
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
    case "phone":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
          style={{ marginBottom: 15 }}
        >
          <Label htmlFor={fieldProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <PhoneNumber
            inputProps={{
              className: "form-control",
              placeholder: fieldProps.placeholder,
              disabled: fieldProps?.disabled,
              ...fieldProps.inputProps,
            }}
            containerClass={[containerClassName, "form-input-container"].join(
              " "
            )}
            onChange={(phone) => {
              phone = filterNumbers(phone);
              if (fieldProps.onChange) fieldProps.onChange(phone);
              formik.setFieldValue(name, phone);
            }}
            value={value}
          />
          {error && touched && <div className="form-input-error">{error}</div>}
        </div>
      );
    case "file":
      return (
        <div
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <FileInput
            {...rest}
            name={name}
            fieldProps={fieldProps}
            onChange={(file) => {
              if (fieldProps.onChange) fieldProps.onChange(file);
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
            {...fieldProps}
            isValidDate={(currentDate) => {
              currentDate = new Date(currentDate);
              if (currentDate && (fieldProps.maxDate || fieldProps.minDate)) {
                if (fieldProps.maxDate)
                  return isDateBefore({
                    date: currentDate,
                    maxDate: fieldProps.maxDate,
                  });
                if (fieldProps.minDate)
                  return isDateAfter({
                    date: currentDate,
                    minDate: fieldProps.minDate,
                  });
              }
              return true;
            }}
            name={name}
            onChange={(date) => {
              if (fieldProps.onChange) fieldProps.onChange(date);
              formik.setFieldValue(name, date);
            }}
            inputProps={{
              className: "form-control",
              placeholder: fieldProps.placeholder || "Choose Date",
              disabled: fieldProps?.disabled,
              ...fieldProps.inputProps,
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
                if (fieldProps.onChange) fieldProps.onChange(event);
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
              if (fieldProps.onChange) fieldProps.onChange(event);
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
              if (fieldProps.onChange) fieldProps.onChange(event);
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
        <div className={containerClassNameWithLabel}>
          <Label>
            {label}
            {isRequired && <span className="required-indicator">*</span>}
          </Label>
          <div className={containerClassName}>
            <Avatar
              initialImage={value}
              {...fieldProps}
              onEditEnd={(image) => {
                if (fieldProps && fieldProps.onChange)
                  fieldProps.onChange(image);
                formik.setFieldValue(name, image);
              }}
              deleteImage={() => {
                if (fieldProps && fieldProps.onChange)
                  fieldProps.onChange(null);
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
          className={[
            "form-input-container-with-label",
            containerClassNameWithLabel,
          ]
            .filter((el) => el)
            .join(" ")}
        >
          <Label htmlFor={fieldProps.id || id}>
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
              {...fieldProps}
              value={value}
              type={type || "text"}
              name={name}
              onChange={formik.handleChange}
              id={fieldProps.id || id}
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
