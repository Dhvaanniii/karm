const PollController=require("../controller/poll.controller");
const { auth, IsResident } = require("../middleware/auth");
const router=require("express").Router();
router.post("/createpoll",auth,IsResident,PollController.createPoll)
router.get("/getpoll",auth,IsResident,PollController.getPolls)
// Vote in a poll
router.post("/polls/vote", auth, IsResident,PollController.voteInPoll);
module.exports=router;