import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minLength: 1,
    maxLength: 255,
  },
  description: {
    type: String,
    maxLength: 1000,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports', 'Toys', 'Other'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  } 
});

const Product = mongoose.model("product", productSchema);

export default Product;
