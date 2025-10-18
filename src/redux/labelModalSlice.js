import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLabelModal:false,
    labelName:"",
    labelList:[],
}

const labelModalSlice = createSlice({
    name: "labelModal",
    initialState,
    reducers: {
        setLabelModal: (state, action) => {
            state.isLabelModal = action.payload
        },
        setLabelName: (state, action) => {
            state.labelName = action.payload
        },
        addLabelList: (state,action)=>{
            state.labelList.push(action.payload)
        }
    }
})

export const { setLabelModal ,setLabelName,addLabelList} = labelModalSlice.actions
export default labelModalSlice.reducer
