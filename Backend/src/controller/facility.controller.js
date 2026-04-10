const Facility = require("../models/facility.model");
const Notification = require("../models/notification.schema");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
const User = require("../models/user.schema");

//add facility
exports.CreateFacility= async(req,res)=>{
    try {
        const {name,description,date,remind}=req.body;
        if(!name || !description || !date || !remind){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const facility= new Facility({
            name,
            description,
            date,
            remind
        })
        await facility.save();
        
        
        
        
        const ownerData = await Owner.find();
       const tenantData = await Tenante.find();

    

    //add notification

     
    const adminUsers = await User.find({}, '_id');
    const ownerUsers = ownerData.map(owner => ({ _id: owner._id, model: "Owner" }));
    const tenantUsers = tenantData.map(tenant => ({ _id: tenant._id, model: "Tenante" }));

   
    const allUsers = [
      ...adminUsers.map(admin => ({ _id: admin._id, model: "User" })), 
      ...ownerUsers,
      ...tenantUsers
    ];

     
    const notification = new Notification({
      title: "new Facility",
      name: name,
      message: description,
      users:allUsers,
      type:"facility",
    });


    await notification.save();
        
        return res.status(200).json({
            success:true,
            message:"Facility successfully added",
            notification
        })
    } catch (error) {
       
    return res.status(500).json({
         success: false,
         message: "error in protocol facility"
     });
    }
}

//get facility
exports.GetAllFacility=async(req,res)=>{
    try {
        const facility = await Facility.find({})
        if(!facility){
            return res.status(400).json({
                success:true,
                message:"No data Found"
            })
         }
        return res.status(200).json({
          success: true,
          data: facility,
        });
      } catch (error) {
       
        return res.status(500).json({
          success: false,
          message: "Error fetching facility",
        });
      }
}

//get by id 
exports.GetByIdFacility=async(req,res)=>{
    try {
        const facility = await Facility.findById(req.params.id)
         if(!facility){
            return res.status(400).json({
                success:true,
                message:"No data Found"
            })
         }
        return res.status(200).json({
          success: true,
          data: facility,
        });
      } catch (error) {
        
        return res.status(500).json({
          success: false,
          message: "Error fetching facility",
        });
      }
}

//delete facility
exports.DeleteFacility=async(req,res)=>{
    try {
        const facility = await Facility.findByIdAndDelete(req.params.id)
         if(!facility){
            return res.status(400).json({
                success:true,
                message:"No data Found"
            })
         }
        return res.status(200).json({
          success: true,
          message:"Facility successfully Deleted"
        });
      } catch (error) {
        
        return res.status(500).json({
          success: false,
          message: "Error deleting facility",
        });
      }
}
//update facility
exports.UpdateFacility= async(req,res)=>{
    try {
        const {name,description,date,remind}=req.body;
        if(!name || !description || !date || !remind){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const facility= await Facility.findByIdAndUpdate(req.params.id,{
            name,description,date,remind
        },{new:true})
        if(!facility){
            return res.status(400).json({
                success:true,
                message:"Something went wrong"
            })
         }
        
        return res.status(200).json({
            success:true,
            message:"Facility successfully updated"
        })
    } catch (error) {
     
    return res.status(500).json({
         success: false,
         message: "error in protocol facility"
     });
    }
}
