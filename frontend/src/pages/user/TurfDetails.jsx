import { useParams, useNavigate } from "react-router-dom";
import TurfSkelton from "../../components/shared/Skelton";
import { useFetch } from "../../hooks/useFetch";

function TurfDetails() {
  const { turfId } = useParams();
  const navigate = useNavigate();

  // Fetch turf details
  const [turfDetails, isLoading, error] = useFetch(`/turf/turfDetails/${turfId}`);

  if (isLoading) return <TurfSkelton />;
  if (error) return <p className="text-red-500">Error fetching data!</p>;

  const handleBookingRedirect = () => {
    navigate(`/user/create-booking/${turfId}`, { state: { turf: turfDetails } });
  };

  return (
    <div className="container mx-auto p-6">
      <section className="text-center">
        <h1 className="text-2xl font-bold">Turf Details</h1>
      </section>

      <section className="flex flex-col items-center space-y-4">
        <img
          src={turfDetails?.image || "https://source.unsplash.com/300x200/?sports,turf"}
          alt="Turf"
          className="w-96 h-60 object-cover rounded-lg shadow-md"
        />
        <h2 className="text-3xl font-bold">{turfDetails?.title}</h2>
        <p className="text-lg">{turfDetails?.description}</p>
        <p className="text-lg font-semibold">Category: {turfDetails?.category}</p>
        <p className="text-lg font-semibold">Address: {turfDetails?.address}</p>
        <p className="text-lg font-semibold">Price: ₹{turfDetails?.price}</p>

        {/* Booking Button */}
        <button
          onClick={handleBookingRedirect}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </section>
    </div>
  );
}

export default TurfDetails;
