import { useNavigate } from "react-router-dom";
import { Card, Navbar } from "../component";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import searchai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AllCourses = () => {
    const navigate = useNavigate();
    const { courseData } = useSelector((state) => state.course);

    const [category, setCategory] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((c) => c !== e.target.value));
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let courseCopy = courseData?.slice() || [];

        if (category.length > 0) {
            courseCopy = courseCopy.filter((c) => category.includes(c.category));
        }

        setFilterCourses(courseCopy);
    };

    useEffect(() => {
        setFilterCourses(courseData || []);
    }, [courseData]);

    useEffect(() => {
        applyFilter();
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <Navbar />

            {/* Mobile Menu Button */}
            <div className="fixed top-[85px] left-4 z-50 md:hidden">
                <button
                    onClick={() => setShowSidebar(true)}
                    className="
                        bg-black text-white
                        p-3
                        rounded-xl
                        shadow-xl
                        active:scale-95
                        transition
                    "
                >
                    <HiOutlineMenuAlt3 size={26} />
                </button>
            </div>

            <div className="flex relative">
                {/* Overlay */}
                {showSidebar && (
                    <div
                        className="
                            fixed inset-0
                            bg-black/50
                            z-40
                            md:hidden
                        "
                        onClick={() => setShowSidebar(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed top-0 left-0 z-50
                        w-[85%] sm:w-[300px]
                        h-screen overflow-y-auto
                        bg-black text-white
                        px-5 py-6 pt-[100px]
                        transform transition-transform duration-300 ease-in-out

                        ${showSidebar ? "translate-x-0" : "-translate-x-full"}

                        md:translate-x-0
                    `}
                >
                    {/* Heading */}
                    <h2
                        className="
                            text-lg sm:text-xl md:text-2xl
                            font-bold
                            flex items-center gap-3
                            mb-6
                        "
                    >
                        <FaArrowLeftLong
                            className="
                                cursor-pointer
                                text-[18px] sm:text-[22px]
                            "
                            onClick={() => navigate("/")}
                        />
                        Filter by Category
                    </h2>

                    {/* Close Button */}
                    <button
                        onClick={() => setShowSidebar(false)}
                        className="
                            absolute top-5 right-5
                            text-white
                            text-3xl
                            md:hidden
                        "
                    >
                        ✕
                    </button>

                    {/* Filter Form */}
                    <form
                        className="
                            space-y-5
                            text-base
                            bg-gray-700
                            border border-gray-500
                            p-5
                            rounded-2xl
                            shadow-lg
                        "
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* AI Button */}
                        <button
                            className="
                                w-full
                                px-4 py-3
                                bg-white text-black
                                rounded-xl
                                text-sm sm:text-base
                                font-semibold
                                flex items-center justify-center gap-3
                                cursor-pointer
                                hover:scale-[1.02]
                                transition
                            "
                            onClick={()=>navigate('/search')}
                        >
                            Search with Ai
                            <img
                                src={searchai}
                                alt="AI Search"
                                className="
                                    w-[35px] h-[35px]
                                    rounded-full
                                    object-cover
                                "
                            />
                        </button>

                        {/* Categories */}
                        {[
                            "App Development",
                            "AI/ML",
                            "AI Tools",
                            "Data Science",
                            "Data Analytics",
                            "Ethical Hacking",
                            "UI UX Designing",
                            "Web Development",
                            "Others",
                        ].map((item, index) => (
                            <label
                                key={index}
                                className="
                                    flex items-center gap-4
                                    cursor-pointer
                                    text-[15px] sm:text-base
                                    font-medium
                                    hover:text-gray-300
                                    transition
                                "
                            >
                                <input
                                    type="checkbox"
                                    className="
                                        accent-white
                                        w-5 h-5
                                        rounded
                                    "
                                    value={item}
                                    onChange={toggleCategory}
                                />

                                {item}
                            </label>
                        ))}
                    </form>
                </aside>

                {/* Main Content */}
                <main
                    className="
                        w-full
                        pt-[120px]
                        px-3 sm:px-5 md:px-8
                        pb-10
                        md:pl-[320px]
                    "
                >
                    {/* Cards Grid */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-5
                            place-items-center
                            md:place-items-start
                        "
                    >
                        {filterCourses?.map((course, index) => (
                            <Card
                                key={index}
                                thumbnail={course.thumbnail}
                                title={course.title}
                                category={course.category}
                                price={course.price}
                                id={course._id}
                                reviews={course?.reviews}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllCourses;
