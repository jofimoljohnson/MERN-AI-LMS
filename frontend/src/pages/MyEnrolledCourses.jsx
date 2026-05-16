import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const MyEnrolledCourses = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gray-100 px-4 py-10">

            {/* Back Button */}
            <FaArrowLeftLong
                className="absolute top-6 left-5 md:left-10 w-6 h-6 cursor-pointer text-gray-700 hover:text-black transition"
                onClick={() => navigate("/")}
            />

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                My Enrolled Courses
            </h1>

            {/* Empty State */}
            {userData?.enrolledCourses?.length === 0 ? (
                <div className="flex items-center justify-center mt-20">
                    <p className="text-lg text-gray-500 text-center">
                        You haven't enrolled in any course yet.
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-8">

                    {userData?.enrolledCourses?.map((course, index) => (
                        <div
                            key={index}
                            className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300"
                        >

                            {/* Course Thumbnail */}
                            <img
                                src={course?.thumbnail}
                                alt={course?.title}
                                className="w-full h-[200px] object-cover"
                            />

                            {/* Course Details */}
                            <div className="p-5">

                                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                    {course?.title}
                                </h2>

                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-500">
                                        Category
                                    </p>

                                    <span className="text-sm font-medium text-gray-700">
                                        {course?.category}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-sm text-gray-500">
                                        Level
                                    </p>

                                    <span className="text-sm font-medium text-gray-700">
                                        {course?.level}
                                    </span>
                                </div>

                                {/* Watch Button */}
                                <button
                                    className="w-full py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
                                    onClick={() =>
                                        navigate(`/viewlecture/${course?._id}`)
                                    }
                                >
                                    Watch Now
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default MyEnrolledCourses;