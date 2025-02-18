/* eslint-disable react/jsx-key */
import { useState } from "react";
import TurfSkelton from "../../components/shared/Skelton";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

function Turf() {
    const [turfList, isLoading] = useFetch("/turf/get-turf");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter turfs based on search query (title OR address)
    const filteredTurfs = Array.isArray(turfList)
        ? turfList.filter((turf) =>
            searchQuery === "" ||
            turf.title?.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            turf.address?.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div 
            className="flex flex-col items-center justify-start px-10 py-16 min-h-screen"
            style={{
                background: "linear-gradient(to right, #f8fafc, #e0f2fe)",
            }}
        >
            <section className="w-full max-w-4xl text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Find Your Perfect Turf</h1>
                <p className="text-lg text-gray-600">Search for the best turfs available near you.</p>
            </section>

            {/* Search Input */}
            <div className="w-full max-w-2xl flex items-center bg-white shadow-md rounded-lg overflow-hidden p-2 mb-6">
                <input
                    type="text"
                    placeholder="Search for Turf or Location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                />
                <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
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
                        <p className="text-gray-500 col-span-3 text-center">No turfs found.</p>
                    )}
                </section>
            )}
        </div>
    );
}

export default Turf;
