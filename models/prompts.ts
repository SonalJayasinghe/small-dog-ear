import mongoose, { Schema, models } from "mongoose";

const promptSchema = new Schema({
  promptName: String,
  promptDescription: String,
  prompt: [
    {
        sectionName: String,
        sectionPrompt: String,
        subsections: [
            {
                subsectionName: String,
                subsectionPrompt: String
            }
        ]
    }
  ],
  userId: String,

},
{timestamps: true});

const Prompt = models.Prompt || mongoose.model("Prompt", promptSchema);
export default Prompt;