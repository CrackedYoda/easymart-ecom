import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  phone: { type: Number, minlength: 11, maxlength: 20 },
  isGold: { type: Boolean, required: true }
});

const Customers = mongoose.model("customer", customerSchema);

export default Customers;
