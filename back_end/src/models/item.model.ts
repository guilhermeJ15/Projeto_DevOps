import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Item = model("Item", ItemSchema);