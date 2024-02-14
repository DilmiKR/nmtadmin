import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    
    category: {
      type: String,
      required: true
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

    ItemName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    
    brand: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    
    UnitPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    supplierDiscount: {
      type: Number,
      required: true,
    },

    LineValue: {
      type: Number,
      required: true,
    },

    purchasedPrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },
    
    Supplier: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },

    OrderID: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },

    OrderDeliveryDate: {
      type: Date,
      min: 2,
      max: 100,
    },

    UOM: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },

    itemDescription: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    
    itemDescription: String,
    brand:String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
