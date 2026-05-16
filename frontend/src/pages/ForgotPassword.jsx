import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // step-1
    const sendOtp = async () => {
        setLoading(true);
        try {
            const result = await api.post("/api/auth/sendotp", { email });
            console.log(result.data);
            setLoading(false);
            setStep(2);
            toast.success(result.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    //step-2
    const verifyOTP = async () => {
        setLoading(true);
        try {
            const result = await api.post("/api/auth/verifyotp", { email, otp });
            console.log(result.data);
            setLoading(false);
            toast.success(result.data.message);
            setStep(3);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    //step-3

    const resetPassword = async () => {
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                return toast.error("Password is not mateched");
            }
            const result = await api.post("/api/auth/resetpassword", { email, password: newPassword });
            console.log(result.data);
            toast.success(result.data.message);
            navigate("/login");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {step == 1 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full ">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget your password</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Enter your email address
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                                placeholder="you@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
                            onClick={sendOtp}
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
                        </button>
                    </form>
                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={() => navigate("/login")}>
                        Back to Login
                    </div>
                </div>
            )}

            {step == 2 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full ">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                Please enter the 4- digit code sent to your email
                            </label>
                            <input
                                type="text"
                                id="otp"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                                placeholder="* * * *"
                                required
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
                            onClick={verifyOTP}
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={30} color="white" /> : "   Verify OTP"}
                        </button>
                    </form>
                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={() => navigate("/login")}>
                        Back to Login
                    </div>
                </div>
            )}

            {step == 3 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full ">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Enter a new password below to region access to your account
                    </p>
                    <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="text"
                                id="password"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                                placeholder="* * * * * * * * * *"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="conpassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="text"
                                id="conpassword"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                                placeholder="* * * * * * * * * *"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
                            onClick={resetPassword}
                            disabled={loading} >
                                {
                                    loading?<ClipLoader size={30} color="white"/>:"Reset Password"
                                }
                            
                        </button>
                    </form>
                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={() => navigate("/login")}>
                        Back to Login
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
