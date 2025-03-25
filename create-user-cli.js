require("dotenv").config();
const CryptoJS = require("crypto-js");
const readline = require("readline");
const mongoose = require("mongoose");

const connectToMongo = require("./utils/db");
const User = require("./models/User");

// Hàm kết nối với MongoDB trước khi tiếp tục
(async () => {
  try {
    await connectToMongo();
    console.log("MongoDB Connected!");

    // Readline interface for taking user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Function to hash password
    const hashPassword = (password) => {
      return CryptoJS.SHA256(password).toString();
    };

    // Function to create a new user
    const createUser = async (name, email, password) => {
      try {
        const hashedPassword = hashPassword(password);
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });

        await user.save();
        console.log("User created successfully!");
      } catch (err) {
        console.error("Error creating user:", err);
      } finally {
        rl.close();
        mongoose.connection.close(); // Đóng kết nối MongoDB sau khi hoàn tất
        process.exit(0);
      }
    };

    // Prompt for name, email, and password
    rl.question("Enter name: ", function (name) {
      rl.question("Enter email: ", function (email) {
        rl.question("Enter password: ", function (password) {
          createUser(name, email, password);
        });
      });
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();