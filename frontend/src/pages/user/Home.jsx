import { useState } from "react";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [turfList, isLoading] = useFetch("/turf/get-turf"); // Fetch turfs from API

    // Filter turfs based on search input
    const filteredTurfs = turfList?.filter((turf) =>
        turf.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className="px-8 min-h-screen text-base-content"
            style={{
                backgroundImage: "url('data:image/jpeg;base64,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')", // Replace with your image path
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
                            placeholder="Search for turfs..."
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
