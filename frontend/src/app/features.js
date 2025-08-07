import {createSlice} from "@reduxjs/toolkit";
import mongoose from "mongoose";

const initialState = {
    isLoggedIn: false,
    threads: {},
    threadId: "",
    headers: {
        authorization: "",
    },
    models: [],
    selectedModel: undefined,
    instructions: ["Give accurate Results", "Give one line Response", "Make Points", "Don't Make Points"],
    selectedInstructionIdx: 0,
}

const QchatSlice = createSlice({
    name: "QChatSlice",
    initialState: initialState,
    reducers: {

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

        setModels: (state, action) => {
            state.models = action.payload;
            state.selectedModel = state.models[0];
        },

        setSelectedModel: (state, action) => {
            state.selectedModel = action.payload;
        },
        
        startNewThread: (state, action) => {           
            const newId = new mongoose.Types.ObjectId().toString();
            state.threads[newId] = {title: "New Thread" , messages: [{role: "assistant", content: " "}]};
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
        },

        deleteThreadById: (state, action) => {
            state.threadId = "";
            delete state.threads[action.payload];
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
    setModels,
    setSelectedModel,
    addInstruction,
    setSelectedInstructionIdx,
    deleteThreadById,
} = QchatSlice.actions;
export default QchatSlice.reducer;