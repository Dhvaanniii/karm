const { Schema, model, default: mongoose } = require("mongoose");

const vehicleSchema = new Schema(
  {
    vehicle_type: {
      type: String,
      enum: ["Two Wheeler", "Four Wheeler"],
      required: true,
    },
    vehicle_name: {
      type: String,
      required: true,
    },
    vehicle_number: {
      type: String,
      required: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'owner_type',
    },
    owner_type: {
      type: String,
      required: true,
      enum: ['Owner', 'Tenante'],
    },
    wing: {
      type: String,
      required: true,
    },
    unit: {
      type: Number,
      required: true,
    },
    parking_slot: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const Vehicle = model("Vehicle", vehicleSchema);
module.exports = Vehicle;
