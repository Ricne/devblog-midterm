const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const User = require("../models/User");

const router = express.Router();
router.use(cookieParser());

// 🔹 API Login (Chỉ đăng nhập, không đăng ký)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Tạo JWT Token
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    // Gửi token về client dưới dạng cookie
    res.cookie("auth_token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

// 🔹 Middleware xác thực user (Dùng cho API cần bảo vệ)
const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied! Please log in." });
  }

  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

// 🔹 API lấy thông tin user (Bảo vệ bằng middleware)
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

// 🔹 API Logout (Xóa token khỏi cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out successfully!" });
});

module.exports = router;
