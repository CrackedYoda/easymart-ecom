import {
  validateOrder,
  validateProduct,
  validateUser,
  validateCustomer,
  validateCart
} from '../validators/validatorschema.js';

// Factory that returns middleware for a specific validator
export const validate = (validator) => {
    const validateCheck = {
        abortEarly: false,
        allowUnknown: false

    }
  return (req, res, next) => {
    const { error, value } = validator(req.body, validateCheck);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    req.validatedData = value; // Pass validated data to route
    next();
  };
};

// Export individual validators as middleware
export const validateOrderMiddleware = validate(validateOrder);
export const validateProductMiddleware = validate(validateProduct);
export const validateUserMiddleware = validate(validateUser);
export const validateCustomerMiddleware = validate(validateCustomer);
export const validateCartMiddleware = validate(validateCart);