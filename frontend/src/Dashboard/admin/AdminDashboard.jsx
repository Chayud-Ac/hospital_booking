import React from "react";
import { useState } from "react";
import CurrentAppointment from "./CurrentAppointment";
import HistoryAppoinment from "./HistoryAppoinment";
import DoctorRegister from "./DoctorRegister";

const AdminDashboard = () => {
  const [tab, setTab] = useState("current");

  const handleTabChange = (e) => {
    setTab(e.target.value);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <div className="flex justify-center w-auto gap-[50px] items-center">
        <h1 className="text-4xl font-bold">
          {tab === "current" && "ตารางนัดหมาย"}
          {tab === "history" && "ประวัติการนัดหมาย"}
          {tab === "register" && "ลงทะเบียนแพทย์"}
        </h1>
        <select
          value={tab}
          onChange={handleTabChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="current">ตารางนัดหมาย</option>
          <option value="history">ประวัติการนัดหมาย</option>
          <option value="register">ลงทะเบียนแพทย์</option>
        </select>
      </div>
      {tab === "current" && <CurrentAppointment />}
      {tab === "history" && <HistoryAppoinment />}
      {tab === "register" && <DoctorRegister />}
    </div>
  );
};

export default AdminDashboard;
