const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const subscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  subscription,
  verifyEmailSchema,
};
