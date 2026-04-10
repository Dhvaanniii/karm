const Vehicle = require("../models/vehicle.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");

// Add Vehicle
exports.AddVehicle = async (req, res) => {
  try {
    const { vehicle_type, vehicle_name, vehicle_number, wing, unit, parking_slot, notes, owner_id } = req.body;

    if (!vehicle_type || !vehicle_name || !vehicle_number || !wing || !unit) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (parking_slot) {
      const existingVehicleWithParking = await Vehicle.findOne({ parking_slot });
      if (existingVehicleWithParking) {
        return res.status(400).json({
          success: false,
          message: "Parking slot is already assigned to another vehicle",
        });
      }
    }

    let ownerType = "Owner";
    let finalOwnerId = owner_id || req.user._id;

    // Check if the owner is a Tenant
    const tenant = await Tenante.findById(finalOwnerId);
    if (tenant) {
      ownerType = "Tenante";
    }

    const vehicle = new Vehicle({
      vehicle_type,
      vehicle_name,
      vehicle_number,
      owner_id: finalOwnerId,
      owner_type: ownerType,
      wing,
      unit,
      parking_slot,
      notes,
    });

    await vehicle.save();

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("AddVehicle error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Vehicles (Admin)
exports.GetAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("owner_id", "Full_name Resident_status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error("GetAllVehicles error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching vehicles",
    });
  }
};

// Get My Vehicles (Resident)
exports.GetMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner_id: req.user._id });

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error("GetMyVehicles error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching your vehicles",
    });
  }
};

// Update Vehicle
exports.UpdateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.parking_slot) {
      const existingVehicleWithParking = await Vehicle.findOne({
        parking_slot: updateData.parking_slot,
        _id: { $ne: id }, // Exclude the current vehicle being updated
      });
      if (existingVehicleWithParking) {
        return res.status(400).json({
          success: false,
          message: "Parking slot is already assigned to another vehicle",
        });
      }
    }

    const vehicle = await Vehicle.findByIdAndUpdate(id, updateData, { new: true });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("UpdateVehicle error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Vehicle
exports.DeleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("DeleteVehicle error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Vehicles by Wing and Unit (Resident - "My Wing/Unit" tab)
exports.GetWingVehicles = async (req, res) => {
  try {
    const { wing, unit } = req.user;
    const vehicles = await Vehicle.find({ wing, unit })
      .populate("owner_id", "Full_name Resident_status");

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error("GetWingVehicles error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching wing vehicles",
    });
  }
};
