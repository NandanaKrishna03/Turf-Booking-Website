/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

const TurfCards = ({ turf }) => {
  console.log("turfCard======", turf);

  // Convert category string into an array
  const categories = turf?.category?.[0]?.split(",") || [];
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Get current theme

  return (
    <div
      onClick={() => navigate(`/turfDetails/${turf?._id}`)}
      className="cursor-pointer transition-transform transform hover:scale-105 duration-300 m-4"
    >
      <div
        className={`card w-96 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
          theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
        }`}
      >
        <figure>
          <img
            src={turf?.image || "https://via.placeholder.com/300"}
            alt="turfs"
            className="h-48 w-full object-cover rounded-t-lg"
          />
        </figure>
        <div
          className={`card-body p-6 ${
            theme === "light" ? "bg-gray-50" : "bg-gray-900"
          }`}
        >
          <h2 className="card-title text-xl font-semibold">
            {turf?.title || "Turf Name"}
          </h2>

          {/* Address */}
          <p className="text-sm mt-2">
            📍 {turf?.address || "Address not available"}
          </p>

          {/* Description */}
          <p className="text-sm mt-2">
            {turf?.description || "No description available."}
          </p>

          {/* Categories */}
          <div className="card-actions justify-start gap-2 mt-3">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`badge badge-outline ${
                  theme === "light" ? "text-blue-600 border-blue-600" : "text-blue-300 border-blue-300"
                }`}
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
