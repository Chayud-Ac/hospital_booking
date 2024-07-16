import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
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
  });

  useEffect(() => {
    if (doctorData) {
      const transformedTimeSlots = doctorData.timeSlots?.map((slot) => {
        const [day, timeRange] = slot.time.split(" ");
        const [startingTime, endingTime] = timeRange.split("-");
        return { day, startingTime, endingTime };
      }) || [{ day: "", startingTime: "", endingTime: "" }];

      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        bio: doctorData.bio || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        ticketPrice: doctorData.ticketPrice || 0,
        qualifications: doctorData.qualifications || [
          { startingDate: "", endingDate: "", degree: "", university: "" },
        ],
        experiences: doctorData.experiences || [
          { startingDate: "", endingDate: "", position: "", hospital: "" },
        ],
        timeSlots: transformedTimeSlots,
        about: doctorData.about || "",
        photo: doctorData.photo || null,
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      timeSlots: formData.timeSlots.map((slot) => ({
        time: `${slot.day} ${slot.startingTime}-${slot.endingTime}`,
        available: true, // Assuming all new slots are available by default
      })),
    };

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message || "เกิดข้อผิดพลาด");
      }

      toast.success(result.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(error.message || "server error");
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        ข้อมูลส่วนตัว
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">ชื่อจริง</p>
          <input
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            type="email"
            name="email"
            value={formData.email}
            placeholder="อีเมล"
            className="form__input"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">เบอร์โทรศัพท์</p>
          <input
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
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
                onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleInputChange(e)}
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
              onClick={(e) => addQualification(e)}
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
              onClick={(e) => addExperience(e)}
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
              onClick={(e) => addTimeSlot(e)}
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
              onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleFileInputChange(e)}
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
              onClick={(e) => updateProfileHandler(e)}
              className="bg-primaryColor text-white text-[18px] leading-[30px]  w-full py-3 px-4 rounded-lg"
            >
              อัปเดตโปรไฟล์
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
