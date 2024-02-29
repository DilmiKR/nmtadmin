import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierPaymentSchema = new Schema(
  {
    supplier: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true
    },
    invoiceValue: {
      type: Number,
      required: true
    },
    paidMethod: {
      type: String,
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
    }
  },
  { timestamps: true }
);

SupplierPaymentSchema.index({ orderId: 1, supplier: 1 }, { unique: true });

const SupplierPayment = mongoose.model("SupplierPayment", SupplierPaymentSchema);
export default SupplierPayment;
