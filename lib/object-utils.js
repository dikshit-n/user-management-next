export const convertDropDownObject = ({
  value,
  valueAccessor,
  labelAccessor,
  isString = false, // specify this if you want to convert a string to { value: '', label: '' } object and viceversa
  isReverse = false, // specify this if you need your object to be converted from {value, label}(dropdown supportable format) to backend supportable fomat
  retriveOtherKeys = false, // specify this if you need all the keys other than value and label to retrived while choosing an option
}) => {
  if (isString) {
    if (value) {
      // value that is supportable to backend format
      if (isReverse) return value.value;
      // object that is supported to frontend dropdown format
      return { value: value, label: value };
    }
    return null;
  } else {
    if (value) {
      let finalObject = {};
      // object that is supportable to backend format
      if (isReverse) {
        finalObject = {
          ...(retriveOtherKeys ? value : {}),
          [valueAccessor]: value.value,
          [labelAccessor]: value.label,
        };
        if (valueAccessor !== "value" && labelAccessor !== "label") {
          delete finalObject.value;
          delete finalObject.label;
        }
        return finalObject;
      }
      // object that is supported to frontend dropdown format
      return {
        ...(retriveOtherKeys ? value : {}),
        value: value[valueAccessor],
        label: value[labelAccessor],
      };
    }
    return null;
  }
};

export const accessValueByString = (o, s) => {
  // console.log(`[${s}]`, o);
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    try {
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    } catch {
      return;
    }
  }
  return o;
};

export const convertToObjectAccessingString = (s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  return s;
};

export const ignoreEmptyObject = (value) => {
  if (value) {
    if (typeof value === "object") {
      if (
        Object.keys(value).length === 0
        // &&
        // Object.getPrototypeOf(value) === Object.prototype
      ) {
        return null;
      }
      return value;
    }
    return value;
  }
  return null;
};
