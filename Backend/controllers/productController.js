import Product from "../models/products.js";

export const addProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({
      name: req.validatedData.name,
    });
    
    if (existingProduct) {
      return res.status(400).send("Product with this name already exists");
    }
    const validCategories = Product.schema.path('category').enumValues;
    
    if (!validCategories.includes(req.validatedData.category)) {
      return res.status(400).send(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
    }
    const newProduct = new Product({
      name: req.validatedData.name,
      description: req.validatedData.description,
      category: req.validatedData.category,
      stock: req.validatedData.stock,
      price: req.validatedData.price,
      imageUrl: req.validatedData.imageUrl,
      owner: req.user.id // Set owner to logged in user
    });

    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'userName userEmail');
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'userName userEmail');
    
    if (!product) {
      return res.status(404).send("Product not found");
    }
    
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Check ownership or admin status
    if (req.user.role !== 'admin' && product.owner.toString() !== req.user.id) {
        return res.status(403).send("Access denied. You do not own this product.");
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.validatedData.name,
          description: req.validatedData.description,
          category: req.validatedData.category,
          stock: req.validatedData.stock,
          price: req.validatedData.price,
          imageUrl: req.validatedData.imageUrl,
        }
      },
      { new: true }
    );

    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Check ownership or admin status
    if (req.user.role !== 'admin' && product.owner.toString() !== req.user.id) {
        return res.status(403).send("Access denied. You do not own this product.");
    }

    await Product.findByIdAndDelete(req.params.id);

    res.send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};