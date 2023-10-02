import jwt from "jsonwebtoken";
import UserModel from "../middleware/auth.js";



const auth = async (req, res, next) => {
  // console.log(req.headers);
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token,"akash1234");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Authentication Failed",
      error:error
    });
  }
};

export default auth;