import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

const SlidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeSlotSelect = (item) => {
    setSelectedTime(item);
    console.log("Selected time slot:", item); // Log the selected time slot
  };

  const handleAppointmentBooking = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      toast.error("กรุณาเลือกช่วงเวลาที่ต้องการนัด");
      return;
    }

    const appointmentData = {
      doctor: doctorId,
      ticketPrice,
      appointmentDate: new Date().toISOString(), // Assuming current date for the example
      timeSlot: selectedTime.time,
      status: "pending",
      isPaid: false,
    };

    console.log(appointmentData);

    // try {
    //   const res = await fetch(`${BASE_URL}/appointments`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(appointmentData),
    //   });

    //   const result = await res.json();
    //   if (!res.ok) {
    //     throw new Error(result.message || "เกิดข้อผิดพลาด");
    //   }

    //   toast.success("การนัดหมายสำเร็จ");
    //   // Optionally clear the selected time slot after successful booking
    // } catch (error) {
    //   console.error("Error booking appointment:", error);
    //   toast.error(error.message || "server error");
    // }
  };

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
                {item.time}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.available ? "คิวว่าง" : "ไม่ว่าง"}
              </p>
              {item.available && (
                <button
                  onClick={() => handleTimeSlotSelect(item)}
                  className={`px-3 py-1 rounded-md hover:bg-slate-500 ${
                    selectedTime === item
                      ? "bg-slate-400 text-black"
                      : "bg-primaryColor text-white"
                  }`}
                >
                  เลือก
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {selectedTime && (
        <div className="mt-[30px] bg-lime-400 px-1 py-2 rounded-xl">
          <h3>เวลานัดของคุณ : {selectedTime.time}</h3>
        </div>
      )}

      <button
        onClick={(e) => handleAppointmentBooking(e)}
        className="btn px-2 w-full rounded-md"
      >
        นัดเลย!
      </button>
    </div>
  );
};

export default SlidePanel;
