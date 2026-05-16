import { useState } from "react";
import logo from '../assets/logo.png'
import google from "../assets/google.webp";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
const SignUp = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const response = await api.post("/api/auth/signup", { name, email, password, role });
            console.log(response.data);
            setLoading(false);
            dispatch(setUserData(response.data));
            navigate("/");
            toast.success("Signup successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            console.log(response);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;
            const result = await api.post("/api/auth/googleauth", { name, email, role });
            console.log(result);
            dispatch(setUserData(result.data));
            navigate("/");
            toast.success("Signup successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center gap-3 ">
            <form
                className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
                onSubmit={(e) => e.preventDefault()}
            >
                {/* left */}
                <div className="md-w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
                    <div>
                        <h1 className="font-semibold text-[black] text-2xl">let's get started</h1>
                        <h2 className="text-[#999797] text-[18px]">Cretae your account</h2>
                    </div>
                    <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
                        <label htmlFor="name" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
                        <label htmlFor="name" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative ">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type={show ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
                        />
                        {!show ? (
                            <IoEyeOutline
                                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                                onClick={() => setShow((prev) => !prev)}
                            />
                        ) : (
                            <IoEye
                                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                                onClick={() => setShow((prev) => !prev)}
                            />
                        )}
                    </div>
                    <div className="flex md:w-[50%] w-[70%] items-center justify-between">
                        <span
                            className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[646464]"}`}
                            onClick={() => setRole("student")}
                        >
                            Student
                        </span>
                        <span
                            className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : "border-[646464]"}`}
                            onClick={() => setRole("educator")}
                        >
                            Educator
                        </span>
                    </div>
                    <button
                        className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
                        disabled={loading}
                        onClick={handleSignUp}
                    >
                        {loading ? <ClipLoader size={30} color="white" /> : "SignUp"}
                    </button>
                    <div className="w-[80%] flex items-center gap-2">
                        <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
                        <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
                            Or Continue
                        </div>
                        <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
                    </div>
                    <div
                        className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer"
                        onClick={googleSignUp}
                    >
                        <img src={google} alt="" className="w-[35px] " />
                        <span className="text-[18px] text-gray-500">Google</span>
                    </div>
                    <div className="text-[#6f6f6f]">
                        already have an account?
                        <span
                            className="underline underline-offset-1  text-[black] cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </div>
                </div>
                {/* right */}
                <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
                    <img src={logo} alt="logo" className="w-30 shadow-2xl" />
                    <span className="text-2xl text-white">LEARN SPHERE</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
