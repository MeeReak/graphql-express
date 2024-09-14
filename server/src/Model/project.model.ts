import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  status: { type: String, require: true, enum: ["Pending", "Process", "Done"] },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

export const Project = mongoose.model("Project", projectSchema);
