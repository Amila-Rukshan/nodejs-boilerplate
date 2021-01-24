import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { hashSync, compareSync } from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

import constants from "../../config/constants";

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
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
  },
  userName: {
    type: String,
    trim: true,
    required: [true, "User Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password need to be longer!"],
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!!",
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET
    );
  },
  toJSON(){
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`
    }
  }
};

export default mongoose.model("User", UserSchema);
