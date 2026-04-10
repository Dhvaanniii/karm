require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.schema');
const Owner = require('./src/models/Owener.model');
const Tenante = require('./src/models/Tenent.model');
const Guard = require('./src/models/SecurityGuard.model');

async function resetUserPassword() {
  try {
    // Connect to database
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    // Configuration - CHANGE THESE VALUES
    const emailOrPhone = 'admin@example.com'; // Enter the user's email or phone
    const newPassword = 'newpassword123'; // Enter new password
    
    console.log(`\n🔍 Searching for user: ${emailOrPhone}`);

    // Find user across all models
    let query = {};
    if (emailOrPhone.includes('@')) {
      query = {
        $or: [
          { Email: emailOrPhone },
          { MailOrPhone: emailOrPhone },
          { Email_address: emailOrPhone }
        ]
      };
    } else {
      query = {
        $or: [
          { Phone: emailOrPhone },
          { MailOrPhone: emailOrPhone },
          { Phone_number: emailOrPhone }
        ]
      };
    }

    // Search in all collections
    let user = await Owner.findOne(query);
    if (!user) user = await Tenante.findOne(query);
    if (!user) user = await User.findOne(query);
    if (!user) user = await Guard.findOne(query);

    if (!user) {
      console.log('❌ User not found! Please check the email/phone number.');
      process.exit(1);
    }

    console.log(`✅ User found: ${user.constructor.modelName}`);
    console.log(`   User ID: ${user._id}`);
    console.log(`   Name: ${user.FirstName || 'N/A'}`);

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('\n🔐 Hashing new password...');

    // Update password
    user.password = hashedPassword;
    await user.save();

    console.log('✅ Password updated successfully!');
    console.log(`\n📝 New Credentials:`);
    console.log(`   Email/Phone: ${emailOrPhone}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n⚠️  Please change the password after logging in!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetUserPassword();
