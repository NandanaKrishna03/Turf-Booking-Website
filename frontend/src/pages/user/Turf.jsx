import { useState, useContext } from "react";
import TurfSkelton from "../../components/shared/Skelton";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ThemeContext } from "../../context/ThemeContext";

function Turf() {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    const [turfList, isLoading] = useFetch("/turf/get-turf");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter turfs based on search query (title OR address)
    const filteredTurfs = Array.isArray(turfList)
        ? turfList.filter((turf) =>
            searchQuery === "" ||
            turf.title?.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            turf.address?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div
            className={`mt-20 flex flex-col items-center justify-start px-10 py-16 min-h-screen transition-all duration-300 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800"
            }`}
        >
            <section className="w-full max-w-4xl text-center mb-6">
                <h1 className="text-4xl font-extrabold mb-2">
                    Find Your Perfect Turf
                </h1>
                <p className="text-lg opacity-80">Search for the best turfs available near you.</p>
            </section>

            {/* Search Input */}
            <div className={`w-full max-w-2xl flex items-center shadow-md rounded-lg overflow-hidden p-2 mb-6 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}>
                <input
                    type="text"
                    placeholder="Search for Turf or Location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-3 focus:outline-none ${
                        isDarkMode ? "bg-gray-800 text-white placeholder-gray-400" : "text-gray-700"
                    }`}
                />
                <button className={`px-5 py-3 font-semibold rounded-lg transition duration-300 ${
                    isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}>
                    Search
                </button>
            </div>

            {/* Turf Listings */}
            {isLoading ? (
                <TurfSkelton />
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 w-full max-w-7xl">
                    {filteredTurfs.length > 0 ? (
                        filteredTurfs.map((turf) => (
                            <div key={turf?._id} className="transition-transform transform hover:scale-105 duration-300 m-4">
                                <TurfCards turf={turf} />
                            </div>
                        ))
                    ) : (
                        <p className="opacity-70 col-span-3 text-center">No turfs found.</p>
                    )}
                </section>
            )}
        </div>
    );
}

export default Turf;
