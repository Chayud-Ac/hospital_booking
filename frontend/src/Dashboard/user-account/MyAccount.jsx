import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";

import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import HashLoader from "react-spinners/HashLoader";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("booking");

  const { data, loading } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="max-w-[1170px] px-5 mx-auto mt-10">
      {loading && <HashLoader size={40} color="fff" />}

      {!loading && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex item-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={data.photo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[13px] text-headingColor font-bold">
                {data.name}
              </h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {data.email}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                กรุ๊ปเลือด
                <span className="ml-2 text-headingColor text-[22px] leading-8">
                  {data.bloodType}
                </span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                onClick={() => handleLogout()}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white mb-5"
              >
                logout
              </button>
              <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("booking")}
                className={`${
                  tab === "booking" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                ตารางนัดของฉัน
              </button>
              <button
                onClick={() => setTab("setting")}
                className={`${
                  tab === "setting" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                ตั้งค่าโปรไฟล์
              </button>
            </div>

            {tab === "booking" && <MyBooking />}

            {tab === "setting" && <Profile user={data} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
