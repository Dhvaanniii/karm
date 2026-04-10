const Expense = require("../models/Expense.model");
const cloudinary = require("../utils/cloudinary");
const fs=require("fs")
//add exppense
exports.CreateExpense = async (req, res) => {
    try {
      const { title, description, date, amount } = req.body;
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            // Delete from local server
            fs.unlink(filePath, (err) => {
              if (err) err;
              else  filePath;
            });
            return result.secure_url;
          } catch (error) {
          
            throw error;
          }
        }
        return "";
      };
  
      // Upload images to Cloudinary and delete local files
      const bill = await uploadAndDeleteLocal(req.files?.bill);
      if (!title || !description || !date || !amount || !bill) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const expens = new Expense({
        title,
        description,
        date,
        amount,
        bill,
      });
      await expens.save();
  
      if (!expens) {
        res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Expense successfully created",
      });
    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Internal Server error",
      });
    }
  };
  //get all expens
  exports.GetAllExpense = async (req, res) => {
    try {
      const complaints = await Expense.find();
      return res.status(200).json({
        success: true,
        Expense: complaints,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "Error fetching expense",
      });
    }
  };
  //get total expense amount
  exports.getTotalExpenseAmount = async (req, res) => {
    try {
      const result = await Expense.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$amount" } },
          },
        },
      ]);
  
      const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
  
      return res.status(200).json({
        success: true,
        totalAmount,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "Error calculating total expense amount",
      });
    }
  };
  //get by id expens
  exports.GetByIdExpense = async (req, res) => {
    try {
      const complaints = await Expense.findById(req.params.id);
      return res.status(200).json({
        success: true,
        Expense: complaints,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "Error fetching expense",
      });
    }
  };
  //delete expens
  exports.DeleteExpens = async (req, res) => {
    try {
      const complaints = await Expense.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Expense Deleted",
      });
    } catch (error) {
      
      return res.status(500).json({
        success: false,
        message: "Error fetching expense",
      });
    }
  };
  //update expense
  exports.UpdateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, date, amount } = req.body;
  
      // Find the expense by ID
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }
  
      const uploadAndDeleteLocal = async (fileArray) => {
        if (fileArray && fileArray[0]) {
          const filePath = fileArray[0].path;
          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            // Delete from local server
            fs.unlink(filePath, (err) => {
              if (err) err;
              else filePath;
            });
            return result.secure_url;
          } catch (error) {
            
            throw error;
          }
        }
        return "";
      };
  
      let bill = expense.bill;
      if (req.files?.bill) {
        bill = await uploadAndDeleteLocal(req.files.bill);
      }
  
      expense.title = title || expense.title;
      expense.description = description || expense.description;
      expense.date = date || expense.date;
      expense.amount = amount || expense.amount;
      expense.bill = bill;
  
      await expense.save();
  
      return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: expense,
      });
    } catch (error) {
      
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };