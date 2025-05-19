import mongoose from "mongoose";

const architecture = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,          
        index: true
    },

    sections: [
        {
            section_name: {
                type: String,
                required: true,
            },
            section_description: {
                type: String,
            },
        }
    ],
    type: {
        type: String,
        enum: ["default", "custom"],
        required: true,

    },
    userId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const Architecture = mongoose.models.Architecture || mongoose.model("Architecture", architecture);

export default Architecture;