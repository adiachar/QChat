import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(!user || user.password != password) {
        return res.status(404).json({msg: "Invalid email or password!"});
    }
    const _id = user._id;
    const token = jwt.sign({_id: _id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    delete user.password;
    return res.status(200).json({msg: "sign Ip Successfull!", token: token, user: user});
}

export const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(404).json({msg: "Fields cannot be empty!"});
    }

    const oldUser = await User.findOne({email: email});
    if(oldUser) {
        return res.status(404).json({msg: "Email already in use!"});
    }

    const user = await User.insertOne({name: name, email: email, password: password});

    const _id = user._id;
    const token = jwt.sign({_id: _id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    delete user.password;
    return res.status(200).json({msg: "sign up Successfull!", token: token, user: user});
}