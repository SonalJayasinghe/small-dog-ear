import mongoose, {Schema} from "mongoose";


const architecture = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,          
        index: true
    },

    description:{
        type:String,
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
    userId: String,
}, 
{timestamps: true})

const ArchitectureModel = mongoose.models.Architecture || mongoose.model("Architecture", architecture);

export default ArchitectureModel;