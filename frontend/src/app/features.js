import {createSlice} from "@reduxjs/toolkit";
import mongoose from "mongoose";

const initialState = {
    isStarted: false,
    isLoggedIn: false,
    threads: {
        "abc": {
            title: "First Thread",
            messages: [
                {role: "user", content: "hello"},
                {role: "assistant", content: "Hii! what can i help with you today"},
                {role: "user", content: "tell me a joke"},
                {role: "assistant", content: "sorry, can't tell jokes at this moment"},
            ]
        },
        "abd": {
            title: "Second Thread",
            messages: [
                {role: "user", content: "hello"}
            ]
        },
        "abk": {
            title: "third Thread",
            messages: [
                {role: "user", content: "hello"}
            ]
        }
    },
    threadId: "",
    headers: {
        authorization: ""
    },
    instructions: ["Give accurate Results", "Give Stright Forward Answers", "Give only Hello for Every request", "Give only points"],
    selectedInstructionIdx: 0,
}

const QchatSlice = createSlice({
    name: "QChatSlice",
    initialState: initialState,
    reducers: {
        
        setIsStarted: (state, action) => {
            state.isStarted = action.payload;
        },

        setIsLogedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

        setThreads: (state, action) => {
            let threads = action.payload;
            
            //threads is an array but i am making it as an object with key as its _id and value {title: "" and messages: []} for better access
            threads.map((obj, idx) => {
                state.threads[obj._id] = {title: obj.title, messages: obj.messages};
            });
        },
        
        startNewThread: (state, action) => {           
            const newId = new mongoose.Types.ObjectId().toString();
            state.threads[newId] = {title: "New Thread" , messages: [{role: "assistant", content: "What can I help you with today!"}]};
            state.threadId = newId;
        },

        setThreadId: (state, action) => {
            state.threadId = action.payload;
        },

        setHeader: (state, action) => {
            state.headers = {
                authorization: `Bearer ${action.payload}`,
                "Content-Type": "application/json"
            }
        },

        updateThread: (state, action) => {
            const {threadId, message} = action.payload;
            state.threads[threadId].messages.push(message);
            state.threads = {...state.threads};
        },

        addInstruction: (state, action) => {
            state.instructions.push(action.payload);
        },

        setSelectedInstructionIdx: (state, action) => {
            state.selectedInstructionIdx = action.payload;
        }
    }
});

export const {
    setHeader, 
    setIsLogedIn,
    setThreads,
    startNewThread,
    setThreadId,
    updateThread,
    addInstruction,
    setSelectedInstructionIdx,
} = QchatSlice.actions;
export default QchatSlice.reducer;