import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isSignedIn = async (req, res, next) => {
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];

    try {
        const user_id = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(user_id).select("-password");
        req.user = user;

    } catch(err) {
        return res.status(401).json({msg: "Unauthorized!"});
    }
    next();
};
