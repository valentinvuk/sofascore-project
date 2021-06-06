export function epochToDate(epoch) {
  let startDate = new Date(epoch * 1000);
  let minutes, hours;
  if (startDate.getMinutes() < 10) minutes = "0" + startDate.getMinutes();
  else minutes = startDate.getMinutes();
  if (startDate.getHours() < 10) hours = "0" + startDate.getHours();
  else hours = startDate.getHours();
  return hours + ":" + minutes;
}
