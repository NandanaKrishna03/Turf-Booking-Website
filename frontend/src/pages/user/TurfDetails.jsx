import { useParams, useNavigate } from "react-router-dom";
import TurfSkelton from "../../components/shared/Skelton";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState, useContext } from "react";
import TurfReviews from "./TurfReview";
import { axiosInstance } from "../../config/axiosInstance";
import { ThemeContext } from "../../context/ThemeContext";

function TurfDetails() {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const [userId, setUserId] = useState(null);

  // Fetch turf details
  const [turfDetails, isLoading, error] = useFetch(`/turf/turfDetails/${turfId}`);

  // Fetch the logged-in user's ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axiosInstance.get("/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserId(response.data.user._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  if (isLoading) return <TurfSkelton />;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg">Error fetching data!</p>;

  const handleBookingRedirect = () => {
    navigate(`/user/create-booking/${turfId}`, { state: { turf: turfDetails } });
  };

  return (
    <div
      className={`container mt-20 mx-auto px-6 py-12 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Title Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-extrabold">Turf Details</h1>
        <p className="text-lg mt-2 opacity-80">Discover the best turf experience</p>
      </section>

      {/* Turf Details Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={turfDetails?.image || "https://source.unsplash.com/600x400/?sports,turf"}
            alt="Turf"
            className="w-full max-w-lg h-80 object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">{turfDetails?.title}</h2>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {turfDetails?.description}
          </p>

          <div className="space-y-2">
            <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <span className="font-semibold">Category:</span> {turfDetails?.category}
            </p>
            <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <span className="font-semibold">Location:</span> {turfDetails?.address}
            </p>
            <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <span className="font-semibold">Price:</span> ₹{turfDetails?.price}
            </p>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBookingRedirect}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-xl ${
              isDarkMode
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Turf Reviews Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <TurfReviews turfId={turfId} userId={userId} />
      </section>
    </div>
  );
}

export default TurfDetails;
