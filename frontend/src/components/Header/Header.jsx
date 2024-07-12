import React from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import xIcon from "../../assets/images/xIcon.svg";

const navLink = [
  {
    path: "/home",
    display: "หน้าหลัก",
  },
  {
    path: "/doctors",
    display: "พบแพทย์",
  },
  {
    path: "/services",
    display: "บริการ",
  },
  {
    path: "/contact",
    display: "ติดต่อเรา",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo -------------------------------------------------------------------------------------------*/}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* Menu --------------------------------------------------------------------------------------------*/}
          <div className="navigation" ref={menuRef}>
            <ul className="menu flex item-center gap-[2.7rem]">
              <button
                onClick={() => menuRef.current.classList.remove("show_menu")}
                className="absolute top-1 right-1 sm: hidden"
              >
                <img src={xIcon} width={30} height={30} />
              </button>
              {navLink.map((link, index) => (
                <li key={index}>
                  <NavLink
                    onClick={() =>
                      menuRef.current.classList.remove("show_menu")
                    }
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[20px] leading-7 font-[600]"
                        : "text-textColor text-[20px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar right --------------------------------------------------------------------------------------- */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={userImg}
                    alt=""
                    className="w-full rounded-full"
                  ></img>
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                เข้าสู่ระบบ
              </button>
            </Link>

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
