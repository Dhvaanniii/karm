const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const constant = require("./src/config/constant.js");
const port = constant.PORT;
require("./src/config/db");
const cors = require("cors");
const cron = require("node-cron");
const routes=require("./src/utils/index.js")
// socket io connections
const PenaltyController = require("./src/controller/maintanance.controller.js");
// for all origin
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
};

app.use(cors(corsOptions));


cron.schedule("0 0 * * * *", async () => {
  try {
    console.log("Starting scheduled penalty application...");
    await PenaltyController.applyPenalty();
    console.log("Scheduled penalty application completed.");
  } catch (error) {
    console.error("Error in scheduled penalty application:", error.message);
  }
});

//user registration and login schema
app.use("/api/v1/auth", routes.UserRoutes);
//create society api
app.use("/api/v1/society", routes.SocietyRoutes);
//create Important Number
app.use("/api/v2/number", routes.NumberRoutes);
//resident apis
app.use("/api/v2/resident", routes.ResidentRoute);
//complaint apis
app.use("/api/v2/complaint", routes.ComplaintRoutes);
//security apis
app.use("/api/v2/security", routes.SecurityRoutes);
//facility apis
app.use("/api/v2/facility", routes.FacilityRoute);
//Announcement apis
app.use("/api/v2/announcement", routes.AnnouncementRoute);
//financial apis
app.use("/api/v2/financial", routes.FinancialRoutes);
//visitor api
app.use("/api/v2/visitor", routes.VisitorRoutes);
//alert api
app.use("/api/v2/alert", routes.AlertRoutes);
//chat api
app.use("/api/v2/chat", routes.ChatRoute);
//poll apis
app.use("/api/v2/poll", routes.PollRoutes);
//notification apis
app.use("/api/v2/notication", routes.NotificationRoute);
//community question
app.use("/api/v2/question",routes.QuestionRoute)
//vehicle api
app.use("/api/v2/vehicle", routes.VehicleRoute);

// socket io
const http = require("http");
const server = http.createServer(app);
require("./src/utils/socketIo.js")(server); // Import Socket.IO logic

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
