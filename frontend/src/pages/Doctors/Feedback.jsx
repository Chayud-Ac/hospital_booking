import React, { useState } from "react";
import FeedBackForm from "./FeedBackForm";
import FeedCackCard from "./FeedCackCard";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  console.log(reviews);

  // Select the first 5 reviews
  const displayedReviews = reviews.slice(0, 5);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>
        {displayedReviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          displayedReviews.map((review) => (
            <FeedCackCard key={review._id} review={review} />
          ))
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            ให้ feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedBackForm />}
    </div>
  );
};

export default Feedback;
