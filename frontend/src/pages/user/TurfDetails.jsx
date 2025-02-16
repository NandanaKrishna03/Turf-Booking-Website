import { useParams, useNavigate } from "react-router-dom";
import TurfSkelton from "../../components/shared/Skelton";
import { useFetch } from "../../hooks/useFetch";

function TurfDetails() {
  const { turfId } = useParams();
  const navigate = useNavigate();

  // Fetch turf details
  const [turfDetails, isLoading, error] = useFetch(`/turf/turfDetails/${turfId}`);

  if (isLoading) return <TurfSkelton />;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg">Error fetching data!</p>;

  const handleBookingRedirect = () => {
    navigate(`/user/create-booking/${turfId}`, { state: { turf: turfDetails } });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Title Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Turf Details</h1>
        <p className="text-lg text-gray-600 mt-2">Discover the best turf experience</p>
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
          <h2 className="text-3xl font-semibold text-gray-800">{turfDetails?.title}</h2>
          <p className="text-lg text-gray-600">{turfDetails?.description}</p>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Category:</span> {turfDetails?.category}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Location:</span> {turfDetails?.address}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Price:</span> ₹{turfDetails?.price}
            </p>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBookingRedirect}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-xl"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default TurfDetails;
