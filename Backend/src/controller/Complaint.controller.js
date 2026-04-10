const Complaint = require("../models/complaint.model");
const Request = require("../models/request.model");
//create complaint
exports.CreateComplaint= async(req,res)=>{
   try {
     const {complainer,name,description,wing,unit,priority,status}=req.body;
     if (
         !complainer ||
         !name ||
         !description ||
         !wing ||
         !unit ||
         !priority ||
         !status 
        
       ) {
         return res.status(400).json({
           success: false,
           message: "All fields are required",
         });
       }
       
       const complaint = new Complaint({
        complainer,
        name,
        description,
        wing,
        unit,
        priority: priority || "Medium", 
        status: status || "Pending",    
        createdBy: req.user._id, 
      createdByType: req.user.type,      
    });


    // Save the complaint to the database
    await complaint.save();

 
     return res.status(200).json({
         success: true,
         message: "Complaint Created successfully",
         
     });
   } catch (error) {
    
    return res.status(500).json({
         success: false,
         message: "error in complaint adding"
     });
   }
}
//get complaint
exports.GetComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({})
      .populate("createdBy", "profileImage") 
      .sort({ wing: 1, unit: 1 }); 

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};
//Login user get Complaint
exports.getUserComplaints = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const userType = req.user.type;

    const complaints = await Complaint.find({
      createdBy: loggedInUserId,
      createdByType: userType
    })
    .populate({
      path: "createdBy",
      select: "name profileImage", 
    })
    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};
//filtering apis 
exports.filterComplaint = async (req, res) => {
  try {
    const { timePeriod } = req.query;
    let dateFrom;
    const currentDate = new Date();

    switch (timePeriod) {
      case "lastWeek":
        dateFrom = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case "lastMonth":
        dateFrom = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        break;
      case "lastYear":
        dateFrom = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        break;
      default:
        dateFrom = null; 
    }

   
    const filter = dateFrom ? { createdAt: { $gte: dateFrom } } : {};

    const complaints = await Complaint.find(filter)
      .populate("apply", "profileImage")
      .sort({ wing: 1, unit: 1 });

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};
//get By Id complaint
exports.GetByIdComplaints = async (req, res) => {
  try {
    const complaintid=req.params.id
    const complaints = await Complaint.findById(complaintid)
      .populate("createdBy", "profileImage") 
      .sort({ wing: 1, unit: 1 }); 

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};
//delete complaint
exports.DeleteComplaint= async(req,res)=>{
  try {
    const find=await Complaint.findByIdAndDelete(req.params.id)
    if(!find){
      return res.status(400).json({
        success:false,
        message:"Complaint not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Complaint deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting complaints",
    });
  }
}
//update complaint
exports.UpdateComplaint=async(req,res)=>{
  try {
    const {complainer,name,description,wing,unit,priority,status}=req.body;
       if (
           !complainer ||
           !name ||
           !description ||
           !wing ||
           !unit ||
           !priority ||
           !status 
          
         ) {
           return res.status(400).json({
             success: false,
             message: "All fields are required",
           });
         }
         
         const complaint=await Complaint.findByIdAndUpdate(req.params.id,{
                 complainer,name,description,wing,unit,priority,status
         })
         if(!complaint){
          return res.status(400).json({
            success:false,
            message:"Something went wrong "
          })
         }
       return res.status(200).json({
           success: true,
           message: "Complaint Updated successfully",
           
       });
  } catch (error) {
   
    return res.status(500).json({
         success: false,
         message: "error in complaint updating"
     });
  }
}
//create request
exports.CreateRequest= async(req,res)=>{
  try {
    const {requester,name,description,date,wing,unit,priority,status}=req.body;
    if (
        !requester ||
        !name ||
        !description ||
        !date || 
        !wing ||
        !unit ||
        !priority ||
        !status 
       
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      
      const request = new Request({
        requester,
       name,
       description,
       date,
       wing,
       unit,
       priority: priority || "Medium", 
       status: status || "Open",    
       createdBy: req.user._id, 
      createdByType: req.user.type,      
   });


   // Save the complaint to the database
   await request.save();


    return res.status(200).json({
        success: true,
        message: "Request Created successfully",
        
    });
  } catch (error) {
  
   return res.status(500).json({
        success: false,
        message: "error in Request adding"
    });
  }
}
//get request
exports.GetRequest = async (req, res) => {
  try {
    const request = await Request.find({})
      .populate("createdBy", "profileImage") 
      .sort({ wing: 1, unit: 1 }); 

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error fetching request",
    });
  }
};
//Login user adding Complaint
exports.getUserRequest = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const userType = req.user.type; 

    const income = await Request.find({
      createdBy: loggedInUserId,
      createdByType: userType
    })
    .populate({
      path: "createdBy",
      select: "name profileImage", 
    })
    return res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error fetching income",
    });
  }
};
//get By Id complaint
exports.GetByIdRequest = async (req, res) => {
  try {
    const requestid=req.params.id
    const request= await Request.findById(requestid)
      .populate("createdBy", "profileImage") 
      .sort({ wing: 1, unit: 1 }); 
      console.log(request);
      

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching request",
    });
  }
};
//delete request
exports.DeleteRequest= async(req,res)=>{
  try {
    const find=await Request.findByIdAndDelete(req.params.id)
    if(!find){
      return res.status(400).json({
        success:false,
        message:"Request not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Request deleted successfully"
    })
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error deleting Request",
    });
  }
}
//update complaint
exports.UpdateRequest=async(req,res)=>{
  try {
    const {requester,name,description,date,wing,unit,priority,status}=req.body;
    if (
        !requester ||
        !name ||
        !description ||
        !date || 
        !wing ||
        !unit ||
        !priority ||
        !status 
       
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
         const request=await Request.findByIdAndUpdate(req.params.id,{
          requester,name,description,date,wing,unit,priority,status
         })
         if(!request){
          return res.status(400).json({
            success:false,
            message:"Something went wrong "
          })
         }
       return res.status(200).json({
           success: true,
           message: "Request Updated successfully",
           
       });
  } catch (error) {
  
    return res.status(500).json({
         success: false,
         message: "error in request updating"
     });
  }
}
