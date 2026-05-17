import { useState } from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.webp";

import { IoEyeOutline, IoEye } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

import api from "../api/axios";
import { setUserData } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password,
            });

            dispatch(setUserData(response.data));

            toast.success("Login Successfully");

            navigate("/");

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);

            toast.error(error.response.data.message);
        }
    };

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);

            let user = response.user;

            let name = user.displayName;
            let email = user.email;
            let role = "";

            const result = await api.post("/api/auth/googleauth", {
                name,
                email,
                role,
            });

            dispatch(setUserData(result.data));

            toast.success("Login successfully");

            navigate("/");
        } catch (error) {
            console.log(error);

            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-[#dddbdb] w-full min-h-screen flex items-center justify-center overflow-x-hidden px-3 py-5">
            <form
                className="w-full max-w-[800px] min-h-[600px] bg-white shadow-xl rounded-2xl flex relative"
                onSubmit={(e) => e.preventDefault()}
            >
                <FaArrowLeftLong
                    className="absolute top-6 left-5 md:left-10 w-6 h-6 cursor-pointer text-gray-700 hover:text-black transition"
                    onClick={() => navigate("/")}
                />

                {/* Left Section */}
                <div className="w-full md:w-[50%] flex flex-col items-center justify-center gap-4 py-10">
                    <div>
                        <h1 className="font-semibold text-black text-2xl">Welcome back</h1>

                        <h2 className="text-[#999797] text-[18px]">Login in your account</h2>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1 w-[85%]">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="border w-full h-[40px] border-[#e7e6e6] text-[15px] px-[20px] rounded-md outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 w-[85%] relative">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>

                        <input
                            type={show ? "text" : "password"}
                            id="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border w-full h-[40px] border-[#e7e6e6] text-[15px] px-[20px] rounded-md outline-none"
                        />

                        {!show ? (
                            <IoEyeOutline
                                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[12%]"
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <IoEye
                                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[12%]"
                                onClick={() => setShow(false)}
                            />
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        className="w-[85%] h-[42px] bg-black text-white cursor-pointer flex items-center justify-center rounded-md"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={25} color="white" /> : "Login"}
                    </button>

                    {/* Forgot Password */}
                    <span className="text-[13px] cursor-pointer text-[#585757]" onClick={() => navigate("/forget")}>
                        Forgot your password?
                    </span>

                    {/* Divider */}
                    <div className="w-[85%] flex items-center gap-2">
                        <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>

                        <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
                            Or Continue
                        </div>

                        <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
                    </div>

                    {/* Google Login */}
                    <div
                        className="w-[85%] h-[42px] border border-black rounded-md flex items-center justify-center cursor-pointer"
                        onClick={googleLogin}
                    >
                        <img src={google} alt="" className="w-[35px]" />

                        <span className="text-[18px] text-gray-500">Google</span>
                    </div>

                    {/* Signup */}
                    <div className="text-[#6f6f6f]">
                        Create new account?
                        <span
                            className="underline underline-offset-1 text-black cursor-pointer ml-1"
                            onClick={() => navigate("/signup")}
                        >
                            SignUp
                        </span>
                        <div>
                            <p> Razorpay dummy card details:4100 2800 0000 1007</p>
                            <p>CVV:123</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-[50%] bg-black rounded-r-2xl hidden md:flex items-center justify-center flex-col">
                    <img src={logo} alt="logo" className="w-30 shadow-2xl" />

                    <span className="text-2xl text-white">LEARN SPHERE</span>
                </div>
            </form>
        </div>
    );
};

export default Login;
