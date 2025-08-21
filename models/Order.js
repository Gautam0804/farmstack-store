import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  amount: Number,
  address: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
