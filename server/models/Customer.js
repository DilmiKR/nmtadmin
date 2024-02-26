import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    
    customerName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    totalDebt: {
        type: Number,
      required: true,
    },
    comment: {
      type: String,
    },

  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
