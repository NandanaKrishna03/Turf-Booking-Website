
import TurfSkelton from "../../components/shared/Skelton";
import TurfCards from "../../components/user/Cards";

import  {useFetch} from "../../hooks/useFetch";

function Turf() {
 
const [turfList,isLoading]=useFetch("/turf/get-turf")


return (
<div>
{isLoading ? (
    <TurfSkelton />
) : (
    <div className="flex flex-col items-center justify-start px-20 py-16 ">
        <section>
            <h1 className="text-2xl font-bold">Course listing page</h1>
        </section>
        <section className="grid grid-rows-3 grid-cols-3  gap-y-10 w-full">
            {turfList?.map((turf,) => (
                <TurfCards key={turf?._id} turf={turf} />
            ))}
        </section>
    </div>
)}
</div>
);
};
export default Turf;
