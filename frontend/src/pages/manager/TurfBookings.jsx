import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

export const TurfBookings = () => {
    const { turfId } = useParams();
    const [bookings] = useFetch(`/manager/turf-bookings/${turfId}`);

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Bookings for Turf</h1>

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-semibold mb-3">Bookings</h2>
                {bookings?.length > 0 ? (
                    <ul className="space-y-3">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p><strong>User:</strong> {booking.userName} ({booking.userEmail})</p>
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Time:</strong> {booking.timeSlot}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No bookings yet.</p>
                )}
            </div>
        </div>
    );
};
