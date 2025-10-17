import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './todosSlice'
import header from './headerSlice'


export const store=configureStore({
    reducer:{
        todo: todoSlice,
        header: header,
    
    }
})