const SocietyController = require("../controller/society.controller");
const router = require("express").Router();

router.post("/addSociety", SocietyController.CreateSociety);
router.get("/viewSociety", SocietyController.GetSociety);

module.exports = router;