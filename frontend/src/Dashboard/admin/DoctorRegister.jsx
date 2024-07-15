import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL, token } from "./../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data.url });
  };

  const handleQualificationChange = (e, index) => {
    const { name, value } = e.target;
    const qualifications = [...formData.qualifications];
    qualifications[index][name] = value;
    setFormData({ ...formData, qualifications });
  };

  const addQualification = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { startingDate: "", endingDate: "", degree: "", university: "" },
      ],
    });
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    const qualifications = formData.qualifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, qualifications });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const experiences = [...formData.experiences];
    experiences[index][name] = value;
    setFormData({ ...formData, experiences });
  };

  const addExperience = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { startingDate: "", endingDate: "", position: "", hospital: "" },
      ],
    });
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    const experiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences });
  };

  const handleTimeSlotChange = (e, index) => {
    const { name, value } = e.target;
    const timeSlots = [...formData.timeSlots];
    timeSlots[index][name] = value;
    setFormData({ ...formData, timeSlots });
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      timeSlots: [
        ...formData.timeSlots,
        { day: "", startingTime: "", endingTime: "" },
      ],
    });
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    const timeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, timeSlots });
  };

  const formatTimeSlots = (timeSlots) => {
    return timeSlots.map((slot) => ({
      time: `${slot.day} ${slot.startingTime}-${slot.endingTime}`,
      available: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      timeSlots: formatTimeSlots(formData.timeSlots),
    };
    try {
      const res = await fetch(`${BASE_URL}/doctors/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to register doctor");
      }
      toast.success("Doctor registered successfully");
    } catch (error) {
      toast.error(error.message || "Server error");
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <p className="form__label">ชื่อจริง</p>
          <input
            onChange={handleInputChange}
            type="text"
            name="name"
            value={formData.name}
            placeholder="ชื่อ"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">อีเมล</p>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="อีเมล"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">เบอร์โทรศัพท์</p>
          <input
            onChange={handleInputChange}
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="เบอร์โทรศัพท์"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio</p>
          <input
            onChange={handleInputChange}
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">รหัสผ่าน</p>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            value={formData.password}
            placeholder="รหัสผ่าน"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">เพศ</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="male">เพศชาย</option>
                <option value="female">เพศหญิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
            <div>
              <p className="form__label">สาขาวิชาแพทยศาสตร์</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="orthopedics">แพทย์กระดูก</option>
                <option value="cardiac Surgeon">ศัลยแพทย์หัวใจ</option>
                <option value="general Surgeon">ศัลยแพทย์ทั่วไป</option>
                <option value="neurologist">อายุรกรรมประสาท</option>
                <option value="oncologist">อายุรกรรมมะเร็ง</option>
                <option value="psychiatrist">จิตแพทย์</option>
              </select>
            </div>

            <div>
              <p className="form__label">ราคา consult</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="mb-5">
            <p className="form__label">คุณวุฒิ</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">วันแรก</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">วันสุดท้าย</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Degree</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">มหาวิทยาลัย</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteQualification(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addQualification}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              เพื่มคูณวุติ
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">ประสบการณ์</p>
            {formData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">วันแรก</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">วันสุดท้าย</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">ตำแหน่งงาน</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">โรงพยาบาล</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteExperience(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              เพิ่มประสบการณ์
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">ช่วงเวลานัด</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="form__label">วัน</p>
                      <select
                        name="day"
                        value={item.day}
                        onChange={(e) => handleTimeSlotChange(e, index)}
                        className="form__input py-3.5"
                      >
                        <option value="saturday">วันเสาร์</option>
                        <option value="sunday">วันอาทิตย์</option>
                        <option value="monday">วันจันทร์</option>
                        <option value="tuesday">วันอังคาร</option>
                        <option value="wednesday">วันพุธ</option>
                        <option value="thursday">วันพฤหัสบดี</option>
                        <option value="friday">วันศุกร์</option>
                      </select>
                    </div>
                    <div>
                      <p className="form__label">ช่วงเวลาแรก</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">ช่วงเวลาสุดท้าย</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="flex items-center"
                    >
                      <button className="bg-red-600 p-2 rounded-full text-white text-[18px]  mt-6 cursor-pointer ">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addTimeSlot}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              เพิ่มช่วงเวลา
            </button>
          </div>

          <div className="mb-5">
            <p className="form__label">เกี่ยวกับ</p>
            <textarea
              name="about"
              rows={5}
              value={formData.about}
              placeholder="อธิบายเกี่ยวกีบตัวคุณ"
              onChange={handleInputChange}
              className="form__input"
            ></textarea>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={formData.photo}
                  alt=""
                  className="w-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                accept=".jpg, .png"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer"
              >
                เลือกรูปภาพ
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="bg-primaryColor text-white text-[18px] leading-[30px]  w-full py-3 px-4 rounded-lg"
            >
              ลงทะเบียน
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
