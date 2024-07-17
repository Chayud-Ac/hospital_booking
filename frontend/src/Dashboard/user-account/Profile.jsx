import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
        gender: user.gender || "",
        bloodType: user.bloodType || "",
      });
    }
  }, [user]);

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from local storage
        },
        body: JSON.stringify(formData),
      });
      const { message, updatedUser } = await res.json(); // Assuming the API returns the updated user data

      if (!res.ok) {
        toast.error(message);
        throw new Error(message);
      }

      // Dispatch the updated user data

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="ชื่อจริง"
            name="name"
            value={formData.name || ""}
            onChange={(e) => handleInputChange(e)}
            className="w-full px-4 py-3 border-b  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="อีเมล"
            name="email"
            value={formData.email || ""}
            onChange={(e) => handleInputChange(e)}
            className="w-full px-4 py-3 border-b  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="กรุ๊ปเลือด"
            name="bloodType"
            value={formData.bloodType || ""}
            onChange={(e) => handleInputChange(e)}
            className="w-full px-4 py-3 border-b  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label
            htmlFor=""
            className="text-headingColor font-bold text-[16px] leading-7"
          >
            เพศ :
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={(e) => handleInputChange(e)}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="male">เพศชาย</option>
              <option value="female">เพศหญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          </label>
        </div>

        <div className="mb-6 flex items-center gap-3">
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
              className="hidden" // This hides the default file input
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
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? (
              <HashLoader size={35} color="#ffffff" />
            ) : (
              "อัปเดตโปรไฟล์"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
