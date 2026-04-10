const Owner = require("../models/Owener.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const crypto = require("crypto");
const senData = require("../config/mail");
const { hash } = require("../utils/hashpassword");
const Tenante = require("../models/Tenent.model");
const { ForgotFormatResident } = require("../utils/residentcrediUi");
exports.addOwnerData = async (req, res) => {

  try {
    function generatePassword(length = 6) {
      const password = crypto.randomInt(0, Math.pow(10, length)).toString();
      return password.padStart(length, "0");
    }
    const {
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
    console.log(password);

    const hashpassword = await hash(password);

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
    const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

    if (
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


    const newOwner = new Owner({
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
      // cloudinary_id: result.public_id,
      role: role || "resident",
      Resident_status: Resident_status || "Owner",
      UnitStatus: UnitStatus || "Occupied",
      password: hashpassword,
    });

    await newOwner.save();
    await senData(
      newOwner.Email_address,
      "Registration Successfully",
      ForgotFormatResident(newOwner.Full_name, newOwner.Email_address, password)
    );

    if (Member_Counting) {
      // const members = JSON.parse(Member_Counting);
      await Owner.updateOne(
        { _id: newOwner._id },
        { $push: { Member_Counting: { $each: Member_Counting } } }
      );
    }


    if (Vehicle_Counting) {
      // const vehicles = JSON.parse(Vehicle_Counting);
      await Owner.updateOne(
        { _id: newOwner._id },
        { $push: { Vehicle_Counting: { $each: Vehicle_Counting } } }
      );
    }


    return res.status(201).json({
      success: true,
      message: "Owner data added successfully",
      generatedPassword: password,
      loginCredentials: {
        username: Email_address,
        password: password
      }
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to add owner data",
    });
  }
};
exports.GetAllOwner = async (req, res) => {
  try {
    t
    const owners = await Owner.find().sort({ Wing: 1, Unit: 1 });

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

    // Respond with only the counts
    return res.json({
      success: true,
      Owner: ownerCounts,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve owner data",
    });
  }
};
exports.GetByIdResident = async (req, res) => {
  try {
    let resident = await Tenante.findById(req.params.id);

    if (!resident) {
      resident = await Owner.findById(req.params.id);
    }

    if (!resident) {
      return res.status(400).json({
        success: false,
        message: "No data found, ID is incorrect",
      });
    }

    const residentData = {
      Resident_Status: resident.Resident_status,
      profileImage: resident.profileImage,
      Full_name: resident.Full_name,
      Email_address: resident.Email_address,
      Unit: resident.Unit,
      Wing: resident.Wing,
      Age: resident.Age,
      Gender: resident.Gender,
      Adhar_front: resident.Adhar_front,
      Address_proof: resident.Address_proof,
      Owner_Full_name: resident.Owner_Full_name,
      Owner_Phone: resident.Owner_Phone,
      Owner_Address: resident.Owner_Address,
      Member_Counting_Total: resident.Member_Counting
        ? resident.Member_Counting.length
        : 0,
      Member_Counting: resident.Member_Counting || [],
      Vehicle_Counting_Total: resident.Vehicle_Counting
        ? resident.Vehicle_Counting.length
        : 0,
      Vehicle_Counting: resident.Vehicle_Counting || [],

      ...(resident.Owner_Full_name
        ? {
          Owner_Full_name: resident.Owner_Full_name,
          Owner_Phone: resident.Owner_Phone,
          Owner_Address: resident.Owner_Address,
        }
        : {}),
    };


    return res.status(200).json({
      success: true,
      Resident: residentData,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Error fetching resident data",
    });
  }
};
exports.DeleteByIdResident = async (req, res) => {
  try {
    let resident = await Tenante.findByIdAndDelete(req.params.id);

    if (!resident) {
      resident = await Owner.findByIdAndDelete(req.params.id);
    }

    if (!resident) {
      return res.status(400).json({
        success: false,
        message: "No data found, ID is incorrect or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resident data deleted successfully",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Error deleting resident data",
    });
  }
};
exports.GetAllResidents = async (req, res) => {
  try {
    const tenants = await Tenante.find().sort({ Wing: 1, Unit: 1 });
    const owners = await Owner.find().sort({ Wing: 1, Unit: 1 });

    if (
      (!tenants || tenants.length === 0) &&
      (!owners || owners.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "No data found ",
      });
    }

    // Map each to the desired format
    const tenantData = tenants.map((tenant) => ({
      ...tenant._doc,
      Member_Counting_Total: tenant.Member_Counting
        ? tenant.Member_Counting.length
        : 0,
      Vehicle_Counting_Total: tenant.Vehicle_Counting
        ? tenant.Vehicle_Counting.length
        : 0,
    }));

    const ownerData = owners.map((owner) => ({
      ...owner._doc,
      Member_Counting_Total: owner.Member_Counting
        ? owner.Member_Counting.length
        : 0,
      Vehicle_Counting_Total: owner.Vehicle_Counting
        ? owner.Vehicle_Counting.length
        : 0,
    }));

    const allResidents = [...tenantData, ...ownerData].sort((a, b) => {
      if (a.Wing === b.Wing) {
        return a.Unit - b.Unit;
      }
      return a.Wing.localeCompare(b.Wing);
    });

    // Respond with the combined data
    return res.json({
      success: true,
      Residents: allResidents,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve residents data",
    });
  }
};
exports.updateOwnerData = async (req, res) => {
  try {
    const {
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

          throw error;
        }
      }
      return "";
    };


    const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
    const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
    const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
    const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
    const Rent_Agreement = await uploadAndDeleteLocal(
      req.files?.Rent_Agreement
    );



    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Update fields with new values if provided
    if (Full_name) owner.Full_name = Full_name;
    if (Phone_number) owner.Phone_number = Phone_number;
    if (Email_address) owner.Email_address = Email_address;
    if (Age) owner.Age = Age;
    if (Gender) owner.Gender = Gender;
    if (Wing) owner.Wing = Wing;
    if (Unit) owner.Unit = Unit;
    if (Relation) owner.Relation = Relation;
    if (Resident_status) owner.Resident_status = Resident_status;
    if (UnitStatus) owner.UnitStatus = UnitStatus;
    if (profileImage) owner.profileImage = profileImage;
    if (Adhar_front) owner.Adhar_front = Adhar_front;
    if (Adhar_back) owner.Adhar_back = Adhar_back;
    if (Address_proof) owner.Address_proof = Address_proof;
    if (Rent_Agreement) owner.Rent_Agreement = Rent_Agreement;


    if (Member_Counting) {
      owner.Member_Counting = Member_Counting;
    }

    // Handle Vehicle Counting
    if (Vehicle_Counting) {
      owner.Vehicle_Counting = Vehicle_Counting;
    }


    await owner.save();

    return res.status(200).json({
      success: true,
      message: "Owner data updated successfully",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to update owner data",
    });
  }
};
exports.updateDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const account = (await Owner.findById(id)) || (await Tenante.findById(id));

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Clear email and password for security when unit becomes vacant
    // But keep a log of the previous occupant
    account.Email_address = undefined;
    account.UnitStatus = "Vacant";
    // Note: We're keeping the password so the account can be reused
    // account.password = undefined; // REMOVED - This was causing login issues

    await account.save();

    return res.status(200).json({
      success: true,
      message: `Resident Vacant successfully`,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to update data",
    });
  }
};
//total occupied unit
exports.getTotalOccupiedUnits = async (req, res) => {
  try {
    const tenantOccupiedUnits = await Tenante.find();
    const ownerOccupiedUnits = await Owner.find();
    const uniqueOccupiedUnits = [...tenantOccupiedUnits, ...ownerOccupiedUnits];
    return res.status(200).json({
      success: true,
      UnitTotal: uniqueOccupiedUnits.length,
    });

    // return uniqueOccupiedUnits.size;
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server Error"
    });
    throw error;
  }
};
