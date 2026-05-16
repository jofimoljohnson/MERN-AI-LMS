import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required:true
    },
    videoUrl:{
        type:String
    },
    isPreviewFree:{
        type:Boolean
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", LectureSchema);