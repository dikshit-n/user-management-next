import { getIn } from "formik";
import { convertToObjectAccessingString } from "./object-utils";

const getValidName = (name) => {
  if (name) {
    name = convertToObjectAccessingString(name);
    if (name.split(".").length > 1) {
      let newName = name.split(".");
      newName = newName.join(".fields.");
      return newName;
    }
  }
  return name;
};

export const isRequiredField = (validationSchema, name) => {
  try {
    name = getValidName(name);
    return !!getIn(validationSchema.describe().fields, name).tests.find(
      (test) => test.name === "required"
    );
  } catch {
    return false;
  }
};
