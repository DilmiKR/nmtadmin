import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierPaymentSchema = new Schema(
  {
    supplier: {
      type: String,
      ref: 'Supplier',
      required: true
    },
    orderId: {
      type: String,
      ref: 'Product',
      required: true
    },
    invoiceValue: {
      type: Number,
      ref: 'Product',
      required: true
    },
    paidMethod: {
      type: String,
      required: true
    },
    cashValue: {
      type: Number,
    },
    chequeValue: {
      type: Number,
      
    },
    chequeDate: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

SupplierPaymentSchema.index({ orderId: 1, supplier: 1 }, { unique: true });

const SupplierPayment = mongoose.model("SupplierPayment", SupplierPaymentSchema);
export default SupplierPayment;
