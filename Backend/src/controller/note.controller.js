const Note = require("../models/Note.model");

//create note
exports.CreateNote = async (req, res) => {
    try {
      const { title, description, date } = req.body;
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "All Fields Are Required",
        });
      }
  
      const notes = new Note({
        title,
        description,
        date,
      });
      await notes.save();
      if (!notes) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Notes Added Successfully",
      });
    } catch (error) {
      
      res.status(500).json({
        success: false,
        message: "Internal Server error",
      });
    }
  };
  //get Note
  exports.GetAllNotes = async (req, res) => {
    try {
      const find = await Note.find();
      if (!find) {
        return res.status(400).json({
          success: false,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: true,
        Note: find,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "error in Note find",
      });
    }
  };
  //get Note
  exports.GetByIdNotes = async (req, res) => {
    try {
      const find = await Note.findById(req.params.id);
      if (!find) {
        return res.status(400).json({
          success: false,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: true,
        Note: find,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "error in Note find",
      });
    }
  };
  //delete note
  exports.DeleteNote = async (req, res) => {
    try {
      const find = await Note.findByIdAndDelete(req.params.id);
      if (!find) {
        return res.status(400).json({
          success: false,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Note Delete Successfully",
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "error in Note find",
      });
    }
  };
  //update note
  exports.UpdateNote = async (req, res) => {
    try {
      const { title, description, date } = req.body;
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "All Fields Are Required",
        });
      }
  
      const notes = await Note.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          date,
        },
        { new: true }
      );
      if (!notes) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Notes Updated Successfully",
      });
    } catch (error) {
      
      res.status(500).json({
        success: false,
        message: "Internal Server error",
      });
    }
  };