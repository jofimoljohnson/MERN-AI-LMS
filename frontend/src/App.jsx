import { Navigate, Route, Routes } from "react-router-dom";
import {
    AllCourses,
    Courses,
    CreateCourse,
    CreateLecture,
    Dashboard,
    EditCourse,
    EditLecture,
    EditProfile,
    ForgotPassword,
    Home,
    Login,
    MyEnrolledCourses,
    Profile,
    SearchWithAi,
    SignUp,
    ViewCourses,
    ViewLectures,
} from "./pages";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import getCreatorCourse from "./customHooks/getCreatorCourse";
import getPublishedCourse from "./customHooks/getPublishedCourse";
import { ScrollToTop } from "./component";
import getAllReviews from "./customHooks/getAllReviews";

const App = () => {
    getCurrentUser();
    getCreatorCourse();
    getPublishedCourse();
    getAllReviews();
    const { userData } = useSelector((state) => state.user);

    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
                <Route path="/forget" element={userData ? <ForgotPassword /> : <Navigate to={"/signup"} />} />
                <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
                <Route path="/allcourses" element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />

                <Route
                    path="/dashboard"
                    element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />}
                />
                <Route
                    path="/courses"
                    element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />}
                />
                <Route
                    path="/createcourse"
                    element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/signup"} />}
                />
                <Route
                    path="/editcourse/:courseId"
                    element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />}
                />
                <Route
                    path="/createlecture/:courseId"
                    element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />}
                />
                <Route
                    path="/editlecture/:courseId/:lectureId"
                    element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />}
                />
                <Route path="/viewcourse/:courseId" element={userData ? <ViewCourses /> : <Navigate to={"/signup"} />} />
                <Route path="/viewlecture/:courseId" element={userData ? <ViewLectures /> : <Navigate to={"/signup"} />} />

                <Route path="/mycourses" element={userData ? <MyEnrolledCourses /> : <Navigate to={"/signup"} />} />
                <Route path="/search" element={userData ? <SearchWithAi /> : <Navigate to={"/signup"} />} />
            </Routes>
        </>
    );
};

export default App;
