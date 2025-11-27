import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title: "",
    content: "",
    hidden: false,
    todos: [],
    trashNotes: [],
    remindersNotes: [],
    archiveNotes: [],
    selectedCurrent: 0,
    todoLayout: false,
    selectedTodoId: null,
    isOthersModal: false,
    isPinned: false,
    todoDetailHeight: {},
    createTodoHeight: {},
    todoBgColor: " ",
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
        updateSpecificTodo: (state, action) => {
            const { id, field, value } = action.payload
            const todoIndex = state.todos.findIndex((todo) => id === todo.id)
            if (todoIndex !== -1) {
                state.todos[todoIndex][field] = value
            }
        },
        setSelectedTodoById: (state, action) => {
            state.selectedTodoId = action.payload
        },
        clearSelectedTodo: (state) => {
            state.selectedTodoId = null;
        },
        clearSelectedTodos: (state) => {
            state.todos.forEach(todo => {
                if (todo.selected) {
                    todo.selected = false;
                }
            });
            state.selectedCurrent = 0;
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
        setSelectedTodo: (state, action) => {
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
            if (todoPinned) {
                todoPinned.pinned = !todoPinned.pinned


            }
        },
        setAllPinnedTodo: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected == true) {
                    todo.pinned = !todo.pinned
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })
        },
        setNewPinnedTodo: (state, action) => {
            state.isPinned = action.payload
        },
        setTodoLayout: (state) => {
            state.todoLayout = !state.todoLayout;
        },
        setIsOthersModal: (state) => {
            state.isOthersModal = !state.isOthersModal;
        },

        setDeleteTodo: (state, action) => {
            const deleteNoteId = action.payload
            const deleteNote = state.todos.find((todo) => todo.id === deleteNoteId)
            if (deleteNote) {
                state.trashNotes.push(deleteNote)
            }
            state.todos = state.todos.filter((todo) => todo.id !== deleteNoteId)
        },
        setAllDeleteTodo: (state) => {
            const deleteNoteId = state.todos.filter(todo => todo.selected !== todo).map(todo => todo.id)
            state.todos.forEach((todo) => {
                if (todo.selected === true)
                    state.trashNotes.push(todo)
            })
            state.todos = state.todos.filter((todo) => !deleteNoteId(todo.id))
        },
        setRestoreTrash: (state, action) => {
            const restoreTodoId = action.payload
            const restoreTodo = state.trashNotes.find((todo) => todo.id === restoreTodoId)
            if (restoreTodo) {
                state.todos.push(restoreTodo)
            }
            state.trashNotes = state.trashNotes.filter(todo => todo.id !== restoreTodoId)
        },
        setRestoreArchive: (state, action) => {
            const restoreTodoId = action.payload
            const restoreTodo = state.archiveNotes.find((todo) => todo.id === restoreTodoId)
            if (restoreTodo) {
                state.todos.push(restoreTodo)
            }
            state.archiveNotes = state.archiveNotes.filter(todo => todo.id !== restoreTodoId)
        },
        setArchiveTodo: (state, action) => {
            const archiveTodoId = action.payload
            const archiveTodo = state.todos.find((todo) => todo.id === archiveTodoId)
            if (archiveTodo) {
                state.archiveNotes.push(archiveTodo)
            }
            state.todos = state.todos.filter((todo) => todo.id !== archiveTodoId)
        },
        setNewArchiveTodo: (state) => {
            const newArchiveTodo = {
                content: state.content,
                title: state.title,
                id: Date.now(),
                selected: false,
                pinned: false,
                bgColor: state.todoBgColor
            }
            state.archiveNotes.push(newArchiveTodo)
            state.content = ""
            state.title = ""
            state.hidden = false
        },
        setAllArchiveTodo: (state) => {
            const selectedId = state.todos.filter((todo) => todo.selected !== todo).map(todo => todo.id)
            state.todos.forEach((todo) => {
                if (todo.selected === true) {
                    state.archiveNotes.push(todo)
                    todo.selected = false
                    state.selectedCurrent = 0
                }
            })

            state.todos = state.todos.filter((todo) => !selectedId.includes(todo.id))

        },
        setTodoDetailHeight: (state, action) => {
            const { todoId, height } = action.payload
            state.todoDetailHeight[todoId] = height
        },
        setCreateTodoHeight: (state, action) => {
            const { height } = action.payload
            state.createTodoHeight = height
        },
        setIsBgPaletteModal: (state) => {
            state.isBgPaletteModal = !state.isBgPaletteModal
        },
        // todosSlice.js
        setBgColor: (state, action) => {
            const { color, status, id } = action.payload
            if (status == "create") { state.todoBgColor = color }
            if (status == "todo" || status == "note") {
                const todoIndex = state.todos.findIndex((todo) => todo.id === id)
                state.todos[todoIndex].bgColor = color
            }
        },
        setAllBgColor: (state, action) => {
            const { color } = action.payload;
            state.todos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = color;
                }
            });


        },
        resetBgColor: (state) => {
            state.todoBgColor = "white";
        },
        resetAllBgColor: (state) => {
            state.todos.forEach((todo) => {
                if (todo.selected === true) {
                    todo.bgColor = "white";
                }
            });

        }
    }
})

export const { updateTodoFields, showFullForm, showCompactForm, addTodo, resetForm, setSelectedTodo, setPinnedTodo, setTodoLayout, updateSpecificTodo, setSelectedTodoById, clearSelectedTodo, setIsOthersModal, setDeleteTodo, setArchiveTodo, setNewPinnedTodo, clearSelectedTodos, setAllPinnedTodo, setTodoDetailHeight, setCreateTodoHeight, setIsBgPaletteModal, setBgColor, resetBgColor, setAllBgColor, resetAllBgColor, setAllArchiveTodo, setAllDeleteTodo, setNewArchiveTodo, setRestoreTrash,    setRestoreArchive } = todoSlice.actions

export default todoSlice.reducer