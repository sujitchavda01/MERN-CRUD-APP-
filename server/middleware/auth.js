import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export  default auth;