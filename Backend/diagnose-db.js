require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user.schema');
const Owner = require('./src/models/Owener.model');
const Tenante = require('./src/models/Tenent.model');
const Guard = require('./src/models/SecurityGuard.model');

async function diagnoseDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB\n');

    console.log('=== DATABASE DIAGNOSTIC REPORT ===\n');

    // Count users in each collection
    const userCount = await User.countDocuments();
    const ownerCount = await Owner.countDocuments();
    const tenanteCount = await Tenante.countDocuments();
    const guardCount = await Guard.countDocuments();

    console.log('📊 Collection Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Owners: ${ownerCount}`);
    console.log(`   Tenants: ${tenanteCount}`);
    console.log(`   Guards: ${guardCount}`);
    console.log(`   Total: ${userCount + ownerCount + tenanteCount + guardCount}\n`);

    // Check a sample user from each collection
    const checkPasswordHash = async (model, name) => {
      const sample = await model.findOne().select('Email MailOrPhone Email_address Phone Phone_number password');
      if (sample) {
        console.log(`\n🔍 Sample ${name}:`);
        const identifier = sample.Email || sample.MailOrPhone || sample.Email_address || sample.Phone || sample.Phone_number;
        console.log(`   Identifier: ${identifier}`);
        console.log(`   Password exists: ${!!sample.password}`);
        console.log(`   Password length: ${sample.password?.length || 0}`);
        console.log(`   Starts with $2a$/$2b$: ${sample.password?.startsWith('$2a$') || sample.password?.startsWith('$2b$')}`);
        
        if (sample.password && sample.password.length < 20) {
          console.log('   ⚠️  WARNING: Password hash seems too short - may not be properly hashed!');
        }
        if (sample.password && !sample.password.startsWith('$2a$') && !sample.password.startsWith('$2b$')) {
          console.log('   ⚠️  WARNING: Password does not look like a bcrypt hash!');
        }
      }
    };

    if (userCount > 0) await checkPasswordHash(User, 'User');
    if (ownerCount > 0) await checkPasswordHash(Owner, 'Owner');
    if (tenanteCount > 0) await checkPasswordHash(Tenante, 'Tenante');
    if (guardCount > 0) await checkPasswordHash(Guard, 'Guard');

    console.log('\n=== RECOMMENDATIONS ===');
    console.log('1. If password hashes look invalid, reset passwords using: node reset-user-password.js');
    console.log('2. Make sure you are using the correct email/phone and password');
    console.log('3. Check backend console for detailed login attempt logs\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

diagnoseDatabase();
