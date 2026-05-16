import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const [name, setName] = useState(userData.name || "");
    const [description, setDescription] = useState(userData.description || "");
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleEditProfile = async () => {
        setLoading(true);
        try {
            const formData = new FormData(); 
            formData.append("name", name);
            formData.append("description", description);

            if (photoUrl) {
                formData.append("photoUrl", photoUrl); // 👈 only if exists
            }

            const result = await api.post("/api/user/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(result);
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate("/");
            toast.success("Profile Updated");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Error");
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
                    <FaArrowLeftLong
                        className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer "
                        onClick={() => navigate("/profile")}
                    />
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
                    <form action="" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-col items-center text-center">
                                {userData?.photoUrl ? (
                                    <img
                                        src={userData?.photoUrl}
                                        alt=""
                                        className="w-24 h-24 rounded-full object-cover border-4 border-[black] "
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                                        {userData?.name.slice(0, 1).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="w-full">
                                <label htmlFor="image" className="text-sm font-medium text-gray-700">
                                    Select Avatar
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="photoUrl"
                                    placeholder="PhotoUrl"
                                    accept="image/*"
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    onChange={(e) => setPhotoUrl(e.target.files[0])}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder={userData?.name}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder={userData?.email}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell us about yourself"
                                    rows={3}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
                                />
                            </div>
                            <button
                                className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer "
                                disabled={loading}
                                onClick={handleEditProfile}
                            >
                                {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
