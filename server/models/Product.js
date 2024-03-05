import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },

    nelundeniyaCode: {
      type: String,
      required: true
    },

    itemCode: {
      type: String,
      required: true
    },

    ItemName: {
      type: String,
      required: true,
      min: 2,
    },
    
    brand: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    
    UnitPrice: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
    },

    supplierDiscount: {
      type: Number,
      required: true
    },

    LineValue: {
      type: Number,
      required: true
    },

    purchasedPrice: {
      type: Number,
      required: true
    },

    sellingPrice: {
      type: Number,
      required: true
    },
    
    Supplier: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },

    OrderID: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },

    OrderDeliveryDate: {
      type: Date,
      required: true,
    },
    
    UOM: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    soldQuantity: {
      type: Number,
    },
    itemDescription: String
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
