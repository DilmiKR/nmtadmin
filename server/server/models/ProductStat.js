import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    
    nelundeniyaCode: {
        type: String,
      required: true,
    },
    category: String,
    itemDescription: String,
    brand:String,
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
