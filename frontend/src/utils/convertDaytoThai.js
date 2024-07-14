const convertDayToThai = (day) => {
  const daysInThai = {
    monday: "วันจันทร์",
    tuesday: "วันอังคาร",
    wednesday: "วันพุธ",
    thursday: "วันพฤหัสบดี",
    friday: "วันศุกร์",
    saturday: "วันเสาร์",
    sunday: "วันอาทิตย์",
  };

  return daysInThai[day.toLowerCase()] || day;
};

export default convertDayToThai;
