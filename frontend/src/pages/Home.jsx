


import {
    About,
    CardPage,
    ExploreCourses,
    Footer,
    Logos,
    Navbar,
    ReviewPage,
} from "../component";

import home from "../assets/home.jpg";
import ailogo from "../assets/ai.png";
import ailogo1 from "../assets/SearchAi.png";

import { SiViaplay } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full overflow-x-hidden">

            {/* Hero Section */}
            <div className="w-full lg:h-[140vh] h-[70vh] relative">

                <Navbar />

                <img
                    src={home}
                    alt=""
                    className="w-full lg:h-full h-[50vh] object-cover md:object-fill"
                />

                {/* Heading */}
                <span className="text-white font-bold absolute w-full flex items-center justify-center lg:text-[70px] md:text-[40px] text-[20px] lg:top-[10%] top-[15%] text-center px-3">
                    Grow your skills to Advance
                </span>

                <span className="text-white font-bold absolute w-full flex items-center justify-center lg:text-[70px] md:text-[40px] text-[20px] lg:top-[18%] top-[20%] text-center px-3">
                    Your Career Path
                </span>

                {/* Buttons */}
                <div className="absolute w-full flex items-center justify-center gap-3 flex-wrap lg:top-[30%] md:top-[80%] top-[75%] px-3">

                    <button
                        className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center"
                        onClick={() => navigate("/allcourses")}
                    >
                        View All Courses

                        <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
                    </button>

                    <button
                        className="px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center"
                        onClick={() => navigate("/search")}
                    >
                        Search With Ai

                        <img
                            src={ailogo}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full hidden lg:block"
                        />

                        <img
                            src={ailogo1}
                            alt=""
                            className="w-[35px] h-[35px] rounded-full lg:hidden"
                        />
                    </button>
                </div>
            </div>

            <Logos />
            <ExploreCourses />
            <CardPage />
            <About />
            <ReviewPage />
            <Footer />
        </div>
    );
};

export default Home;
