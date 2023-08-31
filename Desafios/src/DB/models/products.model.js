import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  code: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    default: true,
  },

  category: {
    type: String,
    required: true,
  },

  thumbanil: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  
});

export const productModel = mongoose.model("product", productschema);
