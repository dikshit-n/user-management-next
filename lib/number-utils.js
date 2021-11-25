export function filterNumbers(string) {
  if (string !== null && string !== undefined) {
    return string.toString().replace(/\D/g, "") !== ""
      ? parseInt(string.toString().replace(/\D/g, ""))
      : "";
  }
  return "";
}

export function numberWithCommas(x) {
  x = x || 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
