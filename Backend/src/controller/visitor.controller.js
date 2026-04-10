const Visitor = require("../models/SecurityVisitorsLogs.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
const Notification = require("../models/notification.schema");
const senData = require("../config/mail");
const { VisitorNotificationFormat } = require("../utils/visitorMailUi");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

// Upload Photo
exports.UploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file found in request. req.body:", req.body);
      return res.status(400).json({
        success: false,
        message: "No photo uploaded. Please ensure the field name is 'photo'.",
      });
    }

    console.log("File received by multer:", req.file);

    if (!fs.existsSync(req.file.path)) {
       console.error("File not found on disk at:", req.file.path);
       return res.status(500).json({
         success: false,
         message: "Internal error: Uploaded file not found on disk.",
       });
    }

    // Upload to Cloudinary
    console.log("Starting Cloudinary upload for:", req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "visitor_photos",
      resource_type: "auto"
    });

    console.log("Cloudinary upload successful:", result.secure_url);

    // Remove local file
    try {
      fs.unlinkSync(req.file.path);
      console.log("Local file removed:", req.file.path);
    } catch (unlinkError) {
      console.error("Error removing local file:", unlinkError);
    }

    return res.status(200).json({
      success: true,
      photoUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error in UploadPhoto controller:", error);
    // Cleanup if upload failed but file exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    return res.status(500).json({
      success: false,
      message: `Cloudinary upload failed: ${error.message}`,
      error: error
    });
  }
};

//add visitor
exports.CreateVisitor = async (req, res) => {
  try {
    const { name, number, date, wing, unit, time, purpose, photoUrl } = req.body;
    if (!name || !number || !wing || !unit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const visitor = new Visitor({
      name,
      number,
      date,
      wing,
      unit,
      time,
      purpose,
      photoUrl,
    });
    await visitor.save();
    if (!visitor) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    // Find the resident of the wing and unit
    const owner = await Owner.findOne({ Wing: wing, Unit: unit });
    const tenant = await Tenante.findOne({ Wing: wing, Unit: unit });

    const resident = owner || tenant;

    if (resident) {
      const notification = new Notification({
        type: "visitor-approve",
        title: "New Visitor Notification",
        name: "Visitor Arrival",
        message: `${name} is at the gate. Do you allow them?`,
        users: [{ _id: resident._id, model: owner ? "Owner" : "Tenante" }],
        othercontent: {
          visitorId: visitor._id,
          name: name,
          number: number,
          wing: wing,
          unit: unit,
        },
      });
      await notification.save();

      // Send Email Notification
      if (resident.Email_address) {
        try {
          const protocol = req.protocol;
          const host = req.get("host");
          const baseUrl = `${protocol}://${host}`;
          
          await senData(
            resident.Email_address,
            "Visitor Arrival Notification",
            VisitorNotificationFormat(resident.Full_name, name, wing, unit, visitor._id, baseUrl, photoUrl, purpose)
          );
        } catch (mailError) {
          console.error("Error sending visitor arrival email:", mailError);
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: "Visitor Successfully Added and Notification sent to Resident",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Approve/Reject Visitor
exports.ApproveVisitor = async (req, res) => {
  try {
    const { visitorId, action } = req.body;
    const visitor = await Visitor.findById(visitorId);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    if (action === "approve") {
      visitor.status = "approved";
    } else if (action === "reject") {
      visitor.status = "rejected";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    await visitor.save();

    return res.status(200).json({
      success: true,
      message: `Visitor status updated to ${visitor.status}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Handle Email Action (Approve/Reject from Email)
exports.HandleEmailAction = async (req, res) => {
  try {
    const { visitorId, action } = req.params;
    const visitor = await Visitor.findById(visitorId);

    if (!visitor) {
      return res.status(404).send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc3545;">Error</h1>
            <p>Visitor record not found.</p>
          </body>
        </html>
      `);
    }

    if (action === "approve") {
      visitor.status = "approved";
    } else if (action === "reject") {
      visitor.status = "rejected";
    } else {
      return res.status(400).send("Invalid action");
    }

    await visitor.save();

    return res.send(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #28a745;">Success!</h1>
          <p>The visitor <strong>${visitor.name}</strong> has been <strong>${visitor.status}</strong>.</p>
          <p>You can close this window now.</p>
        </body>
      </html>
    `);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};
//get complaint
exports.GetAllVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.find({}).sort({ wing: 1, unit: 1 });

    return res.status(200).json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching visitor",
    });
  }
};

exports.FilterVisitor = async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const currentDate = new Date();
    let dateFrom, dateTo;

    if (timePeriod === "lastWeek") {
      dateFrom = new Date(currentDate);
      dateFrom.setDate(currentDate.getDate() - 7);
      dateTo = currentDate;
    } else if (timePeriod === "lastMonth") {
      dateFrom = new Date(currentDate);
      dateFrom.setMonth(currentDate.getMonth() - 1);
      dateTo = currentDate;
    } else if (timePeriod === "lastYear") {
      dateFrom = new Date(currentDate);
      dateFrom.setFullYear(currentDate.getFullYear() - 1);
      dateTo = currentDate;
    } else {
      dateFrom = null;
      dateTo = null;
    }

    const filter =
      dateFrom && dateTo ? { date: { $gte: dateFrom, $lte: dateTo } } : {};

    const visitors = await Visitor.find(filter).sort({ wing: 1, unit: 1 });

    return res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching visitors",
    });
  }
};
