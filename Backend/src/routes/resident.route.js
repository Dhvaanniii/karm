const ResidentController = require("../controller/Owner.controller");
const TenateController = require("../controller/Tenante.controller");
const { auth, IsAdmin } = require("../middleware/auth");
const router = require("express").Router();
const upload = require("../utils/Owner.images");
//add owner
router.post(
  "/addowner",auth,IsAdmin,
  upload.fields([
    { name: "Adhar_front", maxCount: 1 },
    { name: "Adhar_back", maxCount: 1 },
    { name: "Address_proof", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  ResidentController.addOwnerData
);
//show owner
router.get("/viewowner", ResidentController.GetAllOwner);

//update owner
router.patch(
  "/owner/:id",
  upload.fields([
    { name: "Adhar_front", maxCount: 1 },
    { name: "Adhar_back", maxCount: 1 },
    { name: "Address_proof", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  ResidentController.updateOwnerData
);

//add tenant
router.post(
  "/addtenante",auth,IsAdmin,
  upload.fields([
    { name: "Adhar_front", maxCount: 1 },
    { name: "Adhar_back", maxCount: 1 },
    { name: "Address_proof", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  TenateController.addTenante
);

//show tenante
router.get("/viewtenante", TenateController.GetAllTenante);

// //get by id tenant
// router.get("/tenant/:id",ResidentController.GetByIdOwnerResident)

//update tenant
router.put(
  "/tenante/:id",auth,IsAdmin,
  upload.fields([
    { name: "Adhar_front", maxCount: 1 },
    { name: "Adhar_back", maxCount: 1 },
    { name: "Address_proof", maxCount: 1 },
    { name: "Rent_Agreement", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  TenateController.updateTenantData
);

//======================
//get by id resident
router.get("/resident/:id", ResidentController.GetByIdResident);
// get all resident
router.get("/allresident", ResidentController.GetAllResidents);
//delete resident
router.delete("/resident/:id", ResidentController.DeleteByIdResident);

//blank field
router.put("/update/:id",ResidentController.updateDataById)
//total occupied unit 
router.get('/unit/total-occupied-units',ResidentController.getTotalOccupiedUnits)


module.exports = router;
