import React, { useContext } from "react";
import { useState } from "react";
import CurrentAppointment from "./CurrentAppointment";
import HistoryAppointment from "./HistoryAppointment";
import DoctorRegister from "./DoctorRegister";
import { authContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("current");

  const handleTabChange = (e) => {
    setTab(e.target.value);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Optionally, redirect to login page or home page
    window.location.href = "/login"; // Update the path as needed
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
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 rounded-md p-2 ml-4"
        >
          Logout
        </button>
      </div>
      {tab === "current" && <CurrentAppointment />}
      {tab === "history" && <HistoryAppointment />}
      {tab === "register" && <DoctorRegister />}
    </div>
  );
};

export default AdminDashboard;
