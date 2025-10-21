import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title: "",
    content: "",
    hidden: false,
    todos: [],
    selectedCurrent: 0,
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
            state.content = ""
            state.title = ""
        },
        setSelectTodo: (state, action) => {
            const selectId = action.payload
            const todoSelected = state.todos.find((todo) => todo.id === selectId)

            todoSelected.selected = !todoSelected.selected
            if (todoSelected.selected == true) {
                state.selectedCurrent += 1
            }
            if (todoSelected.selected == false) {
                state.selectedCurrent -= 1
            }
        },
        setPinnedTodo: (state, action) => {
            const pinnedId = action.payload
            const todoPinned = state.todos.find((todo) => todo.id === pinnedId)
            todoPinned.pinned = !todoPinned.pinned
           
        }
    }
})

export const { updateTodoFields, showFullForm, showCompactForm, addTodo, resetForm, setSelectTodo,setPinnedTodo } = todoSlice.actions

export default todoSlice.reducer