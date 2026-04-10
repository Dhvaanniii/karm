const ComplaintTracking=require("../controller/Complaint.controller");
const { auth, IsAdmin } = require("../middleware/auth");
const router=require("express").Router();
//create complaint  
router.post("/addcomplaint",auth,ComplaintTracking.CreateComplaint);

//get complaint 
router.get("/viewcomplaint",auth,ComplaintTracking.GetComplaints)

//get user complaint
router.get("/getusercomplaint",auth,ComplaintTracking.getUserComplaints)

//get by id complaint
router.get("/complaint/:id",auth,ComplaintTracking.GetByIdComplaints)
//filter data
router.get("/getcomlaint",auth,ComplaintTracking.filterComplaint)

//delete complaint
router.delete("/:id",auth,ComplaintTracking.DeleteComplaint)

//update complaint
router.patch("/:id",auth,IsAdmin,ComplaintTracking.UpdateComplaint)

//add request
router.post("/addrequest",auth,ComplaintTracking.CreateRequest)
//get request
router.get("/viewrequest",ComplaintTracking.GetRequest)
//get user request
router.get("/getuserrequest",auth,ComplaintTracking.getUserRequest)
//get by id request
router.get("/request/:id",ComplaintTracking.GetByIdRequest)
//delete request
router.delete("/request/:id",ComplaintTracking.DeleteRequest)
//update request
router.patch("/request/:id",auth,IsAdmin,ComplaintTracking.UpdateRequest)
module.exports=router;