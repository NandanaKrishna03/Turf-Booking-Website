import { useState } from "react";
// import { Carrousel } from "../../components/user/Carrousel";

const Home = () => {
    const [user] = useState("user");

    return (
        <div className="px-20 min-h-screen bg-base-100 text-base-content">
            {/* Welcome Section */}
            <section className="min-h-96 flex gap-20 px-20 py-10 w-full ">
                <div className="w-8/12">
                    <h1 className="font-bold text-4xl my-5">Welcome {user}</h1>
                    <p className="text-xl font-normal">
                    Search for the best turf grounds, indoor courts & gymkhana grounds in your city
Search

                    </p>
                </div>
                <div className="w-5/12">
                    <img
                        className="w-full"
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="home-image"
                    />
                </div>
            </section>

            {/* Section 2 */}
            <section className="my-32">
                
            </section>

            {/* Carousel */}
            <section>
                {/* <Carrousel /> */}
            </section>
        </div>
    );
};

export default Home;
