const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioClient = null;

// Only initialize if SID starts with "AC" to avoid crashing the server
if (accountSid && accountSid.startsWith("AC") && authToken) {
    try {
        twilioClient = new twilio(accountSid, authToken);
        console.log("Twilio initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Twilio:", error.message);
    }
} else {
    console.warn("Twilio credentials missing or invalid. Twilio features will be disabled.");
}

const sendSMS = async ({ to, body }) => {
    if (!twilioClient) {
        console.error("Cannot send SMS: Twilio client not initialized");
        return { success: false, error: "Twilio not configured" };
    }

    try {
        const message = await twilioClient.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        return { success: true, messageSid: message.sid };
    } catch (error) {
        console.error("Twilio SMS send error:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    twilioClient,
    sendSMS
};
