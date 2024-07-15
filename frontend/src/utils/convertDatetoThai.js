const convertDateToThai = (dateString) => {
  const date = new Date(dateString);

  // Get components of the date
  const day = date.toLocaleDateString("th-TH", { weekday: "long" });
  const dayNumber = date.toLocaleDateString("th-TH", { day: "numeric" });
  const month = date.toLocaleDateString("th-TH", { month: "long" });
  const year = date.toLocaleDateString("th-TH", { year: "numeric" });
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Combine them into the desired format
  const thaiDate = `วัน${day}ที่ ${dayNumber} ${month} ${year} เวลา ${hours} : ${minutes}`;
  return thaiDate;
};

export default convertDateToThai;
