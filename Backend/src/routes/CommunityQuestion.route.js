const QuestionController = require("../controller/CommunityQuestion.controller");
const { auth } = require("../middleware/auth");
const router = require("express").Router();
router.post("/createquestion", auth, QuestionController.createQuestion);
router.post("/questions/:questionId/answers", QuestionController.addAnswer);
router.get("/questions", QuestionController.GetQuestion);
router.post("/:questionId/vote", auth,QuestionController.voteOnQuestion);
module.exports = router;
