const cloudinary = require('../utils/cloudinary');
const fs = require("fs")
const twilio = require("twilio");
const crypto = require("crypto");
const { hash } = require("../utils/hashpassword");
const senData = require("../config/mail");
const Guard = require("../models/SecurityGuard.model");
const { ForgotFormatSecurity } = require("../utils/securityUi");
const { twilioClient } = require("../utils/twilio");
// add security guard
exports.CreateSecurityGuard = async (req, res) => {
   try {
     console.log("=== CreateSecurityGuard Request Received ===");
     console.log("Request body:", req.body);
     console.log("Request files:", req.files);
     
     function generatePassword(length = 6) {
         const password = crypto.randomInt(0, Math.pow(10, length)).toString();
         return password.padStart(length, "0")
     }
     const {
         full_name,
         MailOrPhone,
         gender,
         shift,
         date,
         time,
         role,
     } = req.body;
     const password = generatePassword();
     console.log("Generated password:", password);
   
     console.log("Hashing password...");
     const hashpassword = await hash(password)
     console.log("Password hashed successfully");
 
     const uploadAndDeleteLocal = async (fileArray) => {
         if (fileArray && fileArray[0]) {
             const filePath = fileArray[0].path;
             try {
                 console.log("Uploading to Cloudinary:", filePath);
                 // Upload to Cloudinary
                 const result = await cloudinary.uploader.upload(filePath);
                 console.log("Cloudinary upload successful:", result.secure_url);
                 // Delete from local server
                 fs.unlink(filePath, (err) => {
                     if (err) console.error("Error deleting file from server:", err);
                     else console.log("File deleted from server:", filePath);
                 });
                 return result.secure_url;
             } catch (error) {
                 console.error("Error uploading to Cloudinary:", error);
                 throw error;
             }
         }
         console.log("No file provided");
         return '';
     };
 
     // Upload images to Cloudinary and delete local files
     console.log("Uploading profile image...");
     const profileimage = await uploadAndDeleteLocal(req.files?.profileimage);
     console.log("Uploading adhar card...");
     const adhar_card = await uploadAndDeleteLocal(req.files?.adhar_card);
     console.log("Profile image:", profileimage);
     console.log("Adhar card:", adhar_card);
     
     if (
         !full_name ||
         !MailOrPhone ||
         !gender ||
         !shift ||
         !date ||
         !time
     ) {
         console.log("Validation failed: Missing required fields");
         return res.status(400).json({
             success: false,
             message: "All required fields must be provided (full_name, MailOrPhone, gender, shift, date, time)",
         });
     }

     // Check if images were uploaded successfully (required by model)
     if (!profileimage || profileimage === '') {
         console.log("Validation failed: Profile image missing");
         return res.status(400).json({
             success: false,
             message: "Profile image is required",
         });
     }

     if (!adhar_card || adhar_card === '') {
         console.log("Validation failed: Adhar card missing");
         return res.status(400).json({
             success: false,
             message: "Aadhar card image is required",
         });
     }
   
     console.log("Creating new Guard record...");
     const newOwner = new Guard({
         full_name,
         MailOrPhone,
         gender,
         shift,
         date,
         time,
         profileimage,
         adhar_card,
         role:role || "security",
         password: hashpassword
     });
 
     console.log("Saving to database...");
     await newOwner.save();
     console.log("Guard saved successfully:", newOwner._id);
     
     // Send notification (email or SMS)
     try {
         if (MailOrPhone.includes("@")) {
             console.log("Sending email to:", MailOrPhone);
             // Send email
             await senData(
                 newOwner.MailOrPhone, 
                 "Registration Successfully", 
                 ForgotFormatSecurity(newOwner.full_name, newOwner.MailOrPhone, password)
             );
             console.log("Email sent successfully");
         } else {
             console.log("Sending SMS to:", MailOrPhone);
             // Send SMS via Twilio
             if (twilioClient) {
                 await twilioClient.messages.create({
                     body: `You have successfully registered as a security. Your login details are as follows UserName ${MailOrPhone} & Password is ${password}\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`,
                     to: MailOrPhone,
                     from: process.env.TWILIO_PHONE_NUMBER,
                 });
                 console.log("SMS sent successfully");
             } else {
                 console.warn("Twilio client not initialized. Skipping SMS.");
             }
         }
     } catch (notificationError) {
         // Log notification error but don't fail the request
         console.error("Failed to send notification:", notificationError.message);
     }

     console.log("=== CreateSecurityGuard Completed Successfully ===");
     return res.status(200).json({
        success:true,
        message:"Security Guard Successfully added",
        generatedPassword: password,
        loginCredentials: {
            username: MailOrPhone,
            password: password
        }
     })
   } catch (error) {
    console.error("=== ERROR in CreateSecurityGuard ===");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + (error.message || "Unknown error")
        });
   }
}

//get a security Guard
exports.GetSecurityGuard= async (req,res)=>{
    try {
        const find= await Guard.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            Guard:find
        })
    } catch (error) {
     
        return res.status(500).json({
             success: false,
             message: "error in Announcement fetching"
         });
    }
}
exports.GetByIdGuard= async (req,res)=>{
    try {
        const find= await Guard.findById(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            Guard:find
        })
    } catch (error) {
       
        return res.status(500).json({
             success: false,
             message: "error in Announcement fetching"
         });
    }
}
exports.DeleteGuard= async (req,res)=>{
    try {
        const find= await Guard.findByIdAndDelete(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Security Guard deleted"
        })
    } catch (error) {
       
        return res.status(500).json({
             success: false,
             message: "error in Announcement deleting"
         });
    }
}
exports.updateSecurityGuard = async (req, res) => {
    const { id } = req.params; 
    const {
        full_name,
        MailOrPhone,
        gender,
        shift,
        date,
        time,
        role,
    } = req.body;

    try {
        
        const guard = await Guard.findById(id);
        if (!guard) {
            return res.status(404).json({
                success: false,
                message: "Security Guard not found"
            });
        }

      
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                    });
                    return result.secure_url;
                } catch (error) {
                   
                    throw error;
                }
            }
            return '';
        };

        
        if (full_name) guard.full_name = full_name;
        if (MailOrPhone) guard.MailOrPhone = MailOrPhone;
        if (gender) guard.gender = gender;
        if (shift) guard.shift = shift;
        if (date) guard.date = date;
        if (time) guard.time = time;
        if (role) guard.role = role || guard.role;

        
        if (req.files?.profileimage) {
            guard.profileimage = await uploadAndDeleteLocal(req.files.profileimage);
        }

       
        if (req.files?.adhar_card) {
            guard.adhar_card = await uploadAndDeleteLocal(req.files.adhar_card);
        }

       
        await guard.save();

        return res.status(200).json({
            success: true,
            message: "Security Guard details updated successfully",
            
        });
    } catch (error) {
       
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating Security Guard details",
        });
    }
};