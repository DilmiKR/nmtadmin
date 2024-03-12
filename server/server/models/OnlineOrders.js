import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  telephone:{
    type: String,
    required: true,
  },
  email:{
    type: String,
  },
  accountDetails:{
   type: String,
  },
  comment: {
    type: String
  },
  nelundeniyaCode: {
    type: String,
    required: true
  },
  ItemName: {
    type: String,
    required: true
  },
  requestedQty: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  itemTotalCost: {
    type: Number,
    required: true
  },
  deliveryCost: {
    type: Number
  },
  finalCost: {
    type: Number,
    required: true
  },
  itemCostPaid: {
    type: Boolean,
    default: false
  },
  deliveryCostPaid: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
