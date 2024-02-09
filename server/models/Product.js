import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    
    ItemName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    nelundeniyaCode: {
        type: String,
      required: true,
      unique: true,
    },
    itemCode: {
        type: String,
        required: true
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    purchasedPrice: {
      type: Number,
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
      },
    category: String,
    companyOrderId: String,
    itemDescription: String,
    brand:String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
