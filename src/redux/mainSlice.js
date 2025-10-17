import { createSlice } from "@reduxjs/toolkit"

const initialState={
    searchModal=false,
}

const mainSlice=createSlice({
    name:"main",
    initialState,
    reducers:{
search:(state,action)=>{
state.searchModal=action.payload
}
    }
})

export const {}= mainSlice.actions
export default mainSlice.reducer