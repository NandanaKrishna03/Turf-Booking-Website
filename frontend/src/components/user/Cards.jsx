/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const TurfCards = ({ turf }) => {
  console.log("turfCard======", turf);

  // Convert category string into an array
  const categories = turf?.category?.[0]?.split(",") || [];
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/turfDetails/${turf?._id}`)}
      className="cursor-pointer transition-transform transform hover:scale-105 duration-300 m-4"
    >
      <div className="card bg-white w-96 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <figure>
          <img
            src={turf?.image || "https://via.placeholder.com/300"}
            alt="turfs"
            className="h-48 w-full object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body p-6 bg-gray-50">
          <h2 className="card-title text-xl font-semibold text-gray-800">
            {turf?.title || "Turf Name"}
          </h2>

          {/* Address */}
          <p className="text-sm text-gray-500 mt-2">
            📍 {turf?.address || "Address not available"}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2">
            {turf?.description || "No description available."}
          </p>

          {/* Categories */}
          <div className="card-actions justify-start gap-2 mt-3">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="badge badge-outline text-blue-600 border-blue-600"
              >
                {cat.trim()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfCards;
