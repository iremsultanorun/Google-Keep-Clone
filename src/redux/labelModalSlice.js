import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLabelModal: false,
    labelName: "",
    editingLabelId: null,
    labelList: [],
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
        addLabelList: (state, action) => {
            state.labelList.push(action.payload)
        },
        deleteLabel: (state, action) => {
            const idToDelete = action.payload
            state.labelList = state.labelList.filter((label) => label.id !== idToDelete)
        },
        updateLabel: (state, action) => {
            const { newLabelName, id } = action.payload
            const index = state.labelList.findIndex((label) => label.id === id)
            if (index !== -1) {
                state.labelList[index].name = newLabelName
            }
        }
    }
})

export const { setLabelModal, setLabelName, addLabelList, deleteLabel, updateLabel } = labelModalSlice.actions
export default labelModalSlice.reducer
