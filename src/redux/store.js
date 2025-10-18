import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './todosSlice'
import header from './headerSlice'
import labelModal from "./labelModalSlice"

export const store=configureStore({
    reducer:{
        todo: todoSlice,
        header: header,
        labelModal:labelModal,
    
    }
})