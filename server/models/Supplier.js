import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    
    ContactPerson: {
        type: String,
      required: true,
      unique: true,
    },

    Email: String,
    Phone: String,
    SupplierName: {
      type: String,
      required: true,
  },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
