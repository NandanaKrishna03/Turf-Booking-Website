import { useSelector } from "react-redux";
import TurfSkelton from "../../components/shared/Skelton";
import TurfCards from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

function UserTurf() {
    const { isAuthenticated } = useSelector((state) => state.user); // Get authentication state
    const [turfList, isLoading] = useFetch("/turf/get-turf");

    if (!isAuthenticated) {
        return <h2 className="text-center text-xl font-bold mt-10">Please log in to view turfs.</h2>;
    }

    return (
        <div>
            {isLoading ? (
                <TurfSkelton />
            ) : (
                <div className="flex flex-col items-center justify-start px-20 py-16 ">
                    <section>
                        <h1 className="text-2xl font-bold">Your Turfs</h1>
                    </section>
                    <section className="grid grid-rows-3 grid-cols-3 gap-y-10 w-full">
                        {turfList?.map((turf) => (
                            <TurfCards key={turf?._id} turf={turf} />
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
}

export default UserTurf;
