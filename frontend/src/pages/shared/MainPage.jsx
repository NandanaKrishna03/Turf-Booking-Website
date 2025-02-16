import { useState } from "react";
import { ManagerBooking } from "../manager/ManagerBooking";
import { MyBookings } from "../user/MyBookings";

export const MainPage = () => {
  const [refetch, setRefetch] = useState(false);

  const handleRefetch = () => {
    setRefetch((prev) => !prev); // Trigger refetch in ManagerBooking
  };

  return (
    <div>
      <ManagerBooking refetch={refetch} />
      <MyBookings onBookingChange={handleRefetch} />
    </div>
  );
};
