import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedBackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, SetReviewText] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefaault();
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
          onChange={(e) => SetReviewText(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn"
        onClick={() => handleSubmitReview()}
      >
        ส่ง
      </button>
    </form>
  );
};

export default FeedBackForm;
