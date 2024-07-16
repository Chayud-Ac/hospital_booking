import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

const FeedBackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("ไม่มีข้อความในช่องรีวิว");
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText, doctor: id }), // No need to pass user ID here
      });

      const result = await res.json();

      if (!res.ok) {
        setLoading(false);
        return toast.error(result.message);
      }

      setLoading(false);
      toast.success("รีวิวส่งสำเร็จ");
    } catch (error) {
      setLoading(false);
      toast.error("เกิดข้อผิดพลาดในการรีวิว");
    }
  };

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          ประสบการณ์กับแพทย์เป็นอย่างไรบ้างครับ
        </h3>
        <div>
          {[...Array(5)].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions
        </h3>

        <textarea
          className="border border-solid boder-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="เขียนข้อความ"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn"
        onClick={(e) => handleSubmitReview(e)}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : "ส่ง"}
      </button>
    </form>
  );
};

export default FeedBackForm;
