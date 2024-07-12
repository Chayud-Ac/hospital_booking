import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          สวัสดี <span className="text-primaryColor">ยินดีต้อนรับ</span>
        </h3>

        <form className="py-4 md:py-0">
          <div className="mb-5">
            <input
              type="email"
              placeholder="email ของคุณ"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-4 py-3 border-b  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="password ของคุณ"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              className="w-full px-4 py-3 border-b  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              เข้าสู่ระบบ
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            ยังไม่มีบัญชีผู้ใช้ ?{" "}
            <Link to="/register" className="font-bold">
              สมัครสมาชิค
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
