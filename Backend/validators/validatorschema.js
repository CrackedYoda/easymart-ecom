import Joi from "joi";

export function validateOrder(item) {
  const orderValidation = Joi.object({
    products: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })).required(),
    totalPrice: Joi.number().min(0).optional(),
    status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled').optional(),
    orderDate: Joi.date().optional()
  });

  return orderValidation.validate(item);
}

export function validateProduct(item) {
  const productValidation = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().max(1000).optional(),
    category: Joi.string().valid('Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports', 'Toys', 'Other').required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri().optional()
  });

  return productValidation.validate(item);
}

export const validateUser = (user) => {
  const userNameSchema = Joi.object({
    userName: Joi.string().min(4).max(50).required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().min(6).max(255).required(),
    userPhone: Joi.string().pattern(/^\d{10,20}$/).required(),
    role: Joi.string().valid('USER', 'MERCHANT', 'ADMIN').optional()
  });

  return userNameSchema.validate(user);
};

export const validateLogin = (user) => {
  const loginSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().min(5).max(15).required(),
    rememberMe: Joi.boolean().optional()
  });

  return loginSchema.validate(user);
};

export function validateCustomer(item) {
  const customerNameSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    phone: Joi.string().pattern(/^\d{10,15}$/).required(),
    isGold: Joi.boolean().optional()
    
  });

  return customerNameSchema.validate(item);
}

export function validateCart(item) {
  const cartValidation = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
  });

  return cartValidation.validate(item);
}

