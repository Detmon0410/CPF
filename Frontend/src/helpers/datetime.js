import moment from "moment";

export function formatDate(value, format = "DD/MM/YYYY") {
  let string = moment(new Date(String(value))).format(format);
  if (string) {
    string = string.split("/");
    return `${string[0]}/${string[1]}/${parseInt(string[2]) + 543}`;
  } else {
    return "";
  }
}

export function formatDateYMD(yourDate) {
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
}

export function formatDateYMDTHM(yourDate) {
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return [
    yourDate.toISOString().split("T")[0],
    yourDate.toISOString().split("T")[1].split(":").slice(0, 2).join(":"),
  ].join("T");
}

export function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}
