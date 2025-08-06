import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/user", userRouter);
app.use("/", chatRouter);

app.post("/test", async (req, res) => {

    const instructions =  {
        role: "system",
        content: "Give only stright forward answers for every requests"
    }
    const payload = {
        model: "gpt-4o-mini",
        messages: [
            instructions,
        {
            role: "user",
            content: req.body.msg,
        }]
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
    };

    try {
        const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        config
        );
        console.log(response.data);
        res.status(200).json(response.data.choices[0].message.content);

    } catch (err) {
        res.status(404).json({msg: "Did't get the response from openAI"});
    }
});

app.listen(5000, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected!"))
    .catch((err) => "Having problem connecting with DB!");
    console.log("server started at port: 5000");
});