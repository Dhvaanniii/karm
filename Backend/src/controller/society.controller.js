const Society = require("../models/society.schema")

//create society 
exports.CreateSociety = async (req,res)=>{
   try {
     const {Society_name ,  Society_address , Country ,State, City, ZipCode}=req.body
     if(!Society_name || !Society_address || !Country || !State || !City || !ZipCode)
     {
         return res.status(401).json({
             success:flase,
             message:"All field are required"
         })
     }
 
     const societycreate= new Society({
         Society_name,
         Society_address,
         Country,
         State,
         City,
         ZipCode
     })
     await societycreate.save();
      if(!societycreate){
         return res.status(400).json({
             success:false,
             message:"Something went wrong"
         })
      }
      return res.status(200).json({
         success:true,
         message:"Society Are Created"
      })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
   }
}

//view  society 
exports.GetSociety= async(req,res)=>{
    try {
        const findSociety= await Society.find();
        if(!findSociety){
            return res.status(400).json({
                success:false,
                message:"No Society Found"
            })
        }
    
        return res.status(200).json({
            success:true,
            Society:findSociety
        })
    } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
    }
}