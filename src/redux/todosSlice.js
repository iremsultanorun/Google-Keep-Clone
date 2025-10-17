import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title: "",
    content: "",
    hidden: false,
    todos: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        updateTodoFields: (state, action) => {
            if (action.payload.title !== undefined)
                state.title = action.payload.title
            if (action.payload.content !== undefined)
                state.content = action.payload.content
            if (action.payload.dateHours !== undefined)
                state.dateHours = action.payload.dateHours
        },
        showFullForm: (state) => {
            state.hidden = false
        },
        showCompactForm: (state) => {
            state.hidden = true
        },
        resetForm: (state) => {
            state.content =""
            state.title =""
        }
    }
})

export const { updateTodoFields, showFullForm, showCompactForm, addTodo, resetForm } = todoSlice.actions

export default todoSlice.reducer