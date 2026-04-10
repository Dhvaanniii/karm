const AlertController= require("../controller/securityAlert.controller");
const { auth, IsSecurity } = require("../middleware/auth");
const router= require("express").Router()
//add alert 
router.post("/addalert",auth,IsSecurity,AlertController.CreateAlert)
//get alert
router.get("/viewalert",AlertController.GetAlert)
module.exports=router;