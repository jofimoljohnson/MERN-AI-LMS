import { About, CardPage, ExploreCourses, Footer, Logos, Navbar, ReviewPage } from "../component";
import home from "../assets/home.jpg";
import { SiViaplay } from "react-icons/si";
import ailogo from "../assets/ai.png";
import ailogo1 from "../assets/SearchAi.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate()
    return (
        <div className="w-[100%] overflow-hidden">
            <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
                <Navbar />
                <img src={home} alt="" className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]" />
                <span className="text-white lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center font-bold text-[20px]">
                    Grow your skills to Advance
                </span>
                <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold  ">
                    Your carrer path
                </span>
                <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
                    <button className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer " onClick={()=>navigate('/allcourses')}>
                        View All Courses <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
                    </button>
                    <button className="px-[20px] py-[10px]  lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center" onClick={()=>navigate('/search')}>
                        Search With Ai
                        <img src={ailogo} alt="" className="w-[30px] h-[30px] rounded-full hidden lg:block" />
                        <img src={ailogo1} alt="" className="w-[35px] h-[35px] rounded-full lg:hidden" />
                    </button>
                </div>
            </div>
            <Logos />
            <ExploreCourses/>
            <CardPage/>
            <About/>
            <ReviewPage/>
            <Footer/>
        </div>
    );
};

export default Home;
