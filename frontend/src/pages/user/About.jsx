import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function About() {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark"; // Extracting dark mode boolean

  return (
    <div
      className={`min-h-screen flex flex-col items-center text-center py-12 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-green-50 to-green-100 text-gray-800"
      }`}
    >
      {/* Header Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 drop-shadow-lg">
        TurfNation
      </h1>
      <p className="mt-4 text-lg md:text-xl font-medium max-w-3xl">
        India's leading platform for sports facility booking and management.
        Book your favorite turf, manage your game schedules, and experience
        hassle-free sports engagement with{" "}
        <span className="text-green-600 font-semibold">TurfNation</span>.
      </p>

      {/* About Section */}
      <div
        className={`mt-10 rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl w-full border ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white border-green-200"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600">
          About Us
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          At <span className="font-semibold text-green-700">TurfNation</span>,
          we believe that finding and booking a turf should be as easy as
          stepping onto the field. Whether you're a casual player, a sports
          enthusiast, or a professional athlete, we provide seamless access to
          top-quality sports facilities near you.
        </p>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Instant Booking – Reserve your favorite turf in seconds.",
            "Verified Venues – Play on well-maintained, high-quality turfs.",
            "Flexible Scheduling – Book at your convenience, anytime.",
            "Affordable Rates – Get the best value for your matches.",
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg shadow-md hover:scale-105 transition duration-300 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-green-50 text-gray-700"
              }`}
            >
              <span className="text-green-600 text-2xl">✔</span>
              <p className="font-medium">{feature}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <p className="mt-8 text-xl font-semibold">
          Join us in redefining how sports enthusiasts find and book turfs.
        </p>
        <p className="text-green-600 text-xl font-bold">Let’s Play, Anytime, Anywhere!</p>
      </div>
    </div>
  );
}

export default About;
