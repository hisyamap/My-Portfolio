import mongoose, { Schema } from "mongoose";

const emailLogSchema = new Schema({
        email: { type: String, required: true},
        ip: { type: String, required: true}
    },
    { timestamps: true }
);

export default mongoose.model("emailLog", emailLogSchema);