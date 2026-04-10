const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const crypto = require("crypto");
const senData = require("../config/mail");
const { hash } = require("../utils/hashpassword");
const Tenante = require("../models/Tenent.model");
const { ForgotFormatResident } = require("../utils/residentcrediUi");
exports.addTenante = async (req, res) => {
  try {
    function generatePassword(length = 6) {
      const password = crypto.randomInt(0, Math.pow(10, length)).toString();
      return password.padStart(length, "0");
    }
    const {
      Owner_Full_name,
      Owner_Phone,
      Owner_Address,
      Full_name,
      Phone_number,
      Email_address,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Member_Counting,
      Vehicle_Counting,
      role,
      Resident_status,
      UnitStatus,
    } = req.body;
    const password = generatePassword();
   

    const hashpassword = await hash(password);

    const uploadAndDeleteLocal = async (fileArray) => {
      if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(filePath);
          // Delete from local server
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file from server:", err);
            else console.log("File deleted from server:", filePath);
          });
          return result.secure_url;
        } catch (error) {
          
          throw error;
        }
      }
      return "";
    };

    // Upload images to Cloudinary and delete local files
    const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
    const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
    const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
    const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
    const Rent_Agreement = await uploadAndDeleteLocal(
      req.files?.Rent_Agreement
    );

    if (
      !Owner_Full_name ||
      !Owner_Phone ||
      !Owner_Address ||
      !Full_name ||
      !Phone_number ||
      !Email_address ||
      !Age ||
      !Gender ||
      !Wing ||
      !Unit ||
      !Relation ||
      !Member_Counting ||
      !Vehicle_Counting ||
      !profileImage ||
      !Adhar_front ||
      !Adhar_back ||
      !Address_proof ||
      !Rent_Agreement
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   
    // Create a new owner document
    const newOwner = new Tenante({
      Owner_Full_name,
      Owner_Phone,
      Owner_Address,
      profileImage,
      Full_name,
      Phone_number,
      Email_address,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Adhar_front,
      Adhar_back,
      Address_proof,
      Rent_Agreement,
      role: role || "resident",
      Resident_status: Resident_status || "Tenante",
      UnitStatus: UnitStatus || "Occupied",
      password: hashpassword,
    });

    await newOwner.save();

   
    await senData(newOwner.Email_address, "Registration Successfully" ,ForgotFormatResident(newOwner.Full_name,newOwner.Email_address,password));

    // Handle Member Counting
    if (Member_Counting) {
      // const membar = JSON.parse(Member_Counting);
      await Tenante.updateOne(
        { _id: newOwner._id },
        { $push: { Member_Counting: { $each: Member_Counting } } }
      );
    }

    // Handle Vehicle Counting
    if (Vehicle_Counting) {
      // const vehicles = JSON.parse(Vehicle_Counting);
      await Tenante.updateOne(
        { _id: newOwner._id },
        { $push: { Vehicle_Counting: { $each: Vehicle_Counting } } }
      );
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Tenante data added successfully",
      generatedPassword: password,
      loginCredentials: {
        username: Email_address,
        password: password
      }
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Failed to add Tenant data",
    });
  }
};
exports.GetAllTenante = async (req, res) => {
  try {
    
    const owners = await Tenante.find().sort({ Wing: 1, Unit: 1 });

    if (!owners || owners.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }

    const ownerCounts = owners.map((owner) => ({
      profileImage: owner.profileImage,
      Full_name: owner.Full_name,
      Unit: owner.Unit,
      Wing: owner.Wing,
      Resident_status: owner.Resident_status,
      Phone_number: owner.Phone_number,
      Member_Counting_Total: owner.Member_Counting
        ? owner.Member_Counting.length
        : 0,
      Vehicle_Counting_Total: owner.Vehicle_Counting
        ? owner.Vehicle_Counting.length
        : 0,
    }));

  
    return res.json({
      success: true,
      Owner: ownerCounts,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Tenante data",
    });
  }
};
exports.updateTenantData = async (req, res) => {
  try {
    const {
      Owner_Full_name,
      Owner_Phone,
      Owner_Address,
      Full_name,
      Phone_number,
      Email_address,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Member_Counting,
      Vehicle_Counting,
      Resident_status,
      UnitStatus,
    } = req.body;

    const { id } = req.params;

    const uploadAndDeleteLocal = async (fileArray) => {
      if (fileArray && fileArray[0]) {
        const filePath = fileArray[0].path;
        try {
          const result = await cloudinary.uploader.upload(filePath);
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
      return "";
    };

   
    const profileImage = req.files?.profileImage
      ? await uploadAndDeleteLocal(req.files?.profileImage)
      : null;
    const Adhar_front = req.files?.Adhar_front
      ? await uploadAndDeleteLocal(req.files?.Adhar_front)
      : null;
    const Adhar_back = req.files?.Adhar_back
      ? await uploadAndDeleteLocal(req.files?.Adhar_back)
      : null;
    const Address_proof = req.files?.Address_proof
      ? await uploadAndDeleteLocal(req.files?.Address_proof)
      : null;
    const Rent_Agreement = req.files?.Rent_Agreement
      ? await uploadAndDeleteLocal(req.files?.Rent_Agreement)
      : null;


    

    const tenant = await Tenante.findById(id);
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    if (Owner_Full_name) tenant.Owner_Full_name = Owner_Full_name;
    if (Owner_Phone) tenant.Owner_Phone = Owner_Phone;
    if (Owner_Address) tenant.Owner_Address = Owner_Address;
    if (Full_name) tenant.Full_name = Full_name;
    if (Phone_number) tenant.Phone_number = Phone_number;
    if (Email_address) tenant.Email_address = Email_address;
    if (Age) tenant.Age = Age;
    if (Gender) tenant.Gender = Gender;
    if (Wing) tenant.Wing = Wing;
    if (Unit) tenant.Unit = Unit;
    if (Relation) tenant.Relation = Relation;
    if (Resident_status) tenant.Resident_status = Resident_status;
    if (UnitStatus) tenant.UnitStatus = UnitStatus;

    if (profileImage) tenant.profileImage = profileImage;
    if (Adhar_front) tenant.Adhar_front = Adhar_front;
    if (Adhar_back) tenant.Adhar_back = Adhar_back;
    if (Address_proof) tenant.Address_proof = Address_proof;
    if (Rent_Agreement) tenant.Rent_Agreement = Rent_Agreement;

    if (Member_Counting) {
      tenant.Member_Counting = Member_Counting;
    }

    if (Vehicle_Counting) {
      tenant.Vehicle_Counting = Vehicle_Counting;
    }

    await tenant.save();

    return res.status(200).json({
      success: true,
      message: "Tenant data updated successfully",
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Failed to update tenant data",
    });
  }
};


//     const { Wing, Unit, UnitStatus } = req.body; // Only expect these fields
//     const { id } = req.params;

//     // Function to upload files to Cloudinary and delete from local
//     const uploadAndDeleteLocal = async (fileArray) => {
//       if (fileArray && fileArray[0]) {
//         const filePath = fileArray[0].path;
//         try {
//           const result = await cloudinary.uploader.upload(filePath);
//           fs.unlink(filePath, (err) => {
//             if (err) console.error("Error deleting file from server:", err);
//             else console.log("File deleted from server:", filePath);
//           });
//           return result.secure_url;
//         } catch (error) {
//           console.error("Error uploading to Cloudinary:", error);
//           throw error;
//         }
//       }
//       return "";
//     };

//     // Upload new profile and document images if provided (files will be handled separately)
//     const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
//     const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
//     const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
//     const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
//     const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

    

//     // Find the owner to update
//     const owner = await Tenante.findById(id);
//     if (!owner) {
//       return res.status(404).json({
//         success: false,
//         message: "Owner not found",
//       });
//     }

    
//     if (Wing) owner.Wing = Wing;
//     if (Unit) owner.Unit = Unit;
 

//     owner.Owner_Full_name=null,
//     owner.Owner_Phone=null,
//     owner.Owner_Address=null,
//     owner.Full_name =null; 
//     owner.Phone_number = null; 
//     owner.Email_address = null; 
//     owner.Age = null; 
//     owner.Gender = null; 
//     owner.Relation = null; 
//     owner.profileImage = profileImage || null; 
//     owner.Adhar_front = Adhar_front || null; 
//     owner.Adhar_back = Adhar_back || null; 
//     owner.Address_proof = Address_proof || null; 
//     owner.Rent_Agreement = Rent_Agreement || null; 
//     owner.Resident_status = null; 
//     owner.Member_Counting = []; 
//     owner.Vehicle_Counting = []; 
//     owner.Member_Counting_Total = null; 
//     owner.Vehicle_Counting_Total = null; 
//     owner.UnitStatus = "Vacant"
   

//     // Save the updated owner document
//     await owner.save();

//     return res.status(200).json({
//       success: true,
//       message: "Owner data updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating owner data:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update owner data",
//     });
//   }
// };