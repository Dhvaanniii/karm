require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Owner = require('./src/models/Owener.model');

async function fixOwnerPasswords() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB\n');

    console.log('=== FIXING OWNER PASSWORDS ===\n');

    // Find all owners without passwords
    const ownersWithoutPassword = await Owner.find({
      $or: [
        { password: { $exists: false } },
        { password: null },
        { password: '' }
      ]
    });

    console.log(`🔍 Found ${ownersWithoutPassword.length} Owner(s) without passwords\n`);

    if (ownersWithoutPassword.length === 0) {
      console.log('✅ All Owner accounts have passwords!');
      process.exit(0);
    }

    // Default password for owners without passwords
    const defaultPassword = 'owner123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    console.log(`🔐 Setting default password for all affected owners: "${defaultPassword}"\n`);

    // Update each owner
    for (const owner of ownersWithoutPassword) {
      console.log(`Updating: ${owner.Full_name || 'Unknown'} (${owner.Email_address || owner.Phone_number || 'No contact'})`);
      owner.password = hashedPassword;
      await owner.save();
      console.log(`  ✅ Updated\n`);
    }

    console.log('=== SUMMARY ===');
    console.log(`✅ Fixed ${ownersWithoutPassword.length} Owner account(s)`);
    console.log(`📝 Default password: ${defaultPassword}`);
    console.log(`⚠️  Please inform users to change their password after login\n`);

    // Show the updated owners
    console.log('=== UPDATED OWNERS ===');
    for (const owner of ownersWithoutPassword) {
      const identifier = owner.Email_address || owner.Phone_number || 'No contact info';
      console.log(`• ${owner.Full_name || 'Unknown'} - ${identifier}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixOwnerPasswords();
