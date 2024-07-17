import moment from "moment";

const getNextDateForDay = (day, timeRange) => {
  const daysOfWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const today = moment().startOf("day");
  const targetDay = daysOfWeek[day.toLowerCase()];

  let targetDate = today.clone().day(targetDay);

  if (targetDate.isSameOrBefore(today, "day")) {
    targetDate.add(1, "week");
  }

  const [startTime] = timeRange.split("-");
  const timeMoment = moment(startTime, "HH:mm");

  targetDate.set({
    hour: timeMoment.hours(),
    minute: timeMoment.minutes(),
    second: 0,
    millisecond: 0,
  });

  return targetDate.toISOString();
};

export default getNextDateForDay;
