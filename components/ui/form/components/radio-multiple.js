import { useEffect, useState } from "react";
import { CustomRadio } from "../../custom-radio";
import { RadioGroup } from "../../m-ui";

const RadioMultiple = ({
  onChange = () => {},
  label,
  value: oldChosenValue,
  radioButtons = [],
  name = "",
}) => {
  const [chosenValue, setChosenValue] = useState(oldChosenValue);

  const changeHandler = (event, value) => {
    let newValue,
      newEvent = event;
    if (value === chosenValue) newValue = "";
    else newValue = value;
    onChange({ ...newEvent, target: { ...newEvent.target, value: newValue } });
  };

  useEffect(() => {
    setChosenValue(oldChosenValue);
  }, [oldChosenValue]);

  return (
    <>
      <RadioGroup name={name}>
        {radioButtons.map((el, index) => (
          <CustomRadio key={index} {...el} />
        ))}
      </RadioGroup>
      {/* {label && <Label>{label}</Label>}
      {children.map((el, index) => (
        <FormGroup
          key={index}
          className={[el.containerClassName, "form-check-radio"]
            .filter((el) => el)
            .join(" ")}
        >
          <Label check>
            <Input
              name={el.name}
              defaultValue=""
              type="radio"
              checked={el.value === chosenValue}
              onChange={(event) => changeHandler(event, el.value)}
              onClick={(event) => changeHandler(event, el.value)}
            />
            {el.label} <span className="form-check-sign" />
          </Label>
        </FormGroup>
      ))} */}
    </>
  );
};

export default RadioMultiple;
