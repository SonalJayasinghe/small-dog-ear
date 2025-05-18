import mongoose from "mongoose";

const risen_arch = new mongoose.Schema({
    architecture: {
        type: String,
        required: true,
    },

    default_sections: [
        {
            section_name: {
                type: String,
                required: true,
            },
            section_description: {
                type: String,
            },
        }
    ]
})

const Risen_Arch = mongoose.models.Risen_Arch || mongoose.model("Risen_Arch", risen_arch);

export default Risen_Arch;