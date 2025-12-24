import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  userEmail: {
    unique: true,
    type: String,
    maxLength: 255,
  },
  userPassword: {
    type: String,
    minLength: 4,
    maxLength: 1024,
  },


  userPhone: { type: Number, minlength: 11, maxlength: 20 },
  role: {
    type: String,
    enum: ['user', 'merchant', 'admin'],
    default: 'user'
  },
  isSuspended: {
    type: Boolean,
    default: false
  }
});


const User = mongoose.model("user", userSchema);

export default User;
