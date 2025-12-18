import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isEditLabelModal: false,
    isLabelModal: false,
    labelName: "",
    editingLabelId: null,
    labelList: [],

    filteredLabelList: [],
    closeModal: null,
    isChecked: false,
}

const labelModalSlice = createSlice({
    name: "labelModal",
    initialState,
    reducers: {
        setEditLabelModal: (state, action) => {
            state.isEditLabelModal = action.payload
        },
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
        },
    
    }
})

export const { setEditLabelModal, setLabelName, addLabelList, deleteLabel, updateLabel, setLabelModal} = labelModalSlice.actions
export default labelModalSlice.reducer
