import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    trim: true,
    lowercase: true,
  },
  userEmail: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userPhone: { type: String, minLength: 11, maxLength: 20 },
  role: {
    type: String,
    enum: ["user", "merchant", "admin"],
    default: "user",
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  refreshToken: [{ token: { type: String }, createdAt: { type: Date, default: Date.now }, deviceInfo: {device: { type: String }, os: { type: String }, browser: { type: String } }  }],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("userPassword")) {
      return next();
    }

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
