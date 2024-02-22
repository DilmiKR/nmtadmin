import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierPaymentSchema = new Schema(
  {
    orderId: {
      type: String,
      ref: 'products', 
      required: true
    },
    supplier: {
      type: String,
      required: true
    },
    invoiceValue: {
      type: Number,
      required: true
    },
    paidMethod: {
      type: String,
      enum: ['Cash', 'Cheque'], 
      required: true
    },
    checkDate: {
      type: Date,
      required: function() {
        return this.paidMethod === 'Cheque';
      }
    },
    status: {
      type:Boolean,
    }
  },
  { timestamps: true }
);

const SupplierPayment = mongoose.model("SupplierPayment", SupplierPaymentSchema);
export default SupplierPayment;
