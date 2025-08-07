import mongoose from "mongoose";
import Thread from "../model/thread.js";
import User from "../model/user.js";
import {getOpenAiResponse} from "../utils/openAi.js";

export const addChat = async (req, res) => {
    const user = req.user;
    const {threadId, message, instruction} = req.body; 

    let thread = await Thread.findById(threadId);
    
    if(!thread) {
        thread = new Thread({
            _id: threadId,
            title: message, 
            messages: [{role: "user", content: message}]
        });
        await User.updateOne({_id: user._id}, {$push: {threads: thread}});
    } 
    else {
        thread.messages.push({
            role: "user",
            content: message
        });
    }
    const aiResponse = await getOpenAiResponse(thread.messages, instruction);
    
    thread.messages.push({
        role: "assistant",
        content: aiResponse
    });

    await thread.save();
    return res.status(200).json({role: "assistant", content: aiResponse});
}

export const getThreads = async (req, res) => {
    const user = req.user;
    const threadIds = user.threads;

    if(threadIds) {
        const threads = await Thread.find({_id: {$in: threadIds}}, {_id: 1, title: 1, messages: 1});   
        return res.status(200).json({threads: threads});
    }
    
    return res.status(404).json({threads: []});
}

export const getThreadById = async (req, res) => {
    const {thread_id} = req.params;
    const thread = await Thread.findById(thread_id);

    if(thread) {
        return res.status(200).json({thread: thread});
    } else {
        return res.status(404).json({msg: "Thread not found!"});
    }
}

export const deleteThreadById = async (req, res) => {
    const {thread_id} = req.params;
    const response = await Thread.findByIdAndDelete(thread_id);
    return res.status(200).json({msg: "Thread Deleted!"});
}