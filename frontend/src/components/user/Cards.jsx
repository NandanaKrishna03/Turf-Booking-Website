/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";


/// eslint-disable-next-line react/prop-types
const TurfCards = ({ turf }) => {
  console.log("turfCard======", turf);

  // Convert category string into an array
  /// eslint-disable-next-line react/prop-types
  const categories = turf?.category?.[0]?.split(",") || [];
  const navigate = useNavigate();
  return (
    /// eslint-disable-next-line react/prop-types
    <div onClick={()=>navigate(`/turfDetails/${turf?._id}`)} className="cursor-pointer">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            /// eslint-disable-next-line react/prop-types
            src={turf?.image || "https://via.placeholder.com/300"}
            alt="turfs"
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title" >
            {turf?.title || "Turf Name"}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{turf?.description || "No description available."}</p>
          <div className="card-actions justify-start gap-2">
            {categories.map((cat, index) => (
              <div key={index} className="badge badge-outline">
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
