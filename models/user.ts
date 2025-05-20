import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
});

const User = models.User || mongoose.model("User", userSchema);
export default User;