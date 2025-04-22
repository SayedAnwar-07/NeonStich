import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Unauthorized role." });
    }

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};
