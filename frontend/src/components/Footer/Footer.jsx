import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/Chayud-Ac/hospital_booking",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
];

const quesickLinks01 = [
  {
    path: "/home",
    display: "หน้าหลัก",
  },
  {
    path: "/",
    display: "เกี่ยวกับเรา",
  },
  {
    path: "/services",
    display: "บริการ",
  },
];

const quesickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "พบแพทย์",
  },
  {
    path: "/",
    display: "นัดแพทย์",
  },
  {
    path: "/",
    display: "ดูความเห็นคนอื่นๆ",
  },
];

const quesickLinks03 = [
  {
    path: "/",
    display: "บริจาค",
  },
  {
    path: "/contact",
    display: "ติดต่อเรา",
  },
];

const Footer = () => {
  return (
    <footer className="pb-16 pt-10 bg-slate-50">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px] max-sm:justify-center items-center">
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor max-sm:text-center">
              Quick link
            </h2>
            <ul>
              {quesickLinks01.map((item, index) => (
                <li key={index} className="mb-4 text-center">
                  <Link to={item.path} className="text-[16px] leading-7">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor text-center">
              เลือกหมวด
            </h2>
            <ul>
              {quesickLinks02.map((item, index) => (
                <li key={index} className="mb-4 text-center">
                  <Link to={item.path} className="text-[16px] leading-7 ">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              ช่วยเหลือ
            </h2>
            <ul>
              {quesickLinks03.map((item, index) => (
                <li key={index} className="mb-4 text-center">
                  <Link to={item.path} className="text-[16px] leading-7 ">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-md:hidden">
            <img src={logo} alt="" />
            <p>© Copyright develop by Chayud Mahithiphark all right reserved</p>
            <div>
              {socialLinks.map((link, index) => (
                <>
                  <Link
                    key={index}
                    to={link.path}
                    className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-black "
                  >
                    {link.icon}
                  </Link>
                  <h1>Github</h1>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
