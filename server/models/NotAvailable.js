import mongoose from "mongoose";

const NotAvailableSchema = new mongoose.Schema(
  {
 
    Date: {
        type: Date,
    },
    Vehicle_Type: {
        type: String,
    },
    Item: {
        type: String,
    },
    Item_Description: {
        type: String,
    },
    Item_Image: {
        type: Buffer,
    },    
    Brand: {
        type: String,
    },
    Inventory: {
        type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const NotAvailable = mongoose.model("NotAvailable", NotAvailableSchema);
export default NotAvailable;
