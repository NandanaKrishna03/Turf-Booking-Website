// ViewAllTurfs.jsx
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

const ViewAllTurfs = () => {
    const [turfs, isLoading, error, refetch] = useFetch("/admin/turfs");

    const handleDeleteTurf = async (turfId) => {
        try {
            console.log("Deleting Turf with ID:", turfId);
            const response = await axiosInstance.delete(`/turf/delete-turf/${turfId}`);
            console.log("Delete Response:", response);
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting turf:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading turf.</div>;
    }

  return (
    <div>
      <h1>All Turfs</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            
            <th>Price</th>
            
          </tr>
        </thead>
        <tbody>
          {turfs?.map((turf) => (
            <tr key={turf._id}>
              <td>{turf.title}</td>
              
              <td>{turf.price}</td>
              
              <td>
                                <button onClick={() => handleDeleteTurf(turf._id)}>
                                    Delete
                                </button>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllTurfs;
