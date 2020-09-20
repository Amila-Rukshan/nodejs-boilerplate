import mongoose, { Schema } from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    validate: {
      validator(email) {
          return validator.isEmail(email);
      },
      message: "{VALUE} is not valid email!",
    },
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name is required"]
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"]
  },
  userName: {
    type: String,
    trim: true,
    required: [true, "User Name is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password need to be longer!"],
  },
});

export default mongoose.model("User", UserSchema);
