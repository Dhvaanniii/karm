const FacilityController=require("../controller/facility.controller");
const { auth, IsAdmin } = require("../middleware/auth");
const router=require("express").Router();
router.post("/addfacility",auth,IsAdmin,FacilityController.CreateFacility)
router.get("/viewfacility",FacilityController.GetAllFacility)
router.get("/:id",FacilityController.GetByIdFacility)
router.delete("/:id",auth,IsAdmin,FacilityController.DeleteFacility)
router.patch("/:id",auth,IsAdmin,FacilityController.UpdateFacility)
module.exports=router;