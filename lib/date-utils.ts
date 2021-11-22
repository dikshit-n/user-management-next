export const getTimeCollapsed = (timestamp: Date) => {
  if (
    timestamp !== null &&
    timestamp !== undefined &&
    timestamp?.toString().length !== 0
  ) {
    const date = new Date(timestamp);
    return formatAMPM(date);
  }
  return "";
};

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: string | number = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const getDateCollapsed = (timestamp: Date) => {
  if (!timestamp) return "";
  let date = new Date(timestamp);
  return (
    (date.getDate().toString().length === 1
      ? "0" + date.getDate().toString()
      : date.getDate().toString()) +
    "-" +
    ((date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString()) +
    "-" +
    date.getFullYear().toString()
  );
};

export const calculateDate = (
  timestamp: Date,
  days: number | string,
  month?: number | string,
  year?: number | string
) => {
  let Days = +(days || 0);
  let Months = +(month || 0);
  let Years = +(year || 0);
  let date = new Date(timestamp);
  date.setDate(date.getDate() + Days);
  date.setMonth(date.getMonth() + Months);
  date.setFullYear(date.getFullYear() + Years);
  return date;
};

export const noOfDaysBetween = (start = new Date(), end = new Date()) => {
  start = new Date(start);
  end = new Date(end);
  let Difference_In_Time = end.getTime() - start.getTime();
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  Difference_In_Days = +Difference_In_Days.toFixed();
  if (Difference_In_Days < 0) {
    Difference_In_Days = 0;
  }
  return parseInt(Difference_In_Days.toString());
};

export const getStartOfDay = (timestamp: any) => {
  if (!timestamp) return null;
  let date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};
export const getEndOfDay = (timestamp: any) => {
  if (!timestamp) return null;
  let date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};

export const getMonthName = (monthIndex: number | string) => {
  monthIndex = +monthIndex;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
export const getShortMonthName = (monthIndex: number | string) => {
  monthIndex = +monthIndex;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthIndex];
};

export const getWeekNumber = (date = new Date()) => {
  date = new Date(date);
  var oneJan = new Date(date.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((+date - +oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  return result;
};

export const isDateBefore = ({
  date,
  maxDate,
}: {
  date: any;
  maxDate?: any;
}) => {
  if (date && maxDate) {
    date = getStartOfDay(new Date(date));
    maxDate = getEndOfDay(new Date(maxDate));
    return date <= maxDate;
  }
  return true;
};
export const isDateAfter = ({
  date,
  minDate,
}: {
  date: any;
  minDate?: any;
}) => {
  if (date && minDate) {
    date = getEndOfDay(new Date(date));
    minDate = getStartOfDay(new Date(minDate));
    return date >= minDate;
  }
  return true;
};
