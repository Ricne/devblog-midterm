const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000, // Đảm bảo không timeout sớm
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (e) {
    console.error(`MongoDB Connection Error: ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectToMongo;