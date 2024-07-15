import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // get tokeen from headers
  const authToken = req.headers.authorization;
  // check if the token exist or not
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Token authorization denied" });
  }

  try {
    console.log(authToken);
    const token = authToken.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // passing to the function controller if all verify passed the condition
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is Expired" });
    }
    console.log(error);
    return res.status(501).json({ success: false, message: "Invalid Token" });
  }
};

// restrict take roles as an input parameter and then pass to the async function middle inside the restrict function

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  let role;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
    role = user.role;
  }
  if (doctor) {
    user = doctor;
    role = user.role;
  }
  next();

  console.log(user);

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You not authorized" });
  }
};
