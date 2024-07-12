import React from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";

const Doctors = () => {
  return (
    <>
      <section className="bg-[#ff9ea]">
        <div className="container text-center">
          <h2 className="heading">ค้นหาแพทย์</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-opacity-10"
              placeholder="ค้นหาแพทย์"
            />
            <button className="btn mt-0 h-full rounded-r-md px-4">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 ">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              ความเห็นและความพึงพอใจผู้ป่วย
            </h2>
            <p className="text__para text-center">
              นอกจากนี้ ระบบการผลิตพยาบาลของไทยเอง ภาครัฐก็ค่อนข้างให้ความสำคัญ
              โดยไทยมีจำนวนพยาบาลสัดส่วนเยอะเป็นลำดับต้น
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
