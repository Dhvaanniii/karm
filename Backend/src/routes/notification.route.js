const NotificationController=require("../controller/notification.controller");
const { auth } = require("../middleware/auth");
const router=require("express").Router();
router.get("/notifications",auth,NotificationController.getAllNotifications)
router.delete("/notifications/:notificationId", auth, NotificationController.DeleteSingleNotification);
router.delete("/deleteAll", auth, NotificationController.DeleteAllNotification);
module.exports=router;