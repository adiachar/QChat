import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    threads: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thread"
        }
    ]
});

const User = new model("User", userSchema);
export default User;