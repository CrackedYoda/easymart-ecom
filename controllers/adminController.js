import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-userPassword");
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'userName userEmail').populate('products.product');
    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteAnyProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send("Product deleted by admin");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const suspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    
    user.isSuspended = !user.isSuspended;
    await user.save();
    
    res.send(`User ${user.isSuspended ? 'suspended' : 'activated'} successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
