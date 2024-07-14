import React from "react";
import convertTime from "../../utils/convertTime";
import convertDayToThai from "../../utils/convertDaytoThai";

const SlidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">ราคา</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} บาท
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          ช่วงเวลาว่าง
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertDayToThai(item.day)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md">นัดเลย!</button>
    </div>
  );
};

export default SlidePanel;
