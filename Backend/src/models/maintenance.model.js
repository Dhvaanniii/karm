const { Schema, model, default: mongoose } = require("mongoose");

const maintenanceschema = new Schema(
  {
    maintenanceAmount: {
      type: Number,
      required: true,
    },
    penaltyAmount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    penaltyDay: {
      type: Date,
      required: true,
    },
    residentList: [
      {
        resident: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: 'residentList.residentType', 
          required: true,
        },
        residentType: {
          type: String,
          
          enum: ["Owner", "Tenante"], 
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "done"],
          default: "pending",
        },
        paymentMode: {
          type: String,
          enum: ["online", "cash","none"],
          default: "none",
        },
        penalty: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);
const Maintenance = model("Maintenance", maintenanceschema);
module.exports = Maintenance;
