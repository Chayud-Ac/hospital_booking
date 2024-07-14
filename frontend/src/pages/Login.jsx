import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext, AuthContextProvider } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    console.log(JSON.stringify(formData));

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        throw new Error(result.message);
      }

      // passing to to the dispatch to trigger the switch statement and set the user, token , role
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      console.log(result, "login data");

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          สวัสดี <span className="text-primaryColor">ยินดีต้อนรับ</span>
        </h3>

        <form onSubmit={(e) => submitHandler(e)} className="py-4 md:py-0">
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
            {
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                {loading ? <HashLoader size={25} color="fff" /> : "เข้าสู่ระบบ"}
              </button>
            }
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
