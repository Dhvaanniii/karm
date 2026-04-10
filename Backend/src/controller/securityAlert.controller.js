const Notification = require("../models/notification.schema");
const Owner = require("../models/Owener.model");
const Alert = require("../models/SecurityAlert.model");
const Tenante = require("../models/Tenent.model");
const User = require("../models/user.schema");

//add alert
exports.CreateAlert = async (req, res) => {
  try {
    const { alert_type, description } = req.body;

    if (!alert_type || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alert = new Alert({
      alert_type,
      description,
    });

    await alert.save();

    const ownerData = await Owner.find();
    const tenantData = await Tenante.find();

    //add notification

    const adminUsers = await User.find({}, "_id");
    const ownerUsers = ownerData.map((owner) => ({
      _id: owner._id,
      model: "Owner",
    }));
    const tenantUsers = tenantData.map((tenant) => ({
      _id: tenant._id,
      model: "Tenante",
    }));

    const allUsers = [
      ...adminUsers.map((admin) => ({ _id: admin._id, model: "User" })),
      ...ownerUsers,
      ...tenantUsers,
    ];

    const notification = new Notification({
      title: "Security alert !",
      name: alert_type,
      message: description,
      users: allUsers,
      type:"alert"
    });

    await notification.save();

    return res.status(201).json({
      success: true,
      message: "Alert created successfully",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in alert adding",
    });
  }
};

//get complaint
exports.GetAlert = async (req, res) => {
  try {
    const alert = await Alert.find({});
    return res.status(200).json({
      success: true,
      data: alert,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching alert",
    });
  }
};
