const VisitorController= require("../controller/visitor.controller");
const { auth, IsSecurity, IsAdminOrSecurity } = require("../middleware/auth");
const upload = require("../utils/Owner.images");
const router=require("express").Router()

//upload photo
router.post("/uploadphoto",auth,IsAdminOrSecurity,(req, res, next) => {
    console.log("Upload photo request received. Headers:", req.headers['content-type']);
    upload.single("photo")(req, res, (err) => {
        if (err) {
            console.error("Multer processing error:", err);
            return res.status(400).json({
                success: false,
                message: err.message || "File upload failed",
                multerError: err
            });
        }
        console.log("Multer processed file:", req.file ? "File found" : "No file found");
        next();
    });
},VisitorController.UploadPhoto)

//add visitor
router.post("/addvisitor",auth,IsAdminOrSecurity,VisitorController.CreateVisitor)
//get visitor
router.get("/viewvisitor",auth,VisitorController.GetAllVisitor)

//filter data
router.get("/filter",auth,IsAdminOrSecurity,VisitorController.FilterVisitor)

//approve visitor
router.post("/approvevisitor",auth,VisitorController.ApproveVisitor)

//handle action from email (Public)
router.get("/email-action/:visitorId/:action", VisitorController.HandleEmailAction)
module.exports=router;