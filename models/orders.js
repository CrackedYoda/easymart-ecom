import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, 
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: { // Price at the time of purchase
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const Order = mongoose.model("order", orderSchema);

export default Order;

