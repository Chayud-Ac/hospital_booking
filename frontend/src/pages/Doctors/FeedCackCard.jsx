import { HiStar } from "react-icons/hi";

const FeedCackCard = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        <img
          src={review.user.photo}
          alt={review.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-lg text-gray-800">
            {review.user.name}
          </h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <HiStar
                key={index}
                className={`${
                  index < review.rating ? "text-yellow-400" : "text-gray-300"
                } w-5 h-5`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-gray-600">{review.reviewText}</p>
    </div>
  );
};

export default FeedCackCard;
