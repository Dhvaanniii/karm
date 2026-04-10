const Announcement = require("../models/announcment.model");
const Notification = require("../models/notification.schema");
const Owner = require("../models/Owener.model");
const Guard = require("../models/SecurityGuard.model");
const Tenante = require("../models/Tenent.model");

//create announcement
exports.CreateAnnouncement = async (req, res) => {
  try {
    const { type, title, description, date, time } = req.body;
    if (!type || !title || !description) {
      return res.status(400).json({
        success: true,
        message: "Fields are required",
      });
    }
    const announcement = new Announcement({
      type,
      title,
      description,
      date,
      time,
    });

    const guardData = await Guard.find();
    const ownerData = await Owner.find();
    const tenantData = await Tenante.find();

    await announcement.save();

    //add notification

    const ownerUsers = ownerData.map((owner) => ({
      _id: owner._id,
      model: "Owner",
    }));
    const tenantUsers = tenantData.map((tenant) => ({
      _id: tenant._id,
      model: "Tenante",
    }));
    const securityuser = guardData.map((guard) => ({
      _id: guard._id,
      model: "SecurityGuard",
    }));

    const allUsers = [...ownerUsers, ...tenantUsers, ...securityuser];

    const notification = new Notification({
      title: `New Announcment${type}`,
      name: title,
      message: description,
      othercontent: {
        announcementId: announcement._id,
      },
      users: allUsers,
      type: "announcement",
    });

    await notification.save();

    if (!announcement) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Announcement Successfully Added",
      notification,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "error in Announcement creation",
    });
  }
};

//get announcement
exports.GetAnnouncement = async (req, res) => {
  try {
    const find = await Announcement.find();
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: false,
      Announcement: find,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in Announcement fetching",
    });
  }
};

//get activity announcement
exports.GetActivityAnnouncements = async (req, res) => {
  try {
    const activities = await Announcement.find({ type: "Activity" });
    if (!activities) {
      res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: false,
      Announcement: activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in Announcement fetching",
    });
  }
};
//get activity announcement
exports.GetActivityParticipants = async (req, res) => {
  console.log("hello");
  try {
    const activities = await Announcement.find({
      type: "Activity",
      members: { $exists: true, $not: { $size: 0 } },
    })
      .populate({
        path: "members.participent",
        select: "profileImage Full_name",
      })
      .exec();

      console.log(activities);

    if (!activities || activities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No activity announcements with participants found",
      });
    }

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("Error fetching activity announcements:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching activity announcements",
    });
  }
};
//get Event announcement
exports.GetEventAnnouncements = async (req, res) => {
  try {
    const activities = await Announcement.find({
      type: "Event",
      members: { $exists: true, $not: { $size: 0 } },
    })
      .populate({
        path: "members.participent",
        select: "profileImage Full_name",
      })
      .exec();

    if (!activities || activities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No activity announcements with participants found",
      });
    }

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("Error fetching activity announcements:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching activity announcements",
    });
  }
};

//filter announcement
exports.FilterAnnouncement = async (req, res) => {
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
        dateFrom = new Date(
          currentDate.setFullYear(currentDate.getFullYear() - 1)
        );
        break;
      default:
        dateFrom = null;
    }

    const filter = dateFrom ? { createdAt: { $gte: dateFrom } } : {};

    const announcements = await Announcement.find(filter);

    if (!announcements || announcements.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No announcements found",
      });
    }

    return res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching announcements",
    });
  }
};

//get by id
exports.GetByIdAnnouncement = async (req, res) => {
  try {
    const find = await Announcement.findById(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: false,
      Announcement: find,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in Announcement fetching",
    });
  }
};
//delete announcement
exports.DeleteAnnouncement = async (req, res) => {
  try {
    const find = await Announcement.findByIdAndDelete(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Announcement deleted Successfully..",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in Announcement deleting",
    });
  }
};

//update announcement
exports.UpdateAnnouncement = async (req, res) => {
  try {
    const { type, title, description, date, time } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: true,
        message: "Fields are required",
      });
    }
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        type,
        title,
        description,
        date,
        time,
      },
      { new: true }
    );

    if (!announcement) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Announcement Successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in Announcement updated",
    });
  }
};

//accept announcment
exports.AcceptAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.body;

    const userId = req.user?.id;
    const userType = req.user?.Resident_status;

    if (!announcementId) {
      return res.status(400).json({
        success: false,
        message: "Announcement ID is required",
      });
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    announcement.members.push({
      participent: userId,
      residentType: userType,
    });

    await announcement.save();

    return res.status(200).json({
      success: true,
      message: "You have successfully accepted the announcement",
      announcement,
    });
  } catch (error) {
    console.error("Error accepting announcement:", error);
    return res.status(500).json({
      success: false,
      message: "Error accepting announcement",
    });
  }
};
