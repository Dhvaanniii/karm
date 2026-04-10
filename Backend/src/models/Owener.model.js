const { Schema, model } = require("mongoose");

const Ownerschema = new Schema(
  {
    profileImage: {
      type: String,
    },
    Full_name: {
      type: String,
    },
    Phone_number: {
      type: String,
    },
    Email_address: {
      type: String,
    },
    Age: {
      type: Number,
    },
    Gender: {
      type: String,
      default: null,
      enum: ["male", "female", "other"],
    },
    Wing: {
      type: String,
    },
    Unit: {
      type: Number,
    },
    Relation: {
      type: String,
    },
    Adhar_front: {
      type: String,
    },
    Adhar_back: {
      type: String,
    },
    Address_proof: {
      type: String,
    },
    Rent_Agreement: {
      type: String,
    },
    Member_Counting: [
      {
        Full_name: { type: String, required: true },
        Phone_number: { type: String, required: true },
        Email_address: { type: String, required: true },
        Age: { type: Number, required: true },
        Gender: { type: String, required: true },
        Relation: { type: String, required: true },
      },
    ],
    Vehicle_Counting: [
      {
        vehicle_type: { type: String, required: true },
        vehicle_name: { type: String, required: true },
        vehicle_number: { type: String, required: true },
      },
    ],
    
    role: {
      type: String,
      enum: ["admin", "resident", "security"],
      default: "resident",
    },
   password: {  
        type: String,
    },
    Resident_status: {
      type: String,
      default: "Owner",
    },
    UnitStatus: {
      type: String,
      default: "Occupied",
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
  },
  { timestamps: true }
);

const Owner = model("Owner", Ownerschema);
module.exports = Owner;
