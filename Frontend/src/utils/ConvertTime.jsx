// convert time into 12 hr
export const convert24hrTo12hr = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${period}`;
};
