import { createSlice } from "@reduxjs/toolkit"

const initialState={
  isCollapsed:false,
  logoNames:[],
  activeLogo:"Notes",
}

const headerSlice=createSlice({
    name:"header",
    initialState,
    reducers:{
        setLogoNames:(state,action)=>{
            state.logoNames=action.payload
        },
        setActiveLogo:(state,action)=>{
            state.activeLogo=action.payload
        },
    setIsCollapsed:(state,action)=>{
        state.isCollapsed=action.payload
    }
      
    }
})

export const {setLogoNames,setActiveLogo,setIsCollapsed}=headerSlice.actions
export default headerSlice.reducer