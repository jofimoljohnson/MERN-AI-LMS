import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import logo from "../assets/logo.png";

const Navbar = () => {
    const { userData } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    const [showHam, setShowHam] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const result = await api.get("/api/auth/logout");
            console.log(result.data);

            dispatch(setUserData(null));
            toast.success("Logout successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-50">
            
            {/* Logo */}
            <div>
                <img
                    src={logo}
                    alt=""
                    className="w-[100px] rounded-[5px] border-2 border-white cursor-pointer"
                />
            </div>

            {/* Large Screen */}
            <div className="relative hidden lg:flex w-[30%] items-center justify-center gap-4">

                {!userData && (
                    <IoPersonCircle
                        className="w-[50px] h-[40px] fill-black cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                    />
                )}

                {userData?.photoUrl ? (
                    <img
                        src={userData?.photoUrl}
                        className="w-[50px] h-[50px] rounded-full border-2 border-white bg-black cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                    />
                ) : (
                    <div
                        className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        {userData?.name?.slice(0, 1).toUpperCase()}
                    </div>
                )}

                {userData?.role === "educator" && (
                    <div
                        className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </div>
                )}

                {!userData ? (
                    <span
                        className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] cursor-pointer bg-[#000000d5]"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                ) : (
                    <span
                        className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </span>
                )}

                {/* Dropdown */}
                {show && (
                   <div className="absolute z-50 top-[120%] right-0 flex flex-col gap-3 bg-black px-[12px] py-[12px] rounded-xl border border-gray-300 shadow-lg">

                        <span
                           className="w-[160px] text-center bg-white text-black px-[20px] py-[10px] rounded-lg cursor-pointer hover:bg-gray-300 transition"
                            onClick={() => {
                                setShow(false);
                                navigate("/profile");
                            }}
                        >
                            My Profile
                        </span>

                        <span
                           className="w-[160px] text-center bg-white text-black px-[20px] py-[10px] rounded-lg cursor-pointer hover:bg-gray-300 transition"
                            onClick={() => {
                                setShow(false);
                                navigate("/mycourses");
                            }}
                        >
                            My Courses
                        </span>
                    </div>
                )}
            </div>

            {/* Hamburger */}
            <RxHamburgerMenu
                className="w-[35px] text-white h-[35px] lg:hidden fill-black cursor-pointer"
                onClick={() => setShowHam((prev) => !prev)}
            />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${
                    showHam
                        ? "translate-x-[0] transition duration-500"
                        : "translate-x-[-100%] transition duration-700"
                }`}
            >
                <GiSplitCross
                    className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
                    onClick={() => setShowHam((prev) => !prev)}
                />

                {userData?.photoUrl ? (
                    <img
                        src={userData?.photoUrl}
                        className="w-[50px] h-[50px] rounded-full border-2 bg-black border-white cursor-pointer"
                    />
                ) : (
                    <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
                        {userData?.name?.slice(0, 1).toUpperCase()}
                    </div>
                )}

                <div
                    className="w-[200px] h-[65px] flex items-center justify-center border-2 text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
                    onClick={() => {
                        setShowHam(false);
                        navigate("/profile");
                    }}
                >
                    My Profile
                </div>

                <div
                    className="w-[200px] h-[65px] flex items-center justify-center border-2 text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
                    onClick={() => {
                        setShowHam(false);
                        navigate("/mycourses");
                    }}
                >
                    My Courses
                </div>

                {userData?.role === "educator" && (
                    <div
                        className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </div>
                )}

                {!userData ? (
                    <span
                        className="w-[200px] h-[65px] border-2 border-white flex items-center justify-center text-white rounded-[10px] text-[18px] cursor-pointer bg-black"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                ) : (
                    <span
                        className="w-[200px] h-[65px] border-2 border-white flex items-center justify-center text-white rounded-[10px] text-[18px] cursor-pointer bg-black"
                        onClick={handleLogout}
                    >
                        Logout
                    </span>
                )}
            </div>
        </div>
    );
};

export default Navbar;