import moment from "moment";

//  function เปลี่ยนตัว appointmentdate ที่มาจาก request เป็น format ที่ถูกต้อง
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

  // If the target day is before or the same as today, set to next week
  let targetDate = today.clone().day(targetDay);
  if (targetDate.isSameOrBefore(today)) {
    targetDate.add(1, "week");
  }

  // Set the time
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
