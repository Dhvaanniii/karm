const express = require("express");
const router = express.Router();
const { auth, IsAdmin, IsResident } = require("../middleware/auth");
const {
  AddVehicle,
  GetAllVehicles,
  GetMyVehicles,
  UpdateVehicle,
  DeleteVehicle,
  GetWingVehicles,
} = require("../controller/Vehicle.controller");

// Admin routes
router.post("/add", auth, IsAdmin, AddVehicle);
router.get("/all", auth, GetAllVehicles);
router.put("/update/:id", auth, IsAdmin, UpdateVehicle);
router.delete("/delete/:id", auth, IsAdmin, DeleteVehicle);

// Resident routes
router.get("/my", auth, IsResident, GetMyVehicles);
router.get("/wing", auth, IsResident, GetWingVehicles);
router.post("/resident/add", auth, IsResident, AddVehicle);

module.exports = router;
