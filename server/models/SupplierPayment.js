import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierPaymentSchema = new Schema(
  {
    orderId: {
      type: String,
      ref: 'products', 
    },
    supplier: {
      type: String,
      ref: 'products', 
      required: true
    },
    invoiceValue: {
      type: Number,
    },
    paidMethod: {
      type: String,
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

SupplierPaymentSchema.index({ orderId: 1, supplier: 1 }, { unique: true });

const SupplierPayment = mongoose.model("SupplierPayment", SupplierPaymentSchema);
export default SupplierPayment;
