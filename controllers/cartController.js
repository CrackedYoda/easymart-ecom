import Cart from "../models/cart.js";
import Product from "../models/products.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    
    res.send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.validatedData;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    // Populate product details for the response
    cart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
