import { useState } from "react";
import TurfSkelton from "../../components/shared/Skelton";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

function Turf() {
    const [turfList, isLoading] = useFetch("/turf/get-turf");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter turf list based on search query
    const filteredTurfs = turfList?.filter((turf) =>
        turf.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-start px-20 py-16">
            <section className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Turf Listing Page</h1>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Turf..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 text-black"
                />
            </section>

            {isLoading ? (
                <TurfSkelton />
            ) : (
                <section className="grid grid-rows-3 grid-cols-3 gap-y-10 w-full">
                    {filteredTurfs?.length > 0 ? (
                        filteredTurfs.map((turf) => (
                            <TurfCards key={turf?._id} turf={turf} />
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
