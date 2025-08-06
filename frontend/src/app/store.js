import { configureStore } from "@reduxjs/toolkit";
import QChatReducer from "./features.js";

export const store = configureStore({
    reducer: QChatReducer,
});