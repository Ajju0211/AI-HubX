import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { User } from "./models/userModel.js"; // Ensure this is a named export (not default)
import bcryptjs from "bcryptjs";

async function insertUsers() {
  const uri =
    "mongodb+srv://ajaysdoriyal:ajaysdoriyal@cluster0.iz0lg.mongodb.net/InevoAI?retryWrites=true&w=majority&appName=Cluster0";

  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Settings
    const batchSize = 10000;
    const totalUsers = 100000;
    const users = [];
    const hashedPassword = await bcryptjs.hash("123456", 4); // Reduced salt rounds for speed

    console.log("🚀 Starting user insertion...");

    for (let i = 1; i <= totalUsers; i++) {
      users.push({
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.person.fullName(),
        isVerified: true,
      });

      // Insert in batches
      if (users.length === batchSize || i === totalUsers) {
        await User.insertMany(users);
        console.log(`✅ Inserted ${i} users`);
        users.length = 0; // Clear the array
      }
    }

    console.log(`🎉 Successfully inserted ${totalUsers} users!`);
  } catch (err) {
    console.error("❌ Error inserting users:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

// Measure insertion time
console.time("⏱️ Insertion Time");
insertUsers().then(() => {
  console.timeEnd("⏱️ Insertion Time");
});
