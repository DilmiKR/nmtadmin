import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      unique: true,
      required: true
    },

    CategoryDescription: {
      type: String,
      required: true
    },

  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
