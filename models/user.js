import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  userEmail: {
    required: true,
  },
  userPassword: {
    required: true,
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

userSchema.pre('save', async function (next) {
  try{
if(!this.isModified('userPassword')){ return next();}
  
  const salt = await bcrypt.genSalt(12);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  
  return bcrypt.compare(candidatePassword, this.userPassword);
};

const User = mongoose.model("user", userSchema);

export default User;
