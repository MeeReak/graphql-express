import mongoose from "mongoose";

const clintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  phone: { type: String, require: true },
});

export const Client = mongoose.model("Client", clintSchema);
