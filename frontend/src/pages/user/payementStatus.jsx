import  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";

const PaymentStatus = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your booking. Your payment was processed successfully.</p>
        {sessionId && <p className="mt-2 text-sm text-gray-500">Session ID: {sessionId}</p>}
      </div>
    </div>
  );
};

export default PaymentStatus;
