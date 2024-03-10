import mongoose from "mongoose";

const SupplierViseNelundeniyaCodeSchema = new mongoose.Schema(
  {
   SupplierName: {
    type: String,
    required: true,
  },
  NelundeniyaCode: {
    type: String,
   },
  },
  { timestamps: true }
);

const SupplierViseNelundeniyaCode= mongoose.model("SupplierViseNelundeniyaCode", SupplierViseNelundeniyaCodeSchema);
export default SupplierViseNelundeniyaCode;
