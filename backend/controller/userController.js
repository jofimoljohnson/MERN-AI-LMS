import User from "../models/User.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Some error occured",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { description, name } = req.body;

        let photoUrl; // ✅ correct variable name

        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path);
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { name, description, photoUrl },
            { new: true } // updated user return cheyyan
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Some error occured",
        });
    }
};