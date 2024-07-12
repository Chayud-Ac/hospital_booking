import React from "react";

const SlidePanel = () => {
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">ราคา</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          10000 บาท
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          ช่วงเวลาว่าง
        </p>
        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              อาทิตย์
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              09.30 - 12.30
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              อาทิตย์
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              09.30 - 12.30
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              อาทิตย์
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              09.30 - 12.30
            </p>
          </li>
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md">นัดเลย!</button>
    </div>
  );
};

export default SlidePanel;
