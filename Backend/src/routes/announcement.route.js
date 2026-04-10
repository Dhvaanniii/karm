const announcementController=require("../controller/announcment.controller")
const { auth, IsAdmin } = require("../middleware/auth")
const router=require("express").Router()
router.post("/addannouncement",auth,IsAdmin,announcementController.CreateAnnouncement)
router.get("/viewannouncment",announcementController.GetAnnouncement)
//get activity announcement 
router.get("/acitivity/getannouncement",announcementController.GetActivityAnnouncements)
//get Event announcement 
router.get("/event/participants",announcementController.GetEventAnnouncements)
router.get("/:id",announcementController.GetByIdAnnouncement)
router.delete("/:id",auth,IsAdmin,announcementController.DeleteAnnouncement)
router.patch("/:id",auth,IsAdmin,announcementController.UpdateAnnouncement)
//filter data
router.get("/an/getannouncment",announcementController.FilterAnnouncement)

//accept announcement
router.post("/accept-announcement", auth, announcementController.AcceptAnnouncement);

// get activity participants for residents
router.get("/activity/participants", auth, announcementController.GetActivityParticipants);
module.exports=router;