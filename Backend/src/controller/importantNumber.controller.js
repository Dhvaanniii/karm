const ImportantNumber = require("../models/importNumber.model");

exports.CreateNumber = async (req, res) => {
  try {
    const { Full_name, Phone_Number, Work } = req.body;

    const findPhone = await ImportantNumber.findOne({
      Phone_Number: Phone_Number,
    });
    if (findPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone Number Already Added...",
      });
    }
   
    if (!Full_name || !Phone_Number || !Work) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const numbersave = new ImportantNumber({
      Full_name,
      Phone_Number,
      Work,
    });

    await numbersave.save();

    // Confirm successful insertion
    return res.status(200).json({
      success: true,
      message: "Important Number Created",
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//get all Number
exports.GetAllNumber = async (req, res) => {
  try {
    const find = await ImportantNumber.find();
    if (!find) {
      return res.status(400).json({
        success: true,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      ImportantNumber: find,
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//get By id
exports.GetById = async (req, res) => {
  try {
    const find = await ImportantNumber.findById(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: true,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      ImportantNumber: find,
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//delete important number
exports.DeleteNumber = async (req, res) => {
  try {
    const find = await ImportantNumber.findByIdAndDelete(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: true,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Number Deleted",
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//update Number
exports.UpdateNumber = async (req, res) => {
  try {
    const { Full_name, Phone_Number, Work } = req.body;

  
    if (!Full_name || !Phone_Number || !Work) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    const updatedata = await ImportantNumber.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedata) {
      return res.status(400).json({
        success: false,
        message: "Something went Wrong",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Number Updated",
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
