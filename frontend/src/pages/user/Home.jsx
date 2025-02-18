import { useState } from "react";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [turfList, isLoading] = useFetch("/turf/get-turf"); // Fetch turfs from API

    // Filter turfs based on search input (matches title OR address)
    const filteredTurfs = Array.isArray(turfList)
        ? turfList.filter((turf) =>
            searchQuery === "" ||
            turf.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            turf.address?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div
            className="px-8 min-h-screen text-base-content"
            style={{
                backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqDNojODs6oGdDKgS-8Wkqt4gB0K4IDkQ4Q&s')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Welcome Section */}
            <section className="min-h-96 flex flex-col md:flex-row gap-8 px-4 py-10 w-full items-center">
                <div className="w-full md:w-8/12 text-center md:text-left">
                    <h1 className="font-bold text-4xl my-5 text-primary">Welcome to Turf Finder</h1>
                    <p className="text-xl font-normal text-secondary">
                        Find and book the best turfs near you.
                    </p>
                    <div className="mt-6 flex justify-center md:justify-start">
                        <input
                            type="text"
                            placeholder="Search for Turfs or Location..."
                            className="input input-bordered w-full max-w-md bg-base-200 text-base-content placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Search Results */}
            {searchQuery.trim() !== "" && (
                <section className="my-8">
                    <h2 className="text-2xl font-bold text-primary text-center mb-4">Search Results</h2>
                    {isLoading ? (
                        <p className="text-center text-secondary">Loading...</p>
                    ) : filteredTurfs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                            {filteredTurfs.map((turf) => (
                                <TurfCards key={turf._id} turf={turf} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-secondary">No turfs found matching your search.</p>
                    )}
                </section>
            )}
        </div>
    );
};

export default Home;
