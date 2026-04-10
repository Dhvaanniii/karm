const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
    },
    Country: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    select_society: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Society",
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "resident", "security"],
      default: "admin",
    },
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
      default: Date.now,
      get: (otpExpiration) => otpExpiration.getTime(),
      set: (otpExpiration) => new Date(otpExpiration),
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
