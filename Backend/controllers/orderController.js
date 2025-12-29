import Product from "../models/products.js";
import User from "../models/user.js";
import Order from "../models/orders.js";
import Cart from "../models/cart.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).send("Cart is empty");
    }

    let totalPrice = 0;
    const orderProducts = [];

    // Validate products and check stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).send(`Product with ID ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        return res.status(400).send(`Insufficient stock for product: ${product.name}`);
      }
      
      totalPrice += product.price * item.quantity;
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Decrease stock
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = await Order.create({
      customer: user._id,
      products: orderProducts,
      totalPrice: totalPrice,
      status: 'Pending'
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default createOrder;
