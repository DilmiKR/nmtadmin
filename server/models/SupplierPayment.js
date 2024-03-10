import mongoose from "mongoose";

const SupplierPaymentSchema = new mongoose.Schema(
  {
    nelundeniyaCode: {
      type: String,
      required: true
    },
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


const SupplierPayment = mongoose.model("SupplierPayment", SupplierPaymentSchema);
export default SupplierPayment;
