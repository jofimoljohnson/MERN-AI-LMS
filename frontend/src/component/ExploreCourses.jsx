import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BsOpenai } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
                {/* left top div */}
                <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
                    <span className="text-[35px] font-semibold">Explore</span>
                    <span className="text-[35px] font-semibold">Our Courses</span>
                    <p className="text-[17px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, architecto. Illo est
                        exercitationem, molestiae tenetur corrupti quos, reiciendis fugit quibusdam blanditiis porro magni
                        dolores consectetur dolor corporis fuga voluptatem cumque?
                    </p>

                    <button className="px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer" onClick={()=>navigate('/allcourses')}>
                        Explore Courses
                        <SiViaplay className="w-[30px] h-[30px] fill-white fill-black" />
                    </button>
                </div>

                {/* right bottom  div */}
                <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
                            <TbDeviceDesktopAnalytics className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        Web Dev
                    </div>

                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px]  bg-[#d9fbe0]  rounded-lg flex items-center justify-center">
                            <LiaUikit className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        UI/UX Designing
                    </div>

                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#c279c2] rounded-lg flex items-center justify-center">
                            <MdAppShortcut className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        App Dev
                    </div>
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center">
                            <FaHackerrank className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        Ethical Hacking
                    </div>
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#d032d0] rounded-lg flex items-center justify-center">
                            <AiFillOpenAI className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        AI/ML
                    </div>
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#87cb81] rounded-lg flex items-center justify-center">
                            <SiGoogledataproc className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        Data Science
                    </div>
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#b1831e] rounded-lg flex items-center justify-center">
                            <BsFillClipboardDataFill className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        Data Analytics
                    </div>
                    <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
                        <div className="w-[100px] h-[90px] bg-[#de3957] rounded-lg flex items-center justify-center">
                            <BsOpenai className="w-[50px] h-[50px] text-[#6d6c6c]" />
                        </div>
                        Ai Tools
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExploreCourses;
