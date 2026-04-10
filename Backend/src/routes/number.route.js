const NumberController=require("../controller/importantNumber.controller");
const { auth, IsAdmin } = require("../middleware/auth");
const router=require("express").Router();
//create number 
router.post("/createnumber",auth,NumberController.CreateNumber)
router.get("/viewnumber",NumberController.GetAllNumber)
router.get("/:id",NumberController.GetById)
router.delete("/:id",auth,IsAdmin,NumberController.DeleteNumber)
router.patch("/:id",auth,IsAdmin,NumberController.UpdateNumber)
module.exports=router;