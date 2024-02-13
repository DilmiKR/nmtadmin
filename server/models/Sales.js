import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      unique: true,
    },
    products: [
      {
        productId:{
          type:String,
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        soldQuantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        lineTotal: {
          type: Number,
          required: true,
        },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    reducedFinalPrice: {
       type:Number,
       required: true,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", SalesSchema);
export default Sales;
